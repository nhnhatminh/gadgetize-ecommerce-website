import React from "react";
import "../../styles/layouts/checkout.css";

export default function PaymentMethods({
  paymentMethod,
  setPaymentMethod,
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  cardName,
  setCardName,
}) {
  return (
    <div className="mb-5">
      <h4 className="fw-bold mb-1 fs-5 text-dark">Thanh toán</h4>
      <p className="text-muted text-des mb-3" style={{ fontSize: "0.75rem" }}>
        Mọi giao dịch đều được bảo mật và mã hóa.
      </p>

      <div className="payment-methods-box border rounded-3 overflow-hidden">
        <div className="payment-option p-3 border-bottom bg-light-gray-custom d-flex align-items-center gap-2">
          <input
            className="form-check-input m-0"
            type="radio"
            name="paymentMethod"
            id="creditCard"
            checked={paymentMethod === "credit-card"}
            onChange={() => setPaymentMethod("credit-card")}
          />
          <label
            className="form-check-label fw-medium text-dark flex-grow-1 fs-7 cursor-pointer"
            htmlFor="creditCard"
          >
            Thẻ tín dụng
          </label>
          <div className="payment-icons d-flex gap-1">
            <i className="fa-brands fa-cc-visa fs-5 text-secondary"></i>
            <i className="fa-brands fa-cc-mastercard fs-5 text-secondary"></i>
          </div>
        </div>

        {paymentMethod === "credit-card" && (
          <div className="payment-details p-3 bg-white transition">
            <input
              type="text"
              className="form-control py-3 mb-3"
              placeholder="Số thẻ"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Ngày hết hạn (MM/YY)"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Mã bảo mật (CVV)"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            <input
              type="text"
              className="form-control py-3"
              placeholder="Tên trên thẻ"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
        )}

        <div className="payment-option p-3 d-flex align-items-center gap-2 border-top">
          <input
            className="form-check-input m-0"
            type="radio"
            name="paymentMethod"
            id="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <label
            className="form-check-label text-dark fs-7 cursor-pointer"
            htmlFor="cod"
          >
            Thanh toán khi nhận hàng (COD)
          </label>
        </div>
      </div>
    </div>
  );
}
