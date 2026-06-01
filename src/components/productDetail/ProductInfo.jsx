import React from "react";
import "../../styles/layouts/product_detail_page.css";
import "../../styles/components/showcase.css";

export default function ProductInfo({
  mainProduct,
  quantity,
  handleQuantityChange,
  selectedColor,
  setSelectedColor,
  navigate,
}) {
  return (
    <div className="product-info-wrapper bg-white rounded-4 p-4 p-lg-5 h-100">
      <h2 className="fw-bold mb-2">{mainProduct.name}</h2>

      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="stars text-danger fs-6">
          {[...Array(mainProduct.rating)].map((_, i) => (
            <i key={i} className="fa-solid fa-star"></i>
          ))}
        </div>
        <span className="text-dark fs-7">({mainProduct.reviews} đánh giá)</span>
      </div>

      <div className="price-block mb-3">
        <h3 className="fw-bold mb-1">
          {mainProduct.price.toLocaleString("vi-VN")}₫
        </h3>
        <p className="text-muted text-des mb-0">
          Giảm giá: 7.500₫ ({mainProduct.discount}%){" "}
          <span className="text-decoration-line-through">
            {mainProduct.oldPrice.toLocaleString("vi-VN")}₫
          </span>
        </p>
      </div>

      <p className="text-muted text-des mb-4">{mainProduct.description}</p>

      <div className="color-selection mb-4">
        <p className="fw-bold mb-2">
          Màu sắc:{" "}
          <span className="fw-normal">
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
        <p className="text-des fw-medium mb-2">
          Nhanh Lên! Chỉ Còn {mainProduct.stock} Sản Phẩm Trong Kho!
        </p>
        <div className="progress" style={{ height: "4px" }}>
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: "25%" }}
          ></div>
        </div>
      </div>

      <ul className="list-unstyled mb-4 text-des">
        <li className="mb-2">
          <span className="fw-bold me-2">Tình Trạng:</span>
          <span className="badge bg-success px-2 py-1">Còn Hàng</span>
        </li>
        <li className="mb-2">
          <span className="fw-bold me-2">Danh Mục:</span> {mainProduct.category}
        </li>
        <li className="mb-2">
          <span className="fw-bold me-2">Thẻ:</span> {mainProduct.tags}
        </li>
      </ul>

      <div className="product-actions border-top pt-4 mb-4">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <div className="quantity-selector d-flex align-items-center border border-light-subtle rounded-3 overflow-hidden">
            <button
              className="btn btn-light border-0 rounded-0 px-3 py-2"
              onClick={() => handleQuantityChange("decrease")}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <input
              type="text"
              className="form-control border-0 text-center fw-bold p-0 bg-transparent"
              value={quantity}
              readOnly
              style={{ width: "40px" }}
            />
            <button
              className="btn btn-light border-0 rounded-0 px-3 py-2"
              onClick={() => handleQuantityChange("increase")}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <button className="btn btn-outline-success flex-grow-1 fw-bold rounded-3">
            Thêm Vào Giỏ Hàng
          </button>
          <button className="btn btn-outline-secondary px-3 rounded-3">
            <i className="fa-regular fa-heart"></i>
          </button>
          <button className="btn btn-outline-secondary px-3 rounded-3">
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </button>
        </div>
        <button
          className="btn btn-success w-100 py-3 fw-bold rounded-3"
          onClick={() => navigate("cart")}
          style={{
            backgroundColor: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          Mua Ngay
        </button>
      </div>

      <div className="shipping-info text-des mb-4">
        <div className="d-flex align-items-start gap-2 mb-2">
          <i className="fa-solid fa-truck text-muted mt-1"></i>
          <p className="mb-0 text-muted">
            Dự Kiến Giao Hàng:{" "}
            <span className="fw-bold text-dark">01 Tháng 8 – 05 Tháng 8</span>
          </p>
        </div>
        <div className="d-flex align-items-start gap-2">
          <i className="fa-solid fa-rotate-left text-muted mt-1"></i>
          <p className="mb-0 text-muted">
            Hoàn trả trong vòng 90 ngày kể từ ngày mua. Thuế không được hoàn
            lại.
          </p>
        </div>
      </div>

      <div className="social-share d-flex align-items-center gap-2 border-top pt-3">
        <span className="fw-bold text-dark fs-7">Chia sẻ:</span>
        <a href="#" className="share-icon">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#" className="share-icon">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="#" className="share-icon">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="#" className="share-icon">
          <i className="fa-brands fa-tiktok"></i>
        </a>
      </div>
    </div>
  );
}
