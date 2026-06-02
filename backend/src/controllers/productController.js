import pool from "../config/database.js";

export const getProducts = async (req, res, next) => {
  try {
    const { category, brand, minPrice, maxPrice, color, search, sort, page = 1, limit = 12 } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let queryText = `
      SELECT 
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

    if (sort) {
      switch (sort) {
        case "price_asc":
          queryText += " ORDER BY (p.base_price + COALESCE(v.price_modifier, 0)) ASC";
          break;
        case "price_desc":
          queryText += " ORDER BY (p.base_price + COALESCE(v.price_modifier, 0)) DESC";
          break;
        case "rating":
          queryText += " ORDER BY p.rating DESC";
          break;
        case "newest":
        default:
          queryText += " ORDER BY p.created_at DESC";
          break;
      }
    } else {
      queryText += " ORDER BY p.created_at DESC";
    }

    queryText += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(parseInt(limit, 10), offset);

    const result = await pool.query(queryText, queryParams);

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
    if (search) {
      countQueryText += ` AND (p.name ILIKE $${countParamIndex} OR p.description ILIKE $${countParamIndex})`;
      countParams.push(`%${search}%`);
      countParamIndex++;
    }

    const countResult = await pool.query(countQueryText, countParams);
    const totalProducts = parseInt(countResult.rows[0].count, 10);

    res.status(200).json({
      products: result.rows,
      meta: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / parseInt(limit, 10)),
        currentPage: parseInt(page, 10),
        limit: parseInt(limit, 10),
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