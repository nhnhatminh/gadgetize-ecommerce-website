import React, { useState } from "react";
import "../../styles/layouts/checkout.css";

export default function Checkout({ navigate }) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [subscribeNews, setSubscribeNews] = useState(false);
  const [country, setCountry] = useState("Việt Nam");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  return (
    <div className="checkout-page-container d-flex flex-column flex-lg-row min-vh-100">
      <div className="checkout-left col-12 col-lg-7 bg-white px-4 py-5 px-lg-5">
        <div className="checkout-content-inner mx-auto">
          <div
            className="cursor-pointer d-inline-block mb-4"
            onClick={() => navigate("home")}
          >
            <h2 className="fw-bold fs-3 text-dark mb-0">Gadgetize</h2>
          </div>

          <div className="mb-5">
            <h4 className="fw-bold mb-3 fs-5 text-dark">Liên hệ</h4>
            <input
              type="text"
              className="form-control py-3 mb-3"
              placeholder="Email hoặc số điện thoại di động"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="newsCheck"
                checked={subscribeNews}
                onChange={(e) => setSubscribeNews(e.target.checked)}
              />
              <label
                className="form-check-label mt-1 text-dark fs-7"
                htmlFor="newsCheck"
              >
                Gửi email cho tôi về tin tức và ưu đãi
              </label>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="fw-bold mb-3 fs-5 text-dark">Giao hàng</h4>
            <select
              className="form-select py-3 mb-3 text-dark fs-7"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="Việt Nam">Việt Nam</option>
            </select>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Tên (không bắt buộc)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Họ"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <input
              type="text"
              className="form-control py-3 mb-3"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              className="form-control py-3 mb-3"
              placeholder="Căn hộ, số phòng, v.v. (không bắt buộc)"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Thành phố"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Mã bưu điện (không bắt buộc)"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <div className="form-check d-flex align-items-center gap-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="saveInfoCheck"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
              />
              <label
                className="form-check-label mt-1 text-dark fs-7"
                htmlFor="saveInfoCheck"
              >
                Lưu thông tin này cho lần sau
              </label>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="fw-bold mb-3 fs-5 text-dark">
              Phương thức vận chuyển
            </h4>
            <div className="border rounded-3 p-3 d-flex justify-content-between align-items-center bg-light-gray-custom">
              <span className="text-dark fs-7">Tiêu chuẩn</span>
              <span className="fw-bold text-dark fs-7">MIỄN PHÍ</span>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="fw-bold mb-1 fs-5 text-dark">Thanh toán</h4>
            <p
              className="text-muted text-des mb-3"
              style={{ fontSize: "0.75rem" }}
            >
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

          <button
            type="button"
            className="btn btn-checkout-submit w-100 py-3 fw-medium text-white fs-6 rounded-3"
          >
            Thanh toán
          </button>
        </div>
      </div>

      <div className="checkout-right col-12 col-lg-5 px-4 py-5 px-lg-5 border-start border-light-subtle">
        <div className="checkout-summary-inner mx-auto">
          <div className="summary-product d-flex align-items-center gap-3 mb-4">
            <div className="summary-product-img position-relative border rounded-3 bg-white p-2 d-flex align-items-center justify-content-center">
              <img
                src="/images/cate-3.png"
                alt="Silent Touch Pro"
                className="img-fluid object-fit-contain"
              />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-secondary">
                1
              </span>
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-0 text-dark fw-bold">Silent Touch Pro</h6>
            </div>
            <div className="fw-medium text-dark fs-7">9.800.000₫</div>
          </div>

          <div className="border-top border-bottom py-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2 fs-7">
              <span className="text-dark">Tạm tính</span>
              <span className="fw-medium text-dark">9.800.000₫</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2 fs-7">
              <span className="text-dark">Phí vận chuyển</span>
              <span className="fw-medium text-dark">Miễn phí</span>
            </div>
            <div className="d-flex justify-content-between align-items-center fs-7">
              <span className="text-dark">Thuế tạm tính</span>
              <span className="fw-medium text-dark">Thuế tạm tính</span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold fs-5 text-dark">Tổng cộng</span>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted fs-8">VND</span>
              <span className="fw-bold fs-4 text-dark">11.368.000₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
