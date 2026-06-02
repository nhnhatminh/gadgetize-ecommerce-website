import pool from "../config/database.js";

const seedDatabase = async () => {
  try {
    await pool.query("BEGIN");

    await pool.query(`
      TRUNCATE TABLE product_images, product_variants, products, brands, categories 
      RESTART IDENTITY CASCADE
    `);

    const categoriesResult = await pool.query(`
      INSERT INTO categories (name, slug) VALUES 
      ('Laptop & Máy Tính', 'laptop'),
      ('Smartphone & Tablet', 'phone'),
      ('TV & Âm Thanh', 'audio'),
      ('Tai Nghe & Phụ Kiện', 'accessories')
      RETURNING id, slug
    `);

    const categoryMap = {};
    categoriesResult.rows.forEach(row => {
      categoryMap[row.slug] = row.id;
    });

    const brandsResult = await pool.query(`
      INSERT INTO brands (name) VALUES 
      ('Razer'),
      ('Logitech'),
      ('Apple'),
      ('Samsung'),
      ('ASUS')
      RETURNING id, name
    `);

    const brandMap = {};
    brandsResult.rows.forEach(row => {
      brandMap[row.name] = row.id;
    });

    const p1 = await pool.query(`
      INSERT INTO products (category_id, brand_id, name, slug, description, base_price, discount_percent, rating, review_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, [
      categoryMap["accessories"],
      brandMap["Razer"],
      "Tai Nghe Razer Electra",
      "tai-nghe-razer-electra",
      "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      1500000,
      20,
      5.00,
      1
    ]);

    const v1 = await pool.query(`
      INSERT INTO product_variants (product_id, sku, color_name, color_hex, stock_quantity, price_modifier)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `, [p1.rows[0].id, "SKU-RAZER-E1", "Green", "#008000", 12, 0]);

    await pool.query(`
      INSERT INTO product_images (variant_id, image_url, is_primary)
      VALUES ($1, $2, $3)
    `, [v1.rows[0].id, "/images/pr-1.png", true]);

    const p2 = await pool.query(`
      INSERT INTO products (category_id, brand_id, name, slug, description, base_price, discount_percent, rating, review_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, [
      categoryMap["phone"],
      brandMap["Apple"],
      "Điện thoại iPhone 14 Pro Max",
      "iphone-14-pro-max",
      "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      34000000,
      50,
      5.00,
      14
    ]);

    const v2 = await pool.query(`
      INSERT INTO product_variants (product_id, sku, color_name, color_hex, stock_quantity, price_modifier)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `, [p2.rows[0].id, "SKU-IPHONE14-PM", "Purple", "#800080", 8, 0]);

    await pool.query(`
      INSERT INTO product_images (variant_id, image_url, is_primary)
      VALUES ($1, $2, $3)
    `, [v2.rows[0].id, "/images/pr-5.png", true]);

    const p3 = await pool.query(`
      INSERT INTO products (category_id, brand_id, name, slug, description, base_price, discount_percent, rating, review_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, [
      categoryMap["laptop"],
      brandMap["ASUS"],
      "Laptop Gaming Nitro 5",
      "laptop-gaming-nitro-5",
      "Sản phẩm laptop cấu hình cao dành riêng cho giới game thủ chuyên nghiệp.",
      20000000,
      15,
      5.00,
      3
    ]);

    const v3 = await pool.query(`
      INSERT INTO product_variants (product_id, sku, color_name, color_hex, stock_quantity, price_modifier)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `, [p3.rows[0].id, "SKU-NITRO5-01", "Black", "#000000", 5, 0]);

    await pool.query(`
      INSERT INTO product_images (variant_id, image_url, is_primary)
      VALUES ($1, $2, $3)
    `, [v3.rows[0].id, "/images/pr-4.png", true]);

    await pool.query("COMMIT");
    console.log("Database seeded successfully.");
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
  }
};

seedDatabase();