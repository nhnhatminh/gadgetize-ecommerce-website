import { useState } from "react";
import { orderApi } from "../../api/orderApi";

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

  // Áp dụng mã giảm giá
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

  // Hủy áp dụng mã giảm giá
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
    <div className="checkout-summary-wrapper bg-white rounded-4 p-4 shadow-sm border">
      <h4 className="fw-bold text-dark mb-4">Tóm Tắt Đơn Hàng</h4>

      <div
        className="checkout-items-list mb-4 overflow-auto pe-1"
        style={{ maxHeight: "300px" }}
      >
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom"
          >
            <div
              className="position-relative border rounded-3 bg-light p-1 d-flex align-items-center justify-content-center"
              style={{ width: "55px", height: "55px", minWidth: "55px" }}
            >
              <img
                src={item.image_url || "/images/no-image.png"}
                alt={item.name}
                className="img-fluid object-fit-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/no-image.png";
                }}
              />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-secondary">
                {item.quantity}
              </span>
            </div>

            <div className="flex-grow-1 overflow-hidden">
              <h6 className="mb-0 text-dark fw-bold text-truncate fs-7">
                {item.name}
              </h6>
              <p className="mb-0 text-muted fs-8">
                {item.color_name || "Mặc định"} | SKU: {item.sku}
              </p>
            </div>

            <div className="fw-bold text-dark fs-7">
              {(
                parseFloat(item.final_unit_price || 0) * item.quantity
              ).toLocaleString("vi-VN")}
              ₫
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="form-label text-muted fw-medium fs-7">
          Mã giảm giá (Coupon)
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control fs-7"
            placeholder="Nhập mã coupon"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            disabled={submitting || couponInfo !== null}
          />
          {couponInfo ? (
            <button
              type="button"
              className="btn btn-outline-danger fs-7 fw-medium"
              onClick={handleRemoveCoupon}
            >
              Hủy
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success fs-7 fw-bold"
              onClick={handleApplyCoupon}
              disabled={checkingCoupon || !couponInput.trim()}
            >
              {checkingCoupon ? "..." : "Áp dụng"}
            </button>
          )}
        </div>

        {couponError && (
          <div className="text-danger fs-8 mt-1">{couponError}</div>
        )}
        {couponSuccess && (
          <div className="text-success fs-8 mt-1">{couponSuccess}</div>
        )}
      </div>

      <div className="border-top pt-3 mb-4">
        <div className="d-flex justify-content-between mb-2 fs-7">
          <span className="text-muted">Tạm tính:</span>
          <span className="fw-medium text-dark">
            {subtotal.toLocaleString("vi-VN")}₫
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="d-flex justify-content-between mb-2 fs-7 text-success">
            <span>Giảm giá (Coupon):</span>
            <span className="fw-bold">
              -{discountAmount.toLocaleString("vi-VN")}₫
            </span>
          </div>
        )}

        <div className="d-flex justify-content-between mb-2 fs-7">
          <span className="text-muted">Phí giao hàng:</span>
          <span className="fw-bold text-success">Miễn phí</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-6 text-dark">Tổng Thanh Toán:</span>
          <span className="fw-bold fs-4 text-success">
            {finalTotal.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-success w-100 py-3 fw-bold rounded-3 text-white border-0 shadow-sm fs-6"
        disabled={submitting || cartItems.length === 0}
        onClick={onSubmitOrder}
        style={{ backgroundColor: "#006837" }}
      >
        {submitting ? "Đang Xử Lý Đơn Hàng..." : "Xác Nhận Đặt Hàng"}
      </button>
    </div>
  );
}