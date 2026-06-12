import pool from "../config/database.js";

export const createOrder = async (req, res, next) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const userId = req.user.id;
    const { items, couponCode, shippingAddress, paymentMethod, shippingFee = 0 } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items cannot be empty" });
    }

    let subtotal = 0;
    let discountTotal = 0;
    let couponId = null;

    if (couponCode) {
      const couponResult = await client.query(
        `SELECT id, discount_amount, min_order_value, expiration_date, is_active 
         FROM coupons 
         WHERE code = $1 FOR UPDATE`,
        [couponCode]
      );

      if (couponResult.rows.length === 0) {
        return res.status(400).json({ message: "Invalid coupon code" });
      }

      const coupon = couponResult.rows[0];
      const now = new Date();

      if (!coupon.is_active || (coupon.expiration_date && new Date(coupon.expiration_date) < now)) {
        return res.status(400).json({ message: "Coupon has expired or is inactive" });
      }

      couponId = coupon.id;
      discountTotal = parseFloat(coupon.discount_amount);
    }

    const processedItems = [];

    for (const item of items) {
      const { variantId, quantity } = item;

      const variantResult = await client.query(
        `SELECT v.id, v.stock_quantity, v.price_modifier, p.base_price, p.discount_percent, p.name
         FROM product_variants v
         JOIN products p ON v.product_id = p.id
         WHERE v.id = $1 FOR UPDATE`,
        [variantId]
      );

      if (variantResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(444).json({ message: `Product variant with ID ${variantId} not found` });
      }

      const variant = variantResult.rows[0];

      if (variant.stock_quantity < quantity) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: `Insufficient stock for product: ${variant.name}` });
      }

      const basePrice = parseFloat(variant.base_price);
      const priceModifier = parseFloat(variant.price_modifier || 0);
      const discountPercent = parseFloat(variant.discount_percent || 0);

      const originalPrice = basePrice + priceModifier;
      const finalUnitPrice = originalPrice * (1 - discountPercent / 100);
      const itemTotal = finalUnitPrice * quantity;

      subtotal += itemTotal;

      processedItems.push({
        variantId,
        quantity,
        unitPrice: finalUnitPrice,
        newStock: variant.stock_quantity - quantity
      });
    }

    if (couponId && subtotal < parseFloat(couponResult.rows[0].min_order_value || 0)) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Minimum order value for coupon not met" });
    }

    if (discountTotal > subtotal) {
      discountTotal = subtotal;
    }

    const finalTotal = subtotal - discountTotal + parseFloat(shippingFee);

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, coupon_id, subtotal, discount_total, shipping_fee, final_total, shipping_address, payment_method, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
       RETURNING id, created_at, status`,
      [userId, couponId, subtotal, discountTotal, shippingFee, finalTotal, shippingAddress, paymentMethod]
    );

    const orderId = orderResult.rows[0].id;

    for (const pi of processedItems) {
      await client.query(
        "INSERT INTO order_items (order_id, variant_id, quantity, unit_price) VALUES ($1, $2, $3, $4)",
        [orderId, pi.variantId, pi.quantity, pi.unitPrice]
      );

      await client.query(
        "UPDATE product_variants SET stock_quantity = $1 WHERE id = $2",
        [pi.newStock, pi.variantId]
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
        discountTotal,
        shippingFee,
        finalTotal
      }
    });

  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT o.id, o.subtotal, o.discount_total, o.shipping_fee, o.final_total, o.status, o.payment_method, o.created_at,
       c.code AS coupon_code
       FROM orders o
       LEFT JOIN coupons c ON o.coupon_id = c.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const orderResult = await pool.query(
      `SELECT o.id, o.subtotal, o.discount_total, o.shipping_fee, o.final_total, o.status, o.shipping_address, o.payment_method, o.created_at,
       c.code AS coupon_code
       FROM orders o
       LEFT JOIN coupons c ON o.coupon_id = c.id
       WHERE o.id = $1 AND o.user_id = $2`,
      [id, userId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const itemsResult = await pool.query(
      `SELECT oi.id, oi.quantity, oi.unit_price, v.sku, v.color_name, p.name AS product_name, img.image_url
       FROM order_items oi
       JOIN product_variants v ON oi.variant_id = v.id
       JOIN products p ON v.product_id = p.id
       LEFT JOIN product_images img ON img.variant_id = v.id AND img.is_primary = TRUE
       WHERE oi.order_id = $1`,
       [id]
    );

    res.status(200).json({
      order: orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (error) {
    next(error);
  }
};