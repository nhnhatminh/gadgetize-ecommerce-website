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

    // Kiểm tra và khóa dòng thông tin mã giảm giá 
    if (couponCode) {
      const couponResult = await client.query(
        `SELECT id, discount_amount, min_order_value, expiration_date, is_active 
         FROM coupons 
         WHERE code = $1 FOR UPDATE`,
        [couponCode]
      );

      if (couponResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: "Invalid coupon code" });
      }

      const coupon = couponResult.rows[0];
      const now = new Date();

      if (!coupon.is_active || (coupon.expiration_date && new Date(coupon.expiration_date) < now)) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: "Coupon has expired or is inactive" });
      }

      couponId = coupon.id;
      discountTotal = parseFloat(coupon.discount_amount || 0);
    }

    const processedItems = [];

    // Kiểm tra tồn kho
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
        return res.status(404).json({ message: `Product variant with ID ${variantId} not found` });
      }

      const variant = variantResult.rows[0];

      if (variant.stock_quantity < quantity) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: `Insufficient stock for product: ${variant.name}` });
      }

      const basePrice = parseFloat(variant.base_price || 0);
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

    // Kiểm tra giá trị đơn hàng tối thiểu
    if (couponId) {
      const couponCheck = await client.query(
        "SELECT min_order_value FROM coupons WHERE id = $1",
        [couponId]
      );
      const minOrderValue = parseFloat(couponCheck.rows[0]?.min_order_value || 0);
      if (subtotal < minOrderValue) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: "Minimum order value for coupon not met" });
      }
    }

    if (discountTotal > subtotal) {
      discountTotal = subtotal;
    }

    const parsedShippingFee = parseFloat(shippingFee || 0);
    const finalTotal = subtotal - discountTotal + parsedShippingFee;

    // Tạo bản ghi đơn hàng
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, coupon_id, subtotal, discount_total, shipping_fee, final_total, shipping_address, payment_method, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
       RETURNING id, created_at, status`,
      [userId, couponId, subtotal, discountTotal, parsedShippingFee, finalTotal, shippingAddress, paymentMethod]
    );

    const orderId = orderResult.rows[0].id;

    // Thêm danh sách chi tiết đơn hàng và cập nhật tồn kho
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

    // Cập nhật lượt đã sử dụng của Coupon
    if (couponId) {
      await client.query(
        "UPDATE coupons SET used_count = COALESCE(used_count, 0) + 1 WHERE id = $1",
        [couponId]
      );
    }

    // Xóa các sản phẩm trong giỏ hàng
    await client.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
      status: orderResult.rows[0].status,
      createdAt: orderResult.rows[0].created_at,
      totals: {
        subtotal,
        discountTotal,
        shippingFee: parsedShippingFee,
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

// Kiểm tra tính hợp lệ của Coupon
export const checkCoupon = async (req, res, next) => {
  try {
    const { couponCode, subtotal } = req.body;
    if (!couponCode) {
      return res.status(400).json({ message: "Vui lòng nhập mã giảm giá" });
    }

    const result = await pool.query(
      `SELECT id, code, discount_amount, min_order_value, expiration_date, is_active 
       FROM coupons 
       WHERE code = $1`,
      [couponCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
    }

    const coupon = result.rows[0];
    const now = new Date();

    if (!coupon.is_active || (coupon.expiration_date && new Date(coupon.expiration_date) < now)) {
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn hoặc ngưng áp dụng" });
    }

    if (subtotal && parseFloat(subtotal) < parseFloat(coupon.min_order_value || 0)) {
      return res.status(400).json({
        message: `Giá trị đơn hàng tối thiểu phải từ ${parseFloat(coupon.min_order_value).toLocaleString("vi-VN")}₫ để sử dụng mã này`
      });
    }

    res.status(200).json({
      message: "Áp dụng mã giảm giá thành công",
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discountAmount: parseFloat(coupon.discount_amount || 0)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách lịch sử đơn hàng
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

    const formattedOrders = result.rows.map((order) => ({
      ...order,
      subtotal: parseFloat(order.subtotal || 0),
      discount_total: parseFloat(order.discount_total || 0),
      shipping_fee: parseFloat(order.shipping_fee || 0),
      final_total: parseFloat(order.final_total || 0),
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin chi tiết đơn hàng theo ID cho người dùng
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

    const orderData = orderResult.rows[0];

    res.status(200).json({
      order: {
        ...orderData,
        subtotal: parseFloat(orderData.subtotal || 0),
        discount_total: parseFloat(orderData.discount_total || 0),
        shipping_fee: parseFloat(orderData.shipping_fee || 0),
        final_total: parseFloat(orderData.final_total || 0),
      },
      items: itemsResult.rows.map((item) => ({
        ...item,
        unit_price: parseFloat(item.unit_price || 0),
        quantity: parseInt(item.quantity, 10),
      })),
    });
  } catch (error) {
    next(error);
  }
};

// Lấy toàn bộ danh sách đơn hàng dành cho Admin
export const getAllOrdersAdmin = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT o.id, o.subtotal, o.discount_total, o.shipping_fee, o.final_total, o.status, o.payment_method, o.created_at, o.shipping_address,
       u.first_name, u.last_name, u.email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );

    const formattedOrders = result.rows.map((order) => ({
      ...order,
      subtotal: parseFloat(order.subtotal || 0),
      discount_total: parseFloat(order.discount_total || 0),
      shipping_fee: parseFloat(order.shipping_fee || 0),
      final_total: parseFloat(order.final_total || 0),
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    next(error);
  }
};

// Cập nhật trạng thái đơn hàng dành cho Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE orders SET status = $1 WHERE id = $2 RETURNING id`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    next(error);
  }
};