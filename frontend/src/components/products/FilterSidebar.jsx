import "../../styles/layouts/products_page.css";

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  brands,
  selectedBrand,
  setSelectedBrand,
  searchKeyword,
  setSearchKeyword,
  onResetFilters,
}) {
  return (
    <aside className="col-lg-3">
      <div className="filter-sidebar-card">
        <div className="filter-search-box">
          <input
            type="text"
            className="filter-search-input"
            placeholder="Tìm kiếm trong cửa hàng..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <div className="filter-section">
          <div className="filter-section-header">
            <h5 className="filter-section-title">Danh Mục Sản Phẩm</h5>
          </div>
          <ul className="filter-category-list">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`filter-category-item ${
                  selectedCategory === cat.id ? "filter-category-item--active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-divider" />

        <div className="filter-section">
          <div className="filter-section-header">
            <h5 className="filter-section-title">Khoảng Giá Tối Đa</h5>
            <span
              className="filter-reset-link"
              onClick={() => setPriceRange(50000000)}
            >
              Đặt Lại
            </span>
          </div>
          <div className="filter-price-selector">
            <p className="filter-price-value">
              Dưới {priceRange.toLocaleString("vi-VN")}₫
            </p>
            <input
              type="range"
              className="filter-price-slider"
              min="1000000"
              max="50000000"
              step="1000000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="filter-divider" />

        <div className="filter-section">
          <div className="filter-section-header">
            <h5 className="filter-section-title">Thương Hiệu</h5>
            <span
              className="filter-reset-link"
              onClick={() => setSelectedBrand("all")}
            >
              Tất Cả
            </span>
          </div>
          <div className="filter-brand-list">
            <div
              className={`filter-brand-item ${
                selectedBrand === "all" ? "filter-brand-item--active" : ""
              }`}
              onClick={() => setSelectedBrand("all")}
            >
              Tất Cả Thương Hiệu
            </div>
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className={`filter-brand-item ${
                  selectedBrand === brand ? "filter-brand-item--active" : ""
                }`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        <div className="filter-divider" />

        <button
          type="button"
          className="filter-reset-all-btn"
          onClick={onResetFilters}
        >
          Xóa Tất Cả Bộ Lọc
        </button>
      </div>
    </aside>
  );
}