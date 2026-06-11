import React, { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { productApi } from "../../api/productApi";
import "../../styles/layouts/home.css";
import "../../styles/components/hero.css";
import "../../styles/components/showcase.css";

export default function PopularGrid({
  activePopularTab,
  setActivePopularTab,
  navigate,
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const params = { limit: 24 };
        if (activePopularTab !== "all") {
          params.category = activePopularTab;
        }
        const data = await productApi.getProducts(params);
        const formatted = data.products.map((p) => ({
          id: p.id,
          variantId: p.variant_id,
          slug: p.slug,
          name: p.name,
          image: p.image_url || "/images/no-image.png",
          description: p.description,
          discount: parseInt(p.discount_percent || 0, 10),
          oldPrice: parseFloat(p.base_price),
          newPrice:
            (parseFloat(p.base_price) + parseFloat(p.price_modifier || 0)) *
            (1 - parseFloat(p.discount_percent || 0) / 100),
          rating: parseFloat(p.rating || 5),
          reviews: parseInt(p.review_count || 0, 10),
        }));
        setProducts(formatted);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularProducts();
  }, [activePopularTab]);

  return (
    <section className="products-grid-section py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center bg-white p-3 rounded-4 mb-4 shadow-sm gap-3">
          <h3 className="mb-0 fs-5 fw-bold ms-2 text-dark">
            Sản Phẩm Phổ Biến
          </h3>
          <ul className="nav nav-pills showcase-filter gap-1" role="tablist">
            {["all", "laptop", "keyboard", "mouse", "headphone"].map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link rounded-pill px-3 py-1 text-des fw-medium border-0 ${activePopularTab === tab ? "active" : "text-muted bg-transparent"}`}
                  onClick={() => setActivePopularTab(tab)}
                >
                  {tab === "all"
                    ? "Tất Cả"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="row g-4">
          {products.map((prod) => (
            <div
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6"
              key={prod.id}
              onClick={() => navigate("product-detail", prod.slug)}
            >
              <ProductCard product={prod} layoutMode="vertical" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
