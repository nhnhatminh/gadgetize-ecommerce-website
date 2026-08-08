import { useState } from "react";
import "../../styles/layouts/cart.css";

export default function ShippingCalculator() {
  const [country, setCountry] = useState("VN");
  const [province, setProvince] = useState("HCM");
  const [zipCode, setZipCode] = useState("");
  const [shippingRate, setShippingRate] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setShippingRate(0);
  };

  return (
    <div className="shipping-calculator-card">
      <h5 className="shipping-calculator-title">
        <i className="fa-solid fa-calculator"></i> Tính Phí Vận Chuyển
      </h5>
      <form onSubmit={handleCalculate} className="shipping-calculator-form">
        <div className="shipping-form-group">
          <label className="shipping-form-label">Quốc gia</label>
          <select
            className="shipping-form-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="VN">Việt Nam</option>
          </select>
        </div>

        <div className="shipping-form-group">
          <label className="shipping-form-label">Tỉnh / Thành phố</label>
          <select
            className="shipping-form-select"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="HCM">TP. Hồ Chí Minh</option>
            <option value="HN">Hà Nội</option>
            <option value="DN">Đà Nẵng</option>
            <option value="BD">Bình Dương</option>
            <option value="DNai">Đồng Nai</option>
          </select>
        </div>

        <div className="shipping-form-group">
          <label className="shipping-form-label">Mã bưu chính (Zip Code)</label>
          <input
            type="text"
            className="shipping-form-input"
            placeholder="Nhập mã bưu chính..."
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <button type="submit" className="shipping-calculate-btn">
          Tính Phí Giao Hàng
        </button>
      </form>

      {shippingRate !== null && (
        <div className="shipping-result-box">
          <p className="shipping-result-text">
            Phí giao hàng ước tính: <strong>Miễn phí</strong>
          </p>
        </div>
      )}
    </div>
  );
}