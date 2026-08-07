import pool from "../config/database.js";

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT ci.id, ci.variant_id, ci.quantity, v.sku, v.color_name, p.name, p.base_price, p.discount_percent, v.stock_quantity,
       (p.base_price + COALESCE(v.price_modifier, 0)) AS original_price,
       ((p.base_price + COALESCE(v.price_modifier, 0)) * (1 - p.discount_percent / 100.0)) AS final_unit_price,
       img.image_url
       FROM cart_items ci
       JOIN product_variants v ON ci.variant_id = v.id
       JOIN products p ON v.product_id = p.id
       LEFT JOIN product_images img ON img.variant_id = v.id AND img.is_primary = TRUE
       WHERE ci.user_id = $1
       ORDER BY ci.created_at DESC`,
      [userId]
    );

    const formattedItems = result.rows.map((item) => ({
      ...item,
      quantity: parseInt(item.quantity, 10),
      stock_quantity: parseInt(item.stock_quantity, 10),
      base_price: parseFloat(item.base_price || 0),
      original_price: parseFloat(item.original_price || 0),
      final_unit_price: parseFloat(item.final_unit_price || 0),
      discount_percent: parseInt(item.discount_percent || 0, 10),
    }));

    res.status(200).json(formattedItems);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { variantId, quantity = 1 } = req.body;
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    const variantCheck = await pool.query(
      "SELECT stock_quantity FROM product_variants WHERE id = $1",
      [variantId]
    );

    if (variantCheck.rows.length === 0) {
      return res.status(404).json({ message: "Product variant not found" });
    }

    const stockQuantity = parseInt(variantCheck.rows[0].stock_quantity, 10);

    const existingItem = await pool.query(
      "SELECT id, quantity FROM cart_items WHERE user_id = $1 AND variant_id = $2",
      [userId, variantId]
    );

    if (existingItem.rows.length > 0) {
      const newQuantity = parseInt(existingItem.rows[0].quantity, 10) + parsedQuantity;
      if (newQuantity > stockQuantity) {
        return res.status(400).json({ message: "Requested quantity exceeds available stock" });
      }

      await pool.query(
        "UPDATE cart_items SET quantity = $1 WHERE id = $2",
        [newQuantity, existingItem.rows[0].id]
      );
      return res.status(200).json({ message: "Cart updated successfully" });
    }

    if (parsedQuantity > stockQuantity) {
      return res.status(400).json({ message: "Requested quantity exceeds available stock" });
    }

    await pool.query(
      "INSERT INTO cart_items (user_id, variant_id, quantity) VALUES ($1, $2, $3)",
      [userId, variantId, parsedQuantity]
    );
    res.status(201).json({ message: "Item added to cart" });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      const deleteResult = await pool.query(
        "DELETE FROM cart_items WHERE id = $1 AND user_id = $2",
        [id, userId]
      );
      if (deleteResult.rowCount === 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      return res.status(200).json({ message: "Item removed from cart" });
    }

    const itemCheck = await pool.query(
      `SELECT ci.variant_id, v.stock_quantity 
       FROM cart_items ci
       JOIN product_variants v ON ci.variant_id = v.id
       WHERE ci.id = $1 AND ci.user_id = $2`,
      [id, userId]
    );

    if (itemCheck.rows.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const stockQuantity = parseInt(itemCheck.rows[0].stock_quantity, 10);

    if (parsedQuantity > stockQuantity) {
      return res.status(400).json({ message: "Requested quantity exceeds available stock" });
    }

    await pool.query(
      "UPDATE cart_items SET quantity = $1 WHERE id = $2 AND user_id = $3",
      [parsedQuantity, id, userId]
    );
    res.status(200).json({ message: "Cart item quantity updated" });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM cart_items WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    next(error);
  }
};