import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/layouts/cart.css";

export default function CartTotals({ subtotal, itemsCount }) {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(true);

  return (
    <div className="cart-totals-wrapper bg-white rounded-4 p-4 p-lg-5 shadow-sm border">
      <div
        className="free-shipping-notice border-top border-3 pt-3 position-relative mb-4"
        style={{ borderTopColor: "var(--primary-color)" }}
      >
        <p className="mb-0 fw-medium fs-7">
          <i className="fa-solid fa-truck-fast me-2 text-success"></i>
          Đơn hàng của bạn đủ điều kiện <span className="fw-bold text-success">Miễn Phí Vận Chuyển!</span>
        </p>
      </div>

      <h4 className="fw-bold mb-4 text-dark">Tóm Tắt Đơn Hàng</h4>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3 fs-7">
        <span className="text-muted">Tổng số lượng:</span>
        <span className="fw-bold text-dark">{itemsCount} sản phẩm</span>
      </div>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3 fs-7">
        <span className="text-muted">Tạm tính:</span>
        <span className="fw-bold text-dark">{subtotal.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4 fs-7">
        <span className="text-muted">Phí giao hàng:</span>
        <span className="fw-bold text-success">Miễn phí</span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold text-dark fs-6">Tổng Thanh Toán:</span>
        <span className="fw-bold text-success fs-4">{subtotal.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="checkout-block">
        <div className="form-check mb-3 d-flex align-items-center gap-2">
          <input
            className="form-check-input rounded-1 m-0"
            type="checkbox"
            id="termsCheck"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <label className="form-check-label text-muted fs-8 mt-1" htmlFor="termsCheck">
            Tôi đồng ý với Điều Khoản & Điều Kiện Mua Hàng
          </label>
        </div>

        <button
          type="button"
          className="btn btn-success w-100 py-3 fw-bold rounded-3 text-white border-0 fs-6 shadow-sm"
          disabled={!isAgreed || itemsCount === 0}
          onClick={() => navigate("/checkout")}
          style={{ backgroundColor: "#006837" }}
        >
          Tiến Hành Thanh Toán
        </button>
      </div>
    </div>
  );
}