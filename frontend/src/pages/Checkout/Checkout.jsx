import React, { useState } from "react";
import BillingShippingForm from "../../components/checkout/BillingShippingForm";
import PaymentMethods from "../../components/checkout/PaymentMethods";
import OrderSummarySidebar from "../../components/checkout/OrderSummarySidebar";
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

          <BillingShippingForm
            emailOrPhone={emailOrPhone}
            setEmailOrPhone={setEmailOrPhone}
            subscribeNews={subscribeNews}
            setSubscribeNews={setSubscribeNews}
            country={country}
            setCountry={setCountry}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            apartment={apartment}
            setApartment={setApartment}
            city={city}
            setCity={setCity}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            saveInfo={saveInfo}
            setSaveInfo={setSaveInfo}
          />

          <div className="mb-5">
            <h4 className="fw-bold mb-3 fs-5 text-dark">
              Phương thức vận chuyển
            </h4>
            <div className="border rounded-3 p-3 d-flex justify-content-between align-items-center bg-light-gray-custom">
              <span className="text-dark fs-7">Tiêu chuẩn</span>
              <span className="fw-bold text-dark fs-7">MIỄN PHÍ</span>
            </div>
          </div>

          <PaymentMethods
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            cvv={cvv}
            setCvv={setCvv}
            cardName={cardName}
            setCardName={setCardName}
          />

          <button
            type="button"
            className="btn btn-checkout-submit w-100 py-3 fw-medium text-white fs-6 rounded-3"
          >
            Thanh toán
          </button>
        </div>
      </div>

      <OrderSummarySidebar />
    </div>
  );
}
