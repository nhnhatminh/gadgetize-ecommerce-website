import { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import "../../styles/layouts/home.css";
import "../../styles/components/hero.css";
import "../../styles/components/showcase.css";

export default function FeaturedShowcase({
  products,
  activeTab,
  setActiveTab,
  navigate,
}) {
  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <svg style={{ display: "none" }}></svg> || (
      <section
        className="showcase-section pb-5"
        style={{ backgroundColor: "var(--bg-main)", paddingTop: "50px" }}
      >
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-3 col-lg-4 d-none d-lg-block">
              <div
                className="showcase-banner rounded-4 p-4 d-flex flex-column h-100 justify-content-between"
                style={{
                  backgroundImage: "url('/images/horizontal-banner.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "450px",
                }}
              >
                <div className="text-center">
                  <h4 className="showcase-banner-title fw-bold fs-5 text-dark bg-white d-inline-block px-3 py-1 rounded-pill shadow-sm">
                    Ưu Đãi Đặc Biệt
                  </h4>
                </div>
                <div className="text-center">
                  <h5 className="text-white fw-bold mb-2 fs-6">
                    Tay Cầm Điều Khiển
                    <br />
                    Aero Control Pro
                  </h5>
                  <p className="text-white fw-bold fs-4 mb-0">3.000.000₫</p>
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="d-flex flex-wrap justify-content-between align-items-center bg-white p-3 rounded-4 mb-4 shadow-sm gap-3">
                <h3 className="mb-0 fs-5 fw-bold ms-2 text-dark">
                  Sản Phẩm Nổi Bật
                </h3>
                <ul
                  className="nav nav-pills showcase-filter gap-1"
                  role="tablist"
                >
                  {["all", "laptop", "keyboard", "mouse", "headphone"].map(
                    (tab) => (
                      <li className="nav-item" key={tab}>
                        <button
                          className={`nav-link rounded-pill px-3 py-1 text-des fw-medium border-0 ${activeTab === tab ? "active" : "text-muted bg-transparent"}`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab === "all"
                            ? "Tất Cả Sản Phẩm"
                            : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="row g-4">
                {filteredProducts.map((prod) => (
                  <div
                    className="col-xl-3 col-md-4 col-sm-6"
                    key={prod.id}
                    onClick={() => navigate("product-detail")}
                  >
                    <ProductCard product={prod} layoutMode="horizontal" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
