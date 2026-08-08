import { useState } from "react";
import { orderApi } from "../../api/orderApi";
import "../../styles/layouts/checkout.css";

export default function CheckoutSummary({
  cartItems,
  subtotal,
  couponInfo,
  setCouponInfo,
  submitting,
  onSubmitOrder,
}) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [checkingCoupon, setCheckingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCheckingCoupon(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const res = await orderApi.checkCoupon(couponInput.trim(), subtotal);
      setCouponInfo({
        code: res.coupon.code,
        discountAmount: res.coupon.discountAmount,
      });
      setCouponSuccess(`Áp dụng mã ${res.coupon.code} thành công!`);
    } catch (error) {
      setCouponInfo(null);
      setCouponError(
        error.response?.data?.message || "Mã giảm giá không hợp lệ."
      );
    } finally {
      setCheckingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponInfo(null);
    setCouponInput("");
    setCouponSuccess("");
    setCouponError("");
  };

  const discountAmount = couponInfo?.discountAmount || 0;
  const shippingFee = 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <div className="checkout-summary-card">
      <h4 className="checkout-summary-title">Tóm Tắt Đơn Hàng</h4>

      <div className="checkout-summary-items-list">
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-summary-item">
            <div className="summary-item-img-box">
              <img
                src={item.image_url || "/images/no-image.png"}
                alt={item.name}
                className="summary-item-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/no-image.png";
                }}
              />
              <span className="summary-item-quantity-badge">
                {item.quantity}
              </span>
            </div>

            <div className="summary-item-info">
              <h6 className="summary-item-name">{item.name}</h6>
              <p className="summary-item-meta">
                {item.color_name || "Mặc định"} | SKU: {item.sku}
              </p>
            </div>

            <div className="summary-item-price">
              {(
                parseFloat(item.final_unit_price || 0) * item.quantity
              ).toLocaleString("vi-VN")}
              ₫
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-coupon-section">
        <label className="checkout-coupon-label">
          Mã giảm giá (Coupon)
        </label>
        <div className="checkout-coupon-input-group">
          <input
            type="text"
            className="checkout-coupon-input"
            placeholder="Nhập mã coupon"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            disabled={submitting || couponInfo !== null}
          />
          {couponInfo ? (
            <button
              type="button"
              className="checkout-coupon-btn checkout-coupon-btn--remove"
              onClick={handleRemoveCoupon}
            >
              Hủy
            </button>
          ) : (
            <button
              type="button"
              className="checkout-coupon-btn checkout-coupon-btn--apply"
              onClick={handleApplyCoupon}
              disabled={checkingCoupon || !couponInput.trim()}
            >
              {checkingCoupon ? "..." : "Áp dụng"}
            </button>
          )}
        </div>

        {couponError && (
          <div className="coupon-status-msg coupon-status-msg--error">{couponError}</div>
        )}
        {couponSuccess && (
          <div className="coupon-status-msg coupon-status-msg--success">{couponSuccess}</div>
        )}
      </div>

      <div className="checkout-totals-breakdown">
        <div className="checkout-totals-line">
          <span className="totals-line-label">Tạm tính:</span>
          <span className="totals-line-value">
            {subtotal.toLocaleString("vi-VN")}₫
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="checkout-totals-line checkout-totals-line--discount">
            <span>Giảm giá (Coupon):</span>
            <span>
              -{discountAmount.toLocaleString("vi-VN")}₫
            </span>
          </div>
        )}

        <div className="checkout-totals-line">
          <span className="totals-line-label">Phí giao hàng:</span>
          <span className="totals-line-value totals-line-value--free">Miễn phí</span>
        </div>

        <div className="checkout-divider" />

        <div className="checkout-totals-final-row">
          <span className="final-total-label">Tổng Thanh Toán:</span>
          <span className="final-total-price">
            {finalTotal.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>

      <button
        type="button"
        className="checkout-submit-btn"
        disabled={submitting || cartItems.length === 0}
        onClick={onSubmitOrder}
      >
        {submitting ? "Đang Xử Lý Đơn Hàng..." : "Xác Nhận Đặt Hàng"}
      </button>
    </div>
  );
}