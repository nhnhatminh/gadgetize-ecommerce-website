import "../../styles/layouts/product_detail_page.css";
import "../../styles/components/showcase.css";

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
  return (
    <div className="product-info-wrapper bg-white rounded-4 p-4 p-lg-5 h-100">
      <h2 className="fw-bold mb-2 text-dark fs-3">{mainProduct.name}</h2>

      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="stars text-warning fs-6">
          {[...Array(mainProduct.rating)].map((_, i) => (
            <i key={i} className="fa-solid fa-star"></i>
          ))}
        </div>
        <span className="text-muted fs-7">
          ({mainProduct.reviews} đánh giá)
        </span>
      </div>

      <div className="price-block mb-3">
        <h3 className="fw-bold text-dark mb-1 fs-2">
          {mainProduct.price.toLocaleString("vi-VN")}₫
        </h3>
        {mainProduct.oldPrice > 0 && (
          <p className="text-muted text-des mb-0 fs-7">
            Giảm giá:{" "}
            {(mainProduct.oldPrice - mainProduct.price).toLocaleString("vi-VN")}
            ₫ ({mainProduct.discount}%) Thấp hơn{" "}
            <span className="text-decoration-line-through">
              {mainProduct.oldPrice.toLocaleString("vi-VN")}₫
            </span>
          </p>
        )}
      </div>

      <p className="text-muted text-des mb-4 fs-7 lh-base">
        {mainProduct.description}
      </p>

      <div className="color-selection mb-4">
        <p className="fw-bold text-dark mb-2 fs-6">
          Màu sắc:{" "}
          <span className="fw-normal text-muted">
            {selectedColor === "green"
              ? "Xanh Lá"
              : selectedColor === "beige"
                ? "Beige"
                : "Đen"}
          </span>
        </p>
        <div className="d-flex gap-2">
          <label className="color-swatch-detail cursor-pointer">
            <input
              type="radio"
              name="pd-color"
              checked={selectedColor === "beige"}
              onChange={() => setSelectedColor("beige")}
            />
            <span style={{ backgroundColor: "#f5f5dc" }}></span>
          </label>
          <label className="color-swatch-detail cursor-pointer">
            <input
              type="radio"
              name="pd-color"
              checked={selectedColor === "black"}
              onChange={() => setSelectedColor("black")}
            />
            <span style={{ backgroundColor: "#111111" }}></span>
          </label>
          <label className="color-swatch-detail cursor-pointer">
            <input
              type="radio"
              name="pd-color"
              checked={selectedColor === "green"}
              onChange={() => setSelectedColor("green")}
            />
            <span style={{ backgroundColor: "#008000" }}></span>
          </label>
        </div>
      </div>

      <div className="stock-progress mb-4 border-bottom pb-4">
        <p className="text-dark fw-medium mb-2 fs-7">
          Nhanh Lên! Chỉ Còn {mainProduct.stock} Sản Phẩm Trong Kho!
        </p>
        <div className="progress rounded-pill" style={{ height: "4px" }}>
          <div
            className="progress-bar bg-danger rounded-pill"
            role="progressbar"
            style={{ width: "35%" }}
          ></div>
        </div>
      </div>

      <ul className="list-unstyled mb-4 text-des fs-7">
        <li className="mb-2 d-flex align-items-center">
          <span
            className="fw-bold text-dark me-2"
            style={{ minWidth: "100px" }}
          >
            Tình Trạng:
          </span>
          <span className="badge bg-success-subtle text-success px-2 py-1 rounded-1 fw-semibold">
            Còn Hàng
          </span>
        </li>
        <li className="mb-2">
          <span
            className="fw-bold text-dark me-2"
            style={{ minWidth: "100px", display: "inline-block" }}
          >
            Danh Mục:
          </span>
          <span className="text-muted">
            {mainProduct.category || "Tai Nghe Rảnh Tay"}, Trang Chủ
          </span>
        </li>
        <li>
          <span
            className="fw-bold text-dark me-2"
            style={{ minWidth: "100px", display: "inline-block" }}
          >
            Thẻ:
          </span>
          <span className="text-muted">{mainProduct.tags}</span>
        </li>
      </ul>

      <div className="product-actions border-top pt-4 mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div
            className="quantity-selector d-flex align-items-center border border-light-subtle rounded-3 overflow-hidden bg-light"
            style={{ height: "46px" }}
          >
            <button
              type="button"
              className="btn btn-light border-0 rounded-0 px-3 h-100 d-flex align-items-center justify-content-center"
              onClick={() => handleQuantityChange("decrease")}
            >
              <i className="fa-solid fa-minus fs-7 text-muted"></i>
            </button>
            <input
              type="text"
              className="form-control border-0 text-center fw-bold p-0 bg-transparent text-dark"
              value={quantity}
              readOnly
              style={{ width: "40px", fontSize: "0.95rem" }}
            />
            <button
              type="button"
              className="btn btn-light border-0 rounded-0 px-3 h-100 d-flex align-items-center justify-content-center"
              onClick={() => handleQuantityChange("increase")}
            >
              <i className="fa-solid fa-plus fs-7 text-muted"></i>
            </button>
          </div>

          <button
            type="button"
            className="btn btn-outline-success flex-grow-1 fw-bold rounded-3 d-flex align-items-center justify-content-center bg-white"
            onClick={onAddToCart}
            disabled={isAdding}
            style={{
              height: "46px",
              color: "var(--primary-color)",
              borderColor: "var(--primary-color)",
              fontSize: "0.9rem",
            }}
          >
            {isAdding ? "Đang Thêm..." : "Thêm Vào Giỏ Hàng"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center rounded-3 border-light-subtle bg-white"
            style={{ width: "46px", height: "46px" }}
          >
            <i className="fa-regular fa-heart text-dark fs-6"></i>
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center rounded-3 border-light-subtle bg-white"
            style={{ width: "46px", height: "46px" }}
          >
            <i className="fa-solid fa-arrow-right-arrow-left text-dark fs-6"></i>
          </button>
        </div>

        <button
          type="button"
          className="btn btn-success w-100 py-3 fw-bold rounded-3 text-white border-0 fs-6 shadow-sm"
          onClick={() => {
            onAddToCart();
            navigate("cart");
          }}
          style={{
            backgroundColor: "#006837",
            letterSpacing: "0.5px",
          }}
        >
          Mua Ngay
        </button>
      </div>

      <div className="shipping-info text-des border-bottom pb-4 mb-4 fs-7">
        <div className="d-flex align-items-start gap-2 mb-2">
          <i className="fa-solid fa-truck text-muted mt-1"></i>
          <p className="mb-0 text-muted">
            Dự Kiến Giao Hàng:{" "}
            <span className="fw-bold text-dark">01 Tháng 8 – 05 Tháng 8</span>
          </p>
        </div>
        <div className="d-flex align-items-start gap-2">
          <i className="fa-solid fa-rotate-left text-muted mt-1"></i>
          <p className="mb-0 text-muted lh-sm">
            Hoàn trả trong vòng 90 ngày kể từ ngày mua. Thuế không được hoàn
            lại.
          </p>
        </div>
      </div>

      <div className="share-section d-flex align-items-center gap-3 fs-7">
        <span className="fw-bold text-dark d-flex align-items-center gap-1">
          <i className="fa-solid fa-share-nodes text-muted"></i> Chia sẻ:
        </span>
        <div className="d-flex gap-2">
          <a
            href="#"
            className="share-icon bg-light border rounded-3 d-flex align-items-center justify-content-center text-dark text-decoration-none"
            style={{ width: "34px", height: "34px" }}
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="share-icon bg-light border rounded-3 d-flex align-items-center justify-content-center text-dark text-decoration-none"
            style={{ width: "34px", height: "34px" }}
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="#"
            className="share-icon bg-light border rounded-3 d-flex align-items-center justify-content-center text-dark text-decoration-none"
            style={{ width: "34px", height: "34px" }}
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="#"
            className="share-icon bg-light border rounded-3 d-flex align-items-center justify-content-center text-dark text-decoration-none"
            style={{ width: "34px", height: "34px" }}
          >
            <i className="fa-brands fa-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
