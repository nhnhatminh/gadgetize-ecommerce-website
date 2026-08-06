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
      <div className="filter-sidebar bg-white rounded-4 p-4 shadow-sm border border-light-subtle">
        <div className="mb-4">
          <input
            type="text"
            className="form-control py-2 px-3 fs-7"
            placeholder="Tìm kiếm trong cửa hàng..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Danh Mục Sản Phẩm</h5>
          </div>
          <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`cursor-pointer d-flex justify-content-between align-items-center fs-7 ${
                  selectedCategory === cat.id
                    ? "text-success fw-bold"
                    : "text-dark"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="text-muted my-4" />

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Khoảng Giá Tối Đa</h5>
            <span
              className="text-muted fs-8 cursor-pointer"
              onClick={() => setPriceRange(50000000)}
            >
              Đặt Lại
            </span>
          </div>
          <div className="price-range-selector">
            <p className="text-success fw-semibold fs-7 mb-2">
              Dưới {priceRange.toLocaleString("vi-VN")}₫
            </p>
            <input
              type="range"
              className="form-range custom-range-slider"
              min="1000000"
              max="50000000"
              step="1000000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
          </div>
        </div>

        <hr className="text-muted my-4" />

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 fs-6">Thương Hiệu</h5>
            <span
              className="text-muted fs-8 cursor-pointer"
              onClick={() => setSelectedBrand("all")}
            >
              Tất Cả
            </span>
          </div>
          <div className="d-flex flex-column gap-2">
            <div
              className={`cursor-pointer fs-7 ${
                selectedBrand === "all" ? "text-success fw-bold" : "text-dark"
              }`}
              onClick={() => setSelectedBrand("all")}
            >
              Tất Cả Thương Hiệu
            </div>
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className={`cursor-pointer fs-7 ${
                  selectedBrand === brand ? "text-success fw-bold" : "text-dark"
                }`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        <hr className="text-muted my-4" />

        <button
          type="button"
          className="btn btn-outline-secondary w-100 py-2 fs-7 fw-medium rounded-3"
          onClick={onResetFilters}
        >
          Xóa Tất Cả Bộ Lọc
        </button>
      </div>
    </aside>
  );
}