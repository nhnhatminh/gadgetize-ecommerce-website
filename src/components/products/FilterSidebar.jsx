import React from "react";

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  brands,
}) {
  return (
    <aside className="col-lg-3">
      <div className="filter-sidebar bg-white rounded-4 p-4 shadow-sm mb-4">
        <h5 className="fw-bold text-dark mb-4 pb-2 border-bottom">Danh Mục</h5>
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
  );
}
