import React from "react";

export default function LiveSearchDropdown({ products, isOpen, onItemClick }) {
  if (!isOpen) return null;

  return (
    <div className="live-search-dropdown bg-white rounded-3 shadow border position-absolute start-0 w-100 overflow-y-auto z-3">
      <div className="p-2">
        {products.length > 0 ? (
          products.map((product) => {
            // Tính giá sau giảm
            const calculatedPrice =
              (product.base_price + (product.price_modifier || 0)) *
              (1 - (product.discount_percent || 0) / 100);

            return (
              <div
                key={product.id}
                className="search-result-item d-flex align-items-center gap-3 p-2 border-bottom cursor-pointer hover-bg-light"
                onClick={() => onItemClick(product.slug)}
              >
                <div
                  className="search-item-img-box rounded bg-light p-1 d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px" }}
                >
                  <img
                    src={product.image_url || "/images/no-image.png"}
                    alt={product.name}
                    className="img-fluid object-fit-contain h-100"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/no-image.png";
                    }}
                  />
                </div>
                <div className="flex-grow-1">
                  <h6
                    className="search-item-name text-dark fw-bold mb-1 fs-7 text-truncate"
                    style={{ maxWidth: "250px" }}
                  >
                    {product.name}
                  </h6>
                  <span className="search-item-price text-success fs-8 fw-semibold">
                    {calculatedPrice.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-3 text-muted fs-7">
            Không tìm thấy sản phẩm nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
