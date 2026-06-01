import React from "react";
import "../../styles/layouts/products_page.css";

export default function ProductsToolbar({ productsCount, sortBy, setSortBy }) {
  return (
    <div className="products-toolbar d-flex flex-wrap justify-content-between align-items-center bg-white p-3 rounded-4 mb-4 shadow-sm gap-3">
      <p className="mb-0 text-muted fs-7">
        Hiển thị <span className="text-dark fw-semibold">{productsCount}</span>{" "}
        sản phẩm phù hợp
      </p>
      <div className="d-flex align-items-center gap-2">
        <span className="text-dark fs-7 fw-medium text-nowrap">Sắp xếp:</span>
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
  );
}
