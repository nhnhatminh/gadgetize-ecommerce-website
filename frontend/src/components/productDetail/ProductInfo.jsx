import { useAuth } from "../../context/useAuth";
import "../../styles/layouts/product_detail_page.css";

export default function ProductInfo({
  mainProduct,
  quantity,
  handleQuantityChange,
  selectedColor,
  setSelectedColor,
  navigate,
  onAddToCart,
  isAdding,
}) {
  const { user } = useAuth();

  return (
    <div className="product-info-card">
      <h2 className="product-info-title">{mainProduct.name}</h2>

      <div className="product-info-rating-row">
        <div className="product-info-stars">
          {[...Array(mainProduct.rating)].map((_, i) => (
            <i key={i} className="fa-solid fa-star"></i>
          ))}
        </div>
        <span className="product-info-review-count">
          ({mainProduct.reviews} đánh giá)
        </span>
      </div>

      <div className="product-info-price-block">
        <h3 className="product-info-current-price">
          {mainProduct.price.toLocaleString("vi-VN")}₫
        </h3>
        {mainProduct.oldPrice > 0 && (
          <p className="product-info-discount-text">
            Giảm giá:{" "}
            {(mainProduct.oldPrice - mainProduct.price).toLocaleString("vi-VN")}
            ₫ ({mainProduct.discount}%) Thấp hơn{" "}
            <span className="product-info-old-price">
              {mainProduct.oldPrice.toLocaleString("vi-VN")}₫
            </span>
          </p>
        )}
      </div>

      <p className="product-info-description">
        {mainProduct.description}
      </p>

      <div className="product-info-color-selection">
        <p className="product-info-color-label">
          Màu sắc:{" "}
          <span className="product-info-color-name">
            {selectedColor === "green"
              ? "Xanh Lá"
              : selectedColor === "beige"
                ? "Beige"
                : "Đen"}
          </span>
        </p>
        <div className="product-info-color-swatches">
          <label className="color-swatch-item">
            <input
              type="radio"
              name="pd-color"
              checked={selectedColor === "beige"}
              onChange={() => setSelectedColor("beige")}
            />
            <span className="color-swatch-beige"></span>
          </label>
          <label className="color-swatch-item">
            <input
              type="radio"
              name="pd-color"
              checked={selectedColor === "black"}
              onChange={() => setSelectedColor("black")}
            />
            <span className="color-swatch-black"></span>
          </label>
          <label className="color-swatch-item">
            <input
              type="radio"
              name="pd-color"
              checked={selectedColor === "green"}
              onChange={() => setSelectedColor("green")}
            />
            <span className="color-swatch-green"></span>
          </label>
        </div>
      </div>

      <div className="product-info-stock-progress">
        <p className="product-info-stock-text">
          Nhanh Lên! Chỉ Còn {mainProduct.stock} Sản Phẩm Trong Kho!
        </p>
        <div className="product-info-progress-bar">
          <div className="product-info-progress-fill"></div>
        </div>
      </div>

      <ul className="product-info-meta-list">
        <li className="product-info-meta-item">
          <span className="product-info-meta-label">
            Tình Trạng:
          </span>
          <span className="product-info-stock-badge">
            Còn Hàng
          </span>
        </li>
        <li className="product-info-meta-item">
          <span className="product-info-meta-label">
            Danh Mục:
          </span>
          <span className="product-info-meta-value">
            {mainProduct.category || "Tai Nghe Rảnh Tay"}, Trang Chủ
          </span>
        </li>
        <li className="product-info-meta-item">
          <span className="product-info-meta-label">
            Thẻ:
          </span>
          <span className="product-info-meta-value">{mainProduct.tags}</span>
        </li>
      </ul>

      {user?.role === "admin" ? (
        <div className="product-info-actions">
          <button
            type="button"
            className="btn-buy-now-solid"
            onClick={() => navigate("/admin/products")}
          >
            <i className="fa-regular fa-pen-to-square"></i> Quản Lý Sản Phẩm Trong Admin
          </button>
        </div>
      ) : (
        <div className="product-info-actions">
          <div className="product-info-action-row">
            <div className="product-quantity-selector">
              <button
                type="button"
                className="quantity-btn"
                onClick={() => handleQuantityChange("decrease")}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                type="text"
                className="quantity-input"
                value={quantity}
                readOnly
              />
              <button
                type="button"
                className="quantity-btn"
                onClick={() => handleQuantityChange("increase")}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            <button
              type="button"
              className="btn-add-to-cart-outline"
              onClick={onAddToCart}
              disabled={isAdding}
            >
              {isAdding ? "Đang Thêm..." : "Thêm Vào Giỏ Hàng"}
            </button>

            <button
              type="button"
              className="btn-icon-action"
            >
              <i className="fa-regular fa-heart"></i>
            </button>

            <button
              type="button"
              className="btn-icon-action"
            >
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
            </button>
          </div>

          <button
            type="button"
            className="btn-buy-now-solid"
            onClick={() => {
              onAddToCart();
              navigate("cart");
            }}
          >
            Mua Ngay
          </button>
        </div>
      )}

      <div className="product-shipping-info">
        <div className="shipping-info-item">
          <i className="fa-solid fa-truck"></i>
          <p className="shipping-info-text">
            Dự Kiến Giao Hàng:{" "}
            <strong>01 Tháng 8 – 05 Tháng 8</strong>
          </p>
        </div>
        <div className="shipping-info-item">
          <i className="fa-solid fa-rotate-left"></i>
          <p className="shipping-info-text">
            Hoàn trả trong vòng 90 ngày kể từ ngày mua. Thuế không được hoàn
            lại.
          </p>
        </div>
      </div>

      <div className="product-share-section">
        <span className="share-title">
          <i className="fa-solid fa-share-nodes"></i> Chia sẻ:
        </span>
        <div className="share-icons-group">
          <a href="#" className="share-icon-link">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="share-icon-link">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="share-icon-link">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="share-icon-link">
            <i className="fa-brands fa-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
  );
}