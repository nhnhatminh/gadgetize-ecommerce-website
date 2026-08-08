import "../../styles/layouts/checkout.css";

export default function CheckoutForm({ formData, setFormData, errors }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="checkout-form-wrapper">
      <h4 className="checkout-form-heading">Thông Tin Giao Hàng</h4>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="checkout-field-label">Họ và tên người nhận *</label>
          <input
            type="text"
            className={`checkout-field-input ${errors.fullName ? "checkout-field-input--error" : ""}`}
            name="fullName"
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          {errors.fullName && <div className="checkout-error-text">{errors.fullName}</div>}
        </div>

        <div className="col-md-6">
          <label className="checkout-field-label">Số điện thoại *</label>
          <input
            type="text"
            className={`checkout-field-input ${errors.phone ? "checkout-field-input--error" : ""}`}
            name="phone"
            placeholder="0901234567"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <div className="checkout-error-text">{errors.phone}</div>}
        </div>

        <div className="col-12">
          <label className="checkout-field-label">Địa chỉ giao hàng chi tiết *</label>
          <input
            type="text"
            className={`checkout-field-input ${errors.address ? "checkout-field-input--error" : ""}`}
            name="address"
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <div className="checkout-error-text">{errors.address}</div>}
        </div>

        <div className="col-12">
          <label className="checkout-field-label">Ghi chú đơn hàng (Tùy chọn)</label>
          <textarea
            className="checkout-field-textarea"
            name="notes"
            rows="2"
            placeholder="Ghi chú thêm về thời gian giao hàng hoặc chỉ dẫn..."
            value={formData.notes}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="checkout-divider" />

      <h4 className="checkout-form-heading">Phương Thức Thanh Toán</h4>
      <div className="checkout-payment-options">
        <div className="checkout-payment-card">
          <input
            className="checkout-payment-radio"
            type="radio"
            name="paymentMethod"
            id="codMethod"
            value="cod"
            checked={formData.paymentMethod === "cod"}
            onChange={handleInputChange}
          />
          <label className="checkout-payment-label" htmlFor="codMethod">
            Thanh toán khi nhận hàng (COD)
            <span className="checkout-payment-desc">
              Thanh toán trực tiếp bằng tiền mặt cho nhân viên giao hàng khi nhận sản phẩm.
            </span>
          </label>
        </div>

        <div className="checkout-payment-card">
          <input
            className="checkout-payment-radio"
            type="radio"
            name="paymentMethod"
            id="bankMethod"
            value="bank_transfer"
            checked={formData.paymentMethod === "bank_transfer"}
            onChange={handleInputChange}
          />
          <label className="checkout-payment-label" htmlFor="bankMethod">
            Chuyển khoản Ngân hàng / Ví điện tử
            <span className="checkout-payment-desc">
              Chuyển khoản qua QR Code ngân hàng. Đơn hàng sẽ được xử lý ngay sau khi nhận thanh toán.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}