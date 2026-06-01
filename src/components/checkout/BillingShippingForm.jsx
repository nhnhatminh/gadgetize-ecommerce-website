import React from "react";
import "../../styles/layouts/checkout.css";

export default function BillingShippingForm({
  emailOrPhone,
  setEmailOrPhone,
  subscribeNews,
  setSubscribeNews,
  country,
  setCountry,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  address,
  setAddress,
  apartment,
  setApartment,
  city,
  setCity,
  postalCode,
  setPostalCode,
  saveInfo,
  setSaveInfo,
}) {
  return (
    <>
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
    </>
  );
}
