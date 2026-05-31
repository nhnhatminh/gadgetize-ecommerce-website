import React, { useState } from "react";
import ProductCard from "../../components/common/ProductCard";
import "../styles/layouts/products_page.css";

export default function Products({ navigate }) {
  const [priceRange, setPriceRange] = useState(5000000);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = [
    { id: "all", name: "Tất Cả Danh Mục" },
    { id: "laptop", name: "Laptop & Máy Tính" },
    { id: "phone", name: "Smartphone & Tablet" },
    { id: "audio", name: "TV & Âm Thanh" },
    { id: "accessories", name: "Tai Nghe & Phụ Kiện" },
  ];

  const brands = ["Razer", "Logitech", "Apple", "Samsung", "ASUS"];

  const productList = [
    {
      id: 1,
      category: "accessories",
      discount: 20,
      image: "/images/pr-1.png",
      name: "Tai Nghe Razer Electra",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 1,
      oldPrice: 1500000,
      newPrice: 1200000,
    },
    {
      id: 2,
      category: "accessories",
      discount: 2,
      image: "/images/pr-2.png",
      name: "Chuột Hyper Glide",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 4,
      reviews: 12,
      oldPrice: 2500000,
      newPrice: 2450000,
    },
    {
      id: 3,
      category: "audio",
      discount: 9,
      image: "/images/pr-3.png",
      name: "Màn Hình LCD Radiant View",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 8,
      oldPrice: 24500000,
      newPrice: 22500000,
    },
    {
      id: 4,
      category: "laptop",
      discount: 15,
      image: "/images/pr-4.png",
      name: "Laptop Gaming Nitro 5",
      description:
        "Sản phẩm laptop cấu hình cao dành riêng cho giới game thủ chuyên nghiệp.",
      rating: 5,
      reviews: 3,
      oldPrice: 20000000,
      newPrice: 17000000,
    },
  ];

  const filteredProducts = productList
    .filter(
      (p) => selectedCategory === "all" || p.category === selectedCategory,
    )
    .filter((p) => p.newPrice <= priceRange)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.newPrice - b.newPrice;
      if (sortBy === "price-high") return b.newPrice - a.newPrice;
      return 0;
    });

  return (
    <div className="products-page-wrapper">
      <section
        className="page-banner position-relative py-5 overflow-hidden"
        style={{ backgroundColor: "var(--light-grey)" }}
      >
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{ minHeight: "180px" }}
          >
            <div className="col-12 text-center z-2">
              <h1 className="fw-bold text-dark mb-0">Danh Sách Sản Phẩm</h1>
            </div>
            <img
              src="/images/breadcome-pr.png"
              alt="Tablet"
              className="position-absolute start-0 bottom-0 d-none d-lg-block w-auto h-100 p-3 z-1"
            />
            <img
              src="/images/pr-5.png"
              alt="Phones"
              className="position-absolute end-0 bottom-0 d-none d-lg-block w-auto h-100 p-3 z-1"
            />
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <aside className="col-lg-3">
            <div className="filter-sidebar bg-white rounded-4 p-4 shadow-sm mb-4">
              <h5 className="fw-bold text-dark mb-4 pb-2 border-bottom">
                Danh Mục
              </h5>
              <ul className="sidebar-category-list d-flex flex-column gap-2">
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className={`cursor-pointer text-p ${selectedCategory === cat.id ? "text-success fw-semibold" : "text-dark"}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-sidebar bg-white rounded-4 p-4 shadow-sm mb-4">
              <h5 className="fw-bold text-dark mb-4 pb-2 border-bottom">
                Lọc Theo Giá
              </h5>
              <div className="price-range-selector">
                <input
                  type="range"
                  className="form-range custom-range-slider"
                  min="1000000"
                  max="30000000"
                  step="500000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between align-items-center mt-3 fs-7 text-dark fw-medium">
                  <span>Mức giá tối đa:</span>
                  <span className="text-success">
                    {priceRange.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            </div>

            <div className="filter-sidebar bg-white rounded-4 p-4 shadow-sm">
              <h5 className="fw-bold text-dark mb-4 pb-2 border-bottom">
                Thương Hiệu
              </h5>
              <div className="d-flex flex-column gap-2">
                {brands.map((brand, idx) => (
                  <div
                    className="form-check d-flex align-items-center gap-2"
                    key={idx}
                  >
                    <input
                      className="form-check-input m-0"
                      type="checkbox"
                      id={`brand-${idx}`}
                    />
                    <label
                      className="form-check-label mt-1 text-dark fs-7"
                      htmlFor={`brand-${idx}`}
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <main className="col-lg-9">
            <div className="products-toolbar d-flex flex-wrap justify-content-between align-items-center bg-white p-3 rounded-4 mb-4 shadow-sm gap-3">
              <p className="mb-0 text-muted fs-7">
                Hiển thị{" "}
                <span className="text-dark fw-semibold">
                  {filteredProducts.length}
                </span>{" "}
                sản phẩm phù hợp
              </p>
              <div className="d-flex align-items-center gap-2">
                <span className="text-dark fs-7 fw-medium text-nowrap">
                  Sắp xếp:
                </span>
                <select
                  className="form-select form-select-sm border-light-subtle rounded-3 py-2 text-dark fs-7"
                  style={{ width: "180px" }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Mặc định</option>
                  <option value="price-low">Giá: Thấp đến Cao</option>
                  <option value="price-high">Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>

            <div className="row g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
                  <div
                    className="col-xl-3 col-md-4"
                    key={prod.id}
                    onClick={() => navigate("product-detail")}
                  >
                    <ProductCard product={prod} layoutMode="vertical" />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted fs-6 mb-0">
                    Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
