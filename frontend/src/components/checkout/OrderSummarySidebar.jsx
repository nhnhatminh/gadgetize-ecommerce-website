import { useState, useEffect } from "react";
import "../../styles/layouts/checkout.css";

export default function OrderSummarySidebar({
  cartItems,
  subtotal,
  couponCode,
  setCouponCode,
  submitting,
}) {
  return (
    <div className="checkout-right col-12 col-lg-5 px-4 py-5 px-lg-5 border-start border-light-subtle">
      <div className="checkout-summary-inner mx-auto">
        <div
          className="checkout-items-scroll mb-4 overflow-auto"
          style={{ maxHeight: "350px", paddingRight: "5px" }}
        >
          {cartItems.map((item) => (
            <div
              className="summary-product d-flex align-items-center gap-3 mb-4"
              key={item.id}
            >
              <div
                className="summary-product-img position-relative border rounded-3 bg-white p-2 d-flex align-items-center justify-content-center"
                style={{ width: "64px", height: "64px" }}
              >
                <img
                  src={item.image_url || "/images/no-image.png"}
                  alt={item.name}
                  className="img-fluid object-fit-contain"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-secondary">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-grow-1">
                <h6
                  className="mb-0 text-dark fw-bold text-truncate"
                  style={{ maxWidth: "180px" }}
                >
                  {item.name}
                </h6>
                <p className="mb-0 text-muted small">
                  {item.color_name} | SKU: {item.sku}
                </p>
              </div>
              <div className="fw-medium text-dark fs-7">
                {(
                  parseFloat(item.final_unit_price) * item.quantity
                ).toLocaleString("vi-VN")}
                ₫
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4 border-top pt-4">
          <label className="form-label small text-muted fw-medium">
            Mã giảm giá (Coupon)
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control py-2 fs-7"
              placeholder="Nhập mã giảm giá"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="border-top border-bottom py-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2 fs-7">
            <span className="text-dark">Tạm tính</span>
            <span className="fw-medium text-dark">
              {subtotal.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2 fs-7">
            <span className="text-dark">Phí vận chuyển</span>
            <span className="fw-medium text-success">Miễn phí</span>
          </div>
          <div className="d-flex justify-content-between align-items-center fs-7">
            <span className="text-dark">Thuế VAT</span>
            <span className="fw-medium text-muted">Đã bao gồm</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="fw-bold fs-5 text-dark">Tổng cộng</span>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted fs-8">VND</span>
            <span className="fw-bold fs-4 text-dark">
              {subtotal.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 py-3 fw-bold fs-5 rounded-3 text-white border-0 shadow-sm"
          disabled={submitting}
          style={{
            backgroundColor: "#006837",
            letterSpacing: "0.5px",
          }}
        >
          {submitting ? "Xử Lý Giao Dịch..." : "Xác Nhận Đặt Hàng"}
        </button>
      </div>
    </div>
  );
}
