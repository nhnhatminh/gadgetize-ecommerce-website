import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/layouts/cart.css";

export default function CartTotals({ subtotal, itemsCount }) {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(true);

  return (
    <div className="cart-totals-card">
      <div className="free-shipping-notice-banner">
        <p className="free-shipping-notice-text">
          <i className="fa-solid fa-truck-fast"></i>
          Đơn hàng của bạn đủ điều kiện <span className="highlight-text">Miễn Phí Vận Chuyển!</span>
        </p>
      </div>

      <h4 className="cart-totals-title">Tóm Tắt Đơn Hàng</h4>

      <div className="cart-summary-line">
        <span className="cart-summary-label">Tổng số lượng:</span>
        <span className="cart-summary-value">{itemsCount} sản phẩm</span>
      </div>

      <div className="cart-summary-line">
        <span className="cart-summary-label">Tạm tính:</span>
        <span className="cart-summary-value">{subtotal.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="cart-summary-line">
        <span className="cart-summary-label">Phí giao hàng:</span>
        <span className="cart-summary-value cart-summary-value--free">Miễn phí</span>
      </div>

      <div className="cart-summary-total-line">
        <span className="cart-total-label">Tổng Thanh Toán:</span>
        <span className="cart-total-value">{subtotal.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="cart-checkout-block">
        <div className="terms-checkbox-wrapper">
          <input
            className="terms-checkbox-input"
            type="checkbox"
            id="termsCheck"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <label className="terms-checkbox-label" htmlFor="termsCheck">
            Tôi đồng ý với Điều Khoản & Điều Kiện Mua Hàng
          </label>
        </div>

        <button
          type="button"
          className="cart-checkout-btn"
          disabled={!isAgreed || itemsCount === 0}
          onClick={() => navigate("/checkout")}
        >
          Tiến Hành Thanh Toán
        </button>
      </div>
    </div>
  );
}