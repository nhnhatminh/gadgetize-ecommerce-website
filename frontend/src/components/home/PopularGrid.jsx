import React from "react";
import ProductCard from "../common/ProductCard";
import "../../styles/layouts/home.css";
import "../../styles/components/hero.css";
import "../../styles/components/showcase.css";

export default function PopularGrid({
  activePopularTab,
  setActivePopularTab,
  navigate,
}) {
  const popularProducts = [
    {
      id: 5,
      name: "Tai Nghe Razer Electra",
      newPrice: 1200000,
      oldPrice: 1500000,
      image: "/images/pr-1.png",
      discount: 20,
      category: "headphone",
      description: "Lorem ipsum dolor sit amet consectetur.",
      rating: 5,
      reviews: 1,
    },
    {
      id: 6,
      name: "Chuột Hyper Glide",
      newPrice: 2450000,
      oldPrice: 2500000,
      image: "/images/pr-2.png",
      discount: 2,
      category: "mouse",
      description: "Lorem ipsum dolor sit amet consectetur.",
      rating: 5,
      reviews: 1,
    },
    {
      id: 7,
      name: "iTab Vision Pro",
      newPrice: 8600000,
      oldPrice: 10000000,
      image: "/images/pr-4.png",
      discount: 14,
      category: "laptop",
      description: "Lorem ipsum dolor sit amet consectetur.",
      rating: 5,
      reviews: 1,
    },
    {
      id: 8,
      name: "iPhone 15 Pro Max",
      newPrice: 32000000,
      oldPrice: 44000000,
      image: "/images/pr-5.png",
      discount: 27,
      category: "laptop",
      description: "Lorem ipsum dolor sit amet consectetur.",
      rating: 5,
      reviews: 1,
    },
    {
      id: 9,
      name: "Thiết Bị Âm Thanh",
      newPrice: 1500000,
      oldPrice: 1800000,
      image: "/images/pr-6.png",
      discount: 20,
      category: "headphone",
      description: "Lorem ipsum dolor sit amet consectetur.",
      rating: 5,
      reviews: 1,
    },
    {
      id: 10,
      name: "Màn Hình LCD Phụ",
      newPrice: 4950000,
      oldPrice: 5500000,
      image: "/images/pr-3.png",
      discount: 10,
      category: "keyboard",
      description: "Lorem ipsum dolor sit amet consectetur.",
      rating: 5,
      reviews: 1,
    },
  ];

  const filteredPopularProducts =
    activePopularTab === "all"
      ? popularProducts
      : popularProducts.filter((p) => p.category === activePopularTab);

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
          {filteredPopularProducts.map((prod) => (
            <div
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6"
              key={prod.id}
              onClick={() => navigate("product-detail")}
            >
              <ProductCard product={prod} layoutMode="vertical" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
