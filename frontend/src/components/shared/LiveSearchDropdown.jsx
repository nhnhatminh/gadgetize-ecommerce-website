export default function LiveSearchDropdown({ products, isOpen, onItemClick }) {
  if (!isOpen) return null;

  return (
    <div className="live-search-dropdown">
      <div className="live-search-dropdown-content">
        {products.length > 0 ? (
          products.map((product) => {
            const calculatedPrice =
              (product.base_price + (product.price_modifier || 0)) *
              (1 - (product.discount_percent || 0) / 100);

            return (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => onItemClick(product.slug)}
              >
                <div className="search-item-img-box">
                  <img
                    src={product.image_url || "/images/no-image.png"}
                    alt={product.name}
                    className="search-item-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/no-image.png";
                    }}
                  />
                </div>
                <div className="search-item-info">
                  <h6 className="search-item-name">
                    {product.name}
                  </h6>
                  <span className="search-item-price">
                    {calculatedPrice.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="search-no-results">
            Không tìm thấy sản phẩm nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}