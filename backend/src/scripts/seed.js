import bcrypt from "bcrypt";
import pool from "../config/database.js";

const seedDatabase = async () => {
  try {
    await pool.query("BEGIN");

    await pool.query(`
      TRUNCATE TABLE product_images, product_variants, products, brands, categories 
      RESTART IDENTITY CASCADE
    `);

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await pool.query(`
      INSERT INTO users (first_name, last_name, email, password_hash, phone, role)
      VALUES 
      ('Minh', 'Admin', 'minhadmin@gadgetize.com', $1, '0987654321', 'admin'),
      ('My', 'Customer', 'mycustomer@gadgetize.com', $1, '0907654321', 'customer')
      ON CONFLICT (email) DO NOTHING
    `, [hashedPassword]);

    console.log("Seeded default users: minhadmin@gadgetize.com / mycustomer@gadgetize.com (Password: Admin@123)");

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

    const rawProducts = [
      { category: "accessories", brand: "Razer", name: "Tai Nghe Razer Electra", slug: "tai-nghe-razer-electra", desc: "Premium gaming headset with isolated earcups.", price: 1500000, discount: 20, rating: 5.0, reviews: 1, sku: "SKU-RAZER-E1", color: "Green", hex: "#008000", stock: 12, img: "/images/pr-1.png" },
      { category: "accessories", brand: "Logitech", name: "Chuột Hyper Glide", slug: "chuột-hyper-glide", desc: "Ultra-lightweight wireless gaming mouse.", price: 2500000, discount: 2, rating: 4.2, reviews: 12, sku: "SKU-LOGI-HG2", color: "Black", hex: "#000000", stock: 25, img: "/images/pr-2.png" },
      { category: "audio", brand: "Samsung", name: "Màn Hình LCD Radiant View", slug: "man-hinh-lcd-radiant-view", desc: "4K ultra-wide curved multimedia monitor.", price: 24500000, discount: 9, rating: 4.8, reviews: 8, sku: "SKU-SAMSUNG-RV3", color: "Silver", hex: "#C0C0C0", stock: 7, img: "/images/pr-3.png" },
      { category: "laptop", brand: "ASUS", name: "Laptop Gaming Nitro 5", slug: "laptop-gaming-nitro-5", desc: "High-performance gaming laptop with RTX graphics.", price: 20000000, discount: 15, rating: 4.7, reviews: 3, sku: "SKU-ASUS-N5", color: "Black", hex: "#000000", stock: 5, img: "/images/pr-4.png" },
      { category: "phone", brand: "Apple", name: "Điện thoại iPhone 14 Pro Max", slug: "iphone-14-pro-max", desc: "Flagship smartphone with dynamic island display.", price: 34000000, discount: 50, rating: 4.9, reviews: 14, sku: "SKU-APPLE-14PM", color: "Purple", hex: "#800080", stock: 8, img: "/images/pr-5.png" },
      { category: "accessories", brand: "Razer", name: "Tai Nghe Pure Bass Pro", slug: "tai-nghe-pure-bass-pro", desc: "Noise-cancelling wireless audiophile headphones.", price: 2100000, discount: 14, rating: 4.0, reviews: 9, sku: "SKU-RAZER-PB", color: "Black", hex: "#000000", stock: 15, img: "/images/pr-6.png" },
      { category: "audio", brand: "Samsung", name: "Màn Hình LCD CrystalView", slug: "man-hinh-lcd-crystalview", desc: "High refresh rate esports gaming monitor.", price: 24500000, discount: 9, rating: 4.5, reviews: 21, sku: "SKU-SAM-CV7", color: "Black", hex: "#000000", stock: 11, img: "/images/pr-7.png" },
      { category: "laptop", brand: "ASUS", name: "UltraTech Note X", slug: "ultratech-note-x", desc: "Slim and light professional business ultrabook.", price: 22500000, discount: 12, rating: 4.3, reviews: 5, sku: "SKU-ASUS-UX", color: "Grey", hex: "#808080", stock: 14, img: "/images/pr-8.png" },
      { category: "accessories", brand: "Logitech", name: "Bàn Phím Silent Touch Pro", slug: "ban-phim-silent-touch-pro", desc: "Mechanical keyboard with ultra-quiet switches.", price: 1650000, discount: 46, rating: 4.6, reviews: 7, sku: "SKU-LOGI-ST9", color: "White", hex: "#FFFFFF", stock: 30, img: "/images/pr-9.png" },
      { category: "accessories", brand: "Apple", name: "Tai nghe Airpod Pro 3", slug: "tai-nghe-airpod-pro-3", desc: "Wireless earbuds with adaptive audio engine.", price: 4700000, discount: 30, rating: 4.9, reviews: 18, sku: "SKU-APPLE-APP3", color: "White", hex: "#FFFFFF", stock: 40, img: "/images/pr-10.png" },
      { category: "phone", brand: "Samsung", name: "Galaxy S24 Ultra", slug: "galaxy-s24-ultra", desc: "AI-powered flagship smartphone with built-in S-Pen.", price: 31900000, discount: 10, rating: 4.9, reviews: 25, sku: "SKU-SAM-S24U", color: "Titanium", hex: "#7A7D7D", stock: 18, img: "/images/pr-5.png" },
      { category: "laptop", brand: "Apple", name: "MacBook Pro M3", slug: "macbook-pro-m3", desc: "Next-generation professional creator laptop.", price: 45000000, discount: 5, rating: 5.0, reviews: 32, sku: "SKU-APPLE-MBP3", color: "Space Gray", hex: "#3A3B3C", stock: 10, img: "/images/pr-4.png" },
      { category: "audio", brand: "Logitech", name: "Loa Bluetooth SoundWave", slug: "loa-bluetooth-soundwave", desc: "Waterproof portable speaker with 360-degree sound.", price: 4500000, discount: 15, rating: 4.4, reviews: 4, sku: "SKU-LOGI-SW", color: "Blue", hex: "#0000FF", stock: 22, img: "/images/pr-3.png" },
      { category: "laptop", brand: "ASUS", name: "ROG Strix SCAR 16", slug: "rog-strix-scar-16", desc: "Ultimate tier competitive hardware gaming laptop.", price: 62000000, discount: 8, rating: 4.9, reviews: 6, sku: "SKU-ASUS-ROG16", color: "Black", hex: "#000000", stock: 4, img: "/images/pr-8.png" },
      { category: "phone", brand: "Samsung", name: "Galaxy Z Fold 6", slug: "galaxy-z-fold-6", desc: "Next-gen cinematic foldable display smartphone.", price: 41000000, discount: 12, rating: 4.7, reviews: 9, sku: "SKU-SAM-ZF6", color: "Navy", hex: "#000080", stock: 7, img: "/images/pr-5.png" },
      { category: "accessories", brand: "Razer", name: "Chuột DeathAdder V3 Pro", slug: "chuot-deathadder-v3-pro", desc: "Ergonomic gaming mouse trusted by esports athletes.", price: 3600000, discount: 15, rating: 4.8, reviews: 42, sku: "SKU-RAZER-DA3", color: "White", hex: "#FFFFFF", stock: 19, img: "/images/pr-2.png" },
      { category: "accessories", brand: "Logitech", name: "Bàn Phím G Pro X TKL", slug: "ban-phim-g-pro-x-tkl", desc: "Tenkeyless mechanical keyboard with swappable switches.", price: 4200000, discount: 20, rating: 4.7, reviews: 15, sku: "SKU-LOGI-GPX", color: "Black", hex: "#000000", stock: 14, img: "/images/pr-9.png" },
      { category: "laptop", brand: "ASUS", name: "Zenbook 14 OLED", slug: "zenbook-14-oled", desc: "Stunning color accuracy workspace laptop.", price: 28000000, discount: 10, rating: 4.6, reviews: 11, sku: "SKU-ASUS-ZB14", color: "Blue", hex: "#0B1D3A", stock: 12, img: "/images/pr-4.png" },
      { category: "phone", brand: "Apple", name: "iPhone 15 Pro", slug: "iphone-15-pro", desc: "Aerospace-grade titanium frame high-performance mobile.", price: 29000000, discount: 5, rating: 4.8, reviews: 29, sku: "SKU-APPLE-15P", color: "Natural", hex: "#BEB7A4", stock: 16, img: "/images/pr-5.png" },
      { category: "audio", brand: "Samsung", name: "Soundbar HW-Q990C", slug: "soundbar-hw-q990c", desc: "True Dolby Atmos home cinema audio setup.", price: 19900000, discount: 25, rating: 5.0, reviews: 13, sku: "SKU-SAM-Q990", color: "Black", hex: "#000000", stock: 6, img: "/images/pr-3.png" },
      { category: "laptop", brand: "Razer", name: "Razer Blade 16", slug: "razer-blade-16", desc: "Anodized aluminum chassis powerful high-end laptop.", price: 85000000, discount: 5, rating: 4.7, reviews: 4, sku: "SKU-RAZER-B16", color: "Black", hex: "#000000", stock: 3, img: "/images/pr-8.png" },
      { category: "phone", brand: "ASUS", name: "ROG Phone 8 Pro", slug: "rog-phone-8-pro", desc: "Ultimate mobile cooling built-in gaming smartphone.", price: 27500000, discount: 10, rating: 4.8, reviews: 17, sku: "SKU-ASUS-ROG8", color: "Black", hex: "#000000", stock: 9, img: "/images/pr-5.png" },
      { category: "accessories", brand: "Apple", name: "Magic Keyboard M4", slug: "magic-keyboard-m4", desc: "Sleek magnetic workspace keyboard for tablets.", price: 8900000, discount: 5, rating: 4.5, reviews: 22, sku: "SKU-APPLE-MK4", color: "Black", hex: "#000000", stock: 13, img: "/images/pr-9.png" },
      { category: "audio", brand: "Logitech", name: "Tai nghe G733 LightSpeed", slug: "tai-nghe-g733-lightspeed", desc: "Immersive sound signature gaming audio device.", price: 3200000, discount: 15, rating: 4.4, reviews: 36, sku: "SKU-LOGI-G733", color: "Lilac", hex: "#C8A2C8", stock: 20, img: "/images/pr-6.png" }
    ];

    for (const p of rawProducts) {
      const productResult = await pool.query(`
        INSERT INTO products (category_id, brand_id, name, slug, description, base_price, discount_percent, rating, review_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
      `, [
        categoryMap[p.category],
        brandMap[p.brand],
        p.name,
        p.slug,
        p.desc,
        p.price,
        p.discount,
        p.rating,
        p.reviews
      ]);

      const productId = productResult.rows[0].id;

      const variantResult = await pool.query(`
        INSERT INTO product_variants (product_id, sku, color_name, color_hex, stock_quantity, price_modifier)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
      `, [productId, p.sku, p.color, p.hex, p.stock, 0]);

      const variantId = variantResult.rows[0].id;

      await pool.query(`
        INSERT INTO product_images (variant_id, image_url, is_primary)
        VALUES ($1, $2, $3)
      `, [variantId, p.img, true]);
    }

    await pool.query("COMMIT");
    console.log("Database seeded successfully with 24 technological items.");
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
  }
};

seedDatabase();