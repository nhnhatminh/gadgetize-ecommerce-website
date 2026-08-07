export default function CheckoutForm({ formData, setFormData, errors }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h4 className="fw-bold text-dark mb-3">Thông Tin Giao Hàng</h4>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label text-muted fw-medium fs-7">Họ và tên người nhận *</label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            name="fullName"
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label text-muted fw-medium fs-7">Số điện thoại *</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            name="phone"
            placeholder="0901234567"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="col-12">
          <label className="form-label text-muted fw-medium fs-7">Địa chỉ giao hàng chi tiết *</label>
          <input
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            name="address"
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="col-12">
          <label className="form-label text-muted fw-medium fs-7">Ghi chú đơn hàng (Tùy chọn)</label>
          <textarea
            className="form-control"
            name="notes"
            rows="2"
            placeholder="Ghi chú thêm về thời gian giao hàng hoặc chỉ dẫn..."
            value={formData.notes}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <hr className="my-4" />

      <h4 className="fw-bold text-dark mb-3">Phương Thức Thanh Toán</h4>
      <div className="d-flex flex-column gap-3">
        <div className="form-check p-3 border rounded-3 bg-light">
          <input
            className="form-check-input ms-1 me-3"
            type="radio"
            name="paymentMethod"
            id="codMethod"
            value="cod"
            checked={formData.paymentMethod === "cod"}
            onChange={handleInputChange}
          />
          <label className="form-check-label fw-bold text-dark" htmlFor="codMethod">
            Thanh toán khi nhận hàng (COD)
            <span className="d-block text-muted fw-normal fs-8 mt-1">
              Thanh toán trực tiếp bằng tiền mặt cho nhân viên giao hàng khi nhận sản phẩm.
            </span>
          </label>
        </div>

        <div className="form-check p-3 border rounded-3 bg-light">
          <input
            className="form-check-input ms-1 me-3"
            type="radio"
            name="paymentMethod"
            id="bankMethod"
            value="bank_transfer"
            checked={formData.paymentMethod === "bank_transfer"}
            onChange={handleInputChange}
          />
          <label className="form-check-label fw-bold text-dark" htmlFor="bankMethod">
            Chuyển khoản Ngân hàng / Ví điện tử
            <span className="d-block text-muted fw-normal fs-8 mt-1">
              Chuyển khoản qua QR Code ngân hàng. Đơn hàng sẽ được xử lý ngay sau khi nhận thanh toán.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}