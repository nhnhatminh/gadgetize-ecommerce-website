import React from "react";

export default function CartTotals({
  subtotal,
  savings,
  finalTotal,
  shipping,
  setShipping,
  promoCode,
  setPromoCode,
  isAgreed,
  setIsAgreed,
  itemsLength,
  navigate,
}) {
  return (
    <div className="cart-totals-wrapper bg-white rounded-4 p-4 p-lg-5 shadow-sm">
      <div
        className="free-shipping-notice border-top border-2 pt-3 position-relative mb-4"
        style={{ borderTopColor: "var(--primary-color)" }}
      >
        <div
          className="shipping-icon position-absolute top-0 end-0 translate-middle-y text-white rounded-circle d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "var(--primary-color)",
            width: "24px",
            height: "24px",
            fontSize: "10px",
          }}
        >
          <i className="fa-solid fa-truck"></i>
        </div>
        <p className="mb-0 fw-medium">
          Chúc mừng! Bạn Đã Được{" "}
          <span className="fw-bold" style={{ color: "var(--primary-color)" }}>
            Miễn Phí Vận Chuyển!
          </span>
        </p>
      </div>

      <h4 className="fw-bold mb-4">Tổng Giỏ Hàng</h4>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
        <span className="text-dark">Tạm Tính</span>
        <span className="fw-bold text-dark fs-5">
          {subtotal.toLocaleString("vi-VN")}₫
        </span>
      </div>

      <h5 className="fw-semibold mb-3 fs-6">Ước Tính Phí Vận Chuyển:</h5>
      <form className="shipping-calculator-form mb-4 border-bottom pb-4">
        <div className="mb-3">
          <label className="form-label text-dark mb-1 fs-7">
            Tỉnh / Thành phố
          </label>
          <select
            className="form-select text-muted fs-7 py-2"
            value={shipping.province}
            onChange={(e) =>
              setShipping({ ...shipping, province: e.target.value })
            }
          >
            <option value="">Chọn Thành phố, Tỉnh</option>
            <option value="hcm">Hồ Chí Minh</option>
            <option value="hn">Hà Nội</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label text-dark mb-1 fs-7">Quận / Huyện</label>
          <select
            className="form-select text-muted fs-7 py-2"
            value={shipping.district}
            onChange={(e) =>
              setShipping({ ...shipping, district: e.target.value })
            }
          >
            <option value="">Chọn Quận, Huyện</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label text-dark mb-1 fs-7">Phường / Xã</label>
          <select
            className="form-select text-muted fs-7 py-2"
            value={shipping.ward}
            onChange={(e) => setShipping({ ...shipping, ward: e.target.value })}
          >
            <option value="">Chọn Phường, Xã</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label text-dark mb-1 fs-7">Địa chỉ</label>
          <input
            type="text"
            className="form-control fs-7 py-2"
            placeholder="Nhập địa chỉ"
            value={shipping.address}
            onChange={(e) =>
              setShipping({ ...shipping, address: e.target.value })
            }
          />
        </div>
        <button
          type="button"
          className="btn btn-primary-custom w-100 py-2 rounded-3 fw-medium text-white"
          style={{
            backgroundColor: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          Tính Phí Vận Chuyển
        </button>
      </form>

      <div className="discount-code-block mb-4 border-bottom pb-4">
        <h5 className="fw-semibold mb-1 fs-6">Mã Giảm Giá</h5>
        <p className="text-des text-muted mb-2" style={{ fontSize: "0.75rem" }}>
          Mã giảm giá sẽ được áp dụng ở trang thanh toán.
        </p>
        <input
          type="text"
          className="form-control fs-7 py-2 mb-3"
          placeholder="Nhập mã giảm giá"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />

        <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
          <span className="text-dark">Bạn tiết kiệm tổng cộng</span>
          <span className="fw-bold text-dark">
            {savings.toLocaleString("vi-VN")}₫
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-dark">Tổng Đơn Hàng</span>
          <span className="fw-bold text-dark fs-5">
            {finalTotal.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>

      <div className="checkout-block">
        <p className="text-des text-muted mb-3" style={{ fontSize: "0.75rem" }}>
          Thuế và phí vận chuyển sẽ được tính tại trang thanh toán
        </p>
        <div className="form-check mb-3 d-flex align-items-center gap-2">
          <input
            className="form-check-input rounded-1 m-0"
            type="checkbox"
            id="termsCheck"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <label
            className="form-check-label text-muted mt-1"
            htmlFor="termsCheck"
            style={{ fontSize: "0.75rem" }}
          >
            Tôi đồng ý với{" "}
            <a href="#" className="text-dark fw-medium text-decoration-none">
              Các Điều Khoản & Điều Kiện
            </a>
          </label>
        </div>
        <button
          type="button"
          className={`btn w-100 py-2 rounded-3 fw-medium transition ${isAgreed && itemsLength > 0 ? "btn-success text-white" : "btn-outline-secondary text-dark"}`}
          disabled={!isAgreed || itemsLength === 0}
          onClick={() => navigate("checkout")}
        >
          Thanh Toán
        </button>
      </div>
    </div>
  );
}
