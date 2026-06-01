import React from "react";

export default function ProductsToolbar({ productsCount, sortBy, setSortBy }) {
  return (
    <div className="products-toolbar bg-white rounded-4 p-3 shadow-sm mb-4 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
        <div className="layout-buttons d-flex gap-2 text-muted fs-5 cursor-pointer">
          <i className="fa-solid fa-border-all text-dark"></i>
          <i className="fa-solid fa-list"></i>
        </div>
        <span className="text-dark fs-7 fw-medium">
          {productsCount} sản phẩm
        </span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <label className="text-muted fs-7 text-nowrap mb-0">Lọc theo:</label>
        <select
          className="form-select form-select-sm border-light-subtle fs-7 py-1 px-3 text-dark"
          style={{ width: "160px", borderRadius: "6px" }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Mặc định</option>
          <option value="bestseller">Bán chạy nhất</option>
          <option value="price-low">Giá: Thấp đến Cao</option>
          <option value="price-high">Giá: Cao đến Thấp</option>
        </select>
      </div>
    </div>
  );
}
