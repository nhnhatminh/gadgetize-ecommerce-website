import pool from "../config/database.js";

export const createOrder = async (req, res, next) => {
  const userId = req.user.id;
  const { items, couponCode, shippingAddress, paymentMethod, shippingFee = 0 } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Order items cannot be empty" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const { variantId, quantity } = item;

      const variantResult = await client.query(
        `SELECT v.stock_quantity, v.price_modifier, p.base_price, p.discount_percent, p.name
         FROM product_variants v
         JOIN products p ON v.product_id = p.id
         WHERE v.id = $1 FOR UPDATE`,
        [variantId]
      );

      if (variantResult.rows.length === 0) {
        throw new Error(`Product variant with ID ${variantId} not found`);
      }

      const variant = variantResult.rows[0];

      if (variant.stock_quantity < quantity) {
        throw new Error(`Insufficient stock for product: ${variant.name}`);
      }

      const basePrice = parseFloat(variant.base_price);
      const priceModifier = parseFloat(variant.price_modifier || 0);
      const discountPercent = parseFloat(variant.discount_percent || 0);

      const originalPrice = basePrice + priceModifier;
      const finalUnitPrice = originalPrice * (1 - discountPercent / 100);
      const itemTotal = finalUnitPrice * quantity;

      subtotal += itemTotal;

      await client.query(
        "UPDATE product_variants SET stock_quantity = stock_quantity - $1 WHERE id = $2",
        [quantity, variantId]
      );

      processedItems.push({
        variantId,
        quantity,
        price: finalUnitPrice
      });
    }

    let discountAmount = 0;
    let couponId = null;

    if (couponCode) {
      const couponResult = await client.query(
        `SELECT id, discount_type, discount_value, min_order_value, max_discount_amount, usage_limit, used_count, expiry_date, is_active 
         FROM coupons 
         WHERE code = $1 FOR UPDATE`,
        [couponCode]
      );

      if (couponResult.rows.length === 0) {
        throw new Error("Invalid coupon code");
      }

      const coupon = couponResult.rows[0];
      const now = new Date();

      if (!coupon.is_active || (coupon.expiry_date && new Date(coupon.expiry_date) < now)) {
        throw new Error("Coupon has expired or is inactive");
      }

      if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
        throw new Error("Coupon usage limit exceeded");
      }

      if (subtotal < parseFloat(coupon.min_order_value || 0)) {
        throw new Error("Minimum order value for coupon not met");
      }

      couponId = coupon.id;
      const discountValue = parseFloat(coupon.discount_value);

      if (coupon.discount_type === "percentage") {
        discountAmount = subtotal * (discountValue / 100);
        if (coupon.max_discount_amount && discountAmount > parseFloat(coupon.max_discount_amount)) {
          discountAmount = parseFloat(coupon.max_discount_amount);
        }
      } else if (coupon.discount_type === "fixed") {
        discountAmount = discountValue;
      }

      if (discountAmount > subtotal) {
        discountAmount = subtotal;
      }

      await client.query(
        "UPDATE coupons SET used_count = used_count + 1 WHERE id = $1",
        [couponId]
      );
    }

    const totalAmount = subtotal - discountAmount + parseFloat(shippingFee);

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, coupon_id, subtotal, discount_amount, shipping_fee, total_amount, shipping_address, payment_method, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
       RETURNING id, created_at, status`,
      [userId, couponId, subtotal, discountAmount, shippingFee, totalAmount, shippingAddress, paymentMethod]
    );

    const orderId = orderResult.rows[0].id;

    for (const pi of processedItems) {
      await client.query(
        "INSERT INTO order_items (order_id, variant_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, pi.variantId, pi.quantity, pi.price]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
      status: orderResult.rows[0].status,
      createdAt: orderResult.rows[0].created_at,
      totals: {
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount
      }
    });

  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
};