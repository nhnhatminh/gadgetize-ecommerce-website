import pool from "../config/database.js";

export const getProducts = async (req, res, next) => {
  try {
    const { category, brand, minPrice, maxPrice, color, search, sort, page = 1, limit = 12 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const offset = (pageNum - 1) * limitNum;

    // Dùng DISTINCT ON để loại bỏ sản phẩm trùng khi JOIN nhiều biến thể
    let queryText = `
      SELECT DISTINCT ON (p.id)
        p.id, p.name, p.slug, p.description, p.base_price, p.discount_percent, p.rating, p.review_count, p.created_at,
        c.name AS category_name, c.slug AS category_slug,
        b.name AS brand_name,
        v.id AS variant_id, v.sku, v.color_name, v.color_hex, v.stock_quantity, v.price_modifier,
        img.image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_variants v ON v.product_id = p.id
      LEFT JOIN product_images img ON img.variant_id = v.id AND img.is_primary = TRUE
      WHERE 1=1
    `;

    const queryParams = [];
    let paramIndex = 1;

    if (category) {
      queryText += ` AND c.slug = $${paramIndex}`;
      queryParams.push(category);
      paramIndex++;
    }

    if (brand) {
      queryText += ` AND b.name = $${paramIndex}`;
      queryParams.push(brand);
      paramIndex++;
    }

    if (minPrice) {
      queryText += ` AND (p.base_price + COALESCE(v.price_modifier, 0)) >= $${paramIndex}`;
      queryParams.push(parseFloat(minPrice));
      paramIndex++;
    }

    if (maxPrice) {
      queryText += ` AND (p.base_price + COALESCE(v.price_modifier, 0)) <= $${paramIndex}`;
      queryParams.push(parseFloat(maxPrice));
      paramIndex++;
    }

    if (color) {
      queryText += ` AND v.color_name = $${paramIndex}`;
      queryParams.push(color);
      paramIndex++;
    }

    if (search) {
      queryText += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    //  Bọc query để hỗ trợ sắp xếp theo giá sau khi lọc
    let finalQueryText = `SELECT * FROM (${queryText}) AS subquery`;

    if (sort) {
      switch (sort) {
        case "price_asc":
          finalQueryText += " ORDER BY (base_price + COALESCE(price_modifier, 0)) ASC";
          break;
        case "price_desc":
          finalQueryText += " ORDER BY (base_price + COALESCE(price_modifier, 0)) DESC";
          break;
        case "rating":
          finalQueryText += " ORDER BY rating DESC";
          break;
        case "newest":
        default:
          finalQueryText += " ORDER BY created_at DESC";
          break;
      }
    } else {
      finalQueryText += " ORDER BY created_at DESC";
    }

    finalQueryText += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(limitNum, offset);

    const result = await pool.query(finalQueryText, queryParams);

    // Đếm tổng số sản phẩm theo các điều kiện lọc
    let countQueryText = `
      SELECT COUNT(DISTINCT p.id) 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_variants v ON v.product_id = p.id
      WHERE 1=1
    `;

    const countParams = [];
    let countParamIndex = 1;

    if (category) {
      countQueryText += ` AND c.slug = $${countParamIndex}`;
      countParams.push(category);
      countParamIndex++;
    }
    if (brand) {
      countQueryText += ` AND b.name = $${countParamIndex}`;
      countParams.push(brand);
      countParamIndex++;
    }
    if (minPrice) {
      countQueryText += ` AND (p.base_price + COALESCE(v.price_modifier, 0)) >= $${countParamIndex}`;
      countParams.push(parseFloat(minPrice));
      countParamIndex++;
    }
    if (maxPrice) {
      countQueryText += ` AND (p.base_price + COALESCE(v.price_modifier, 0)) <= $${countParamIndex}`;
      countParams.push(parseFloat(maxPrice));
      countParamIndex++;
    }
    if (color) {
      countQueryText += ` AND v.color_name = $${countParamIndex}`;
      countParams.push(color);
      countParamIndex++;
    }
    if (search) {
      countQueryText += ` AND (p.name ILIKE $${countParamIndex} OR p.description ILIKE $${countParamIndex})`;
      countParams.push(`%${search}%`);
      countParamIndex++;
    }

    const countResult = await pool.query(countQueryText, countParams);
    const totalProducts = parseInt(countResult.rows[0].count, 10);

    // Chuyển kiểu dữ liệu từ PostgreSQL sang Number
    const formattedProducts = result.rows.map((item) => ({
      ...item,
      base_price: parseFloat(item.base_price),
      discount_percent: parseInt(item.discount_percent || 0, 10),
      rating: parseFloat(item.rating || 0),
      review_count: parseInt(item.review_count || 0, 10),
      price_modifier: parseFloat(item.price_modifier || 0),
      stock_quantity: parseInt(item.stock_quantity || 0, 10),
    }));

    res.status(200).json({
      products: formattedProducts,
      meta: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, slug, parent_id FROM categories ORDER BY name ASC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getBrands = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, logo_url FROM brands ORDER BY name ASC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { categoryId, brandId, name, slug, description, basePrice, discountPercent, sku, colorName, colorHex, stockQuantity, priceModifier } = req.body;

    let imageUrl = "/images/no-image.png";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const productResult = await client.query(
      `INSERT INTO products (category_id, brand_id, name, slug, description, base_price, discount_percent)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [categoryId, brandId, name, slug, description, basePrice, discountPercent || 0]
    );
    const productId = productResult.rows[0].id;

    const variantResult = await client.query(
      `INSERT INTO product_variants (product_id, sku, color_name, color_hex, stock_quantity, price_modifier)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [productId, sku, colorName, colorHex, stockQuantity || 0, priceModifier || 0]
    );
    const variantId = variantResult.rows[0].id;

    await client.query(
      `INSERT INTO product_images (variant_id, image_url, is_primary)
       VALUES ($1, $2, true)`,
      [variantId, imageUrl]
    );

    await client.query("COMMIT");
    res.status(201).json({ message: "Thêm sản phẩm thành công", productId });
  } catch (error) {
    await client.query("ROLLBACK");
    // Xử lý lỗi trùng slug hoặc SKU
    if (error.code === "23505") {
      return res.status(400).json({ message: "Mã SKU hoặc đường dẫn Slug sản phẩm đã tồn tại" });
    }
    next(error);
  } finally {
    client.release();
  }
};

export const updateProduct = async (req, res, next) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { id } = req.params;
    const { categoryId, brandId, name, slug, description, basePrice, discountPercent, sku, colorName, colorHex, stockQuantity, priceModifier } = req.body;

    await client.query(
      `UPDATE products 
       SET category_id = $1, brand_id = $2, name = $3, slug = $4, description = $5, base_price = $6, discount_percent = $7
       WHERE id = $8`,
      [categoryId, brandId, name, slug, description, basePrice, discountPercent, id]
    );

    const variantRes = await client.query(
      `SELECT id FROM product_variants WHERE product_id = $1 LIMIT 1`,
      [id]
    );

    if (variantRes.rows.length > 0) {
      const variantId = variantRes.rows[0].id;
      await client.query(
        `UPDATE product_variants 
         SET sku = $1, color_name = $2, color_hex = $3, stock_quantity = $4, price_modifier = $5
         WHERE id = $6`,
        [sku, colorName, colorHex, stockQuantity, priceModifier, variantId]
      );

      if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`;
        await client.query(
          `UPDATE product_images SET image_url = $1 WHERE variant_id = $2 AND is_primary = true`,
          [imageUrl, variantId]
        );
      }
    }

    await client.query("COMMIT");
    res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "23505") {
      return res.status(400).json({ message: "Mã SKU hoặc đường dẫn Slug sản phẩm đã tồn tại" });
    }
    next(error);
  } finally {
    client.release();
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(400).json({
        message:
          "Không thể xóa sản phẩm này do đã tồn tại trong đơn hàng hoặc giỏ hàng của người dùng",
      });
    }
    next(error);
  }
};