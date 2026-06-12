import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { orderApi } from "../../api/orderApi";
import BillingShippingForm from "../../components/checkout/BillingShippingForm";
import PaymentMethods from "../../components/checkout/PaymentMethods";
import OrderSummarySidebar from "../../components/checkout/OrderSummarySidebar";

export default function Checkout({ navigate }) {
  const { cartItems, clearCart } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);

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

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.final_unit_price) * item.quantity,
      0,
    );
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!emailOrPhone || !lastName || !address || !city) {
      setError("Please fill in all required contact and shipping information");
      setSubmitting(false);
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        variantId: item.variant_id,
        quantity: item.quantity,
      }));

      const localizedApartment = apartment.trim()
        ? `${apartment.trim()}, `
        : "";
      const fullShippingAddress = `${lastName.trim()} ${firstName.trim()} | ${emailOrPhone.trim()} | ${localizedApartment}${address.trim()}, ${city.trim()}, ${country}`;

      const payload = {
        items: orderItems,
        couponCode: couponCode.trim() || null,
        shippingAddress: fullShippingAddress,
        paymentMethod: paymentMethod,
        shippingFee: 0,
      };

      const response = await orderApi.createOrder(payload);
      setSuccessData(response);
      await clearCart();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while processing your order",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="checkout-success-wrapper container py-5 text-center">
        <div
          className="card p-5 border-success mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <h2 className="text-success fw-bold mb-3">Đặt Hàng Thành Công!</h2>
          <p className="text-muted fs-5 mb-4">
            Cảm ơn bạn đã mua sắm tại Gadgetize Store.
          </p>
          <div className="text-start bg-light p-3 rounded mb-4">
            <p className="mb-2">
              <strong>Mã đơn hàng:</strong> #{successData.orderId}
            </p>
            <p className="mb-2">
              <strong>Trạng thái:</strong>{" "}
              <span className="badge bg-warning text-dark">
                {successData.status}
              </span>
            </p>
            <p className="mb-0">
              <strong>Tổng thanh toán:</strong>{" "}
              {parseFloat(successData.totals?.finalTotal).toLocaleString()} VND
            </p>
          </div>
          <button
            className="btn btn-primary w-100 py-2 fw-bold"
            onClick={() => navigate("products")}
          >
            Quay Lại Cửa Hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-wrapper container py-5">
      <h1 className="fw-bold text-dark mb-4">Thanh Toán Đơn Hàng</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">
            Không có sản phẩm nào trong giỏ hàng để thanh toán.
          </p>
          <button
            className="btn btn-primary px-4 mt-2"
            onClick={() => navigate("products")}
          >
            Quay lại Cửa Hàng
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="row g-4">
          <main className="col-lg-7">
            {error && <div className="alert alert-danger mb-4">{error}</div>}

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
          </main>

          <OrderSummarySidebar
            cartItems={cartItems}
            subtotal={calculateSubtotal()}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            submitting={submitting}
          />
        </form>
      )}
    </div>
  );
}
