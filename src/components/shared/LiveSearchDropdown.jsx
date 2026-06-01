import React from "react";

export default function LiveSearchDropdown({ products, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="live-search-dropdown bg-white rounded-3 shadow border position-absolute start-0 w-100 overflow-y-auto">
      <div className="p-2">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="search-result-item d-flex align-items-center gap-3 p-2 border-bottom cursor-pointer"
            >
              <div className="search-item-img-box rounded bg-light p-1 d-flex align-items-center justify-content-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid object-fit-contain"
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="search-item-name text-dark fw-bold mb-1 fs-7">
                  {product.name}
                </h6>
                <span className="search-item-price text-success fs-8 fw-semibold">
                  {product.newPrice.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-3 text-muted fs-7">
            Không tìm thấy sản phẩm nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
