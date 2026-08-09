import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/useAuth";
import { orderApi } from "../../api/orderApi";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import "../../styles/layouts/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, totalPrice, clearCart, fetchCart } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [couponInfo, setCouponInfo] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState({});

  if (user?.role === "admin") {
    return (
      <div className="container checkout-page-container">
        <div className="checkout-empty-card">
          <p className="checkout-empty-text">
            Tài khoản Quản trị viên không thực hiện chức năng thanh toán đơn hàng.
          </p>
          <button
            type="button"
            className="checkout-back-shop-btn"
            onClick={() => navigate("/admin")}
          >
            Về Dashboard Admin
          </button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên người nhận.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ (ví dụ: 0901234567).";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng chi tiết.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    if (e) e.preventDefault();
    setOrderError("");

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const orderItems = cartItems.map((item) => ({
        variantId: item.variant_id,
        quantity: item.quantity,
      }));

      const fullAddress = `${formData.fullName.trim()} | ${formData.phone.trim()} | ${formData.address.trim()}${
        formData.notes.trim() ? ` | Ghi chú: ${formData.notes.trim()}` : ""
      }`;

      const payload = {
        items: orderItems,
        couponCode: couponInfo?.code || null,
        shippingAddress: fullAddress,
        paymentMethod: formData.paymentMethod,
        shippingFee: 0,
      };

      const response = await orderApi.createOrder(payload);
      setSuccessData(response);

      await clearCart();
      await fetchCart();
    } catch (err) {
      setOrderError(
        err.response?.data?.message ||
          "Đã xảy ra lỗi trong quá trình xử lý đơn hàng."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="container checkout-page-container">
        <div className="checkout-success-card">
          <div className="checkout-success-header">
            <h2 className="checkout-success-title">Đặt Hàng Thành Công!</h2>
            <p className="checkout-success-subtitle">
              Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được hệ thống xử lý.
            </p>
          </div>

          <div className="checkout-success-details">
            <p className="success-detail-row">
              <strong>Mã đơn hàng:</strong> #{successData.orderId}
            </p>
            <p className="success-detail-row">
              <strong>Trạng thái:</strong>{" "}
              <span className="checkout-status-badge">
                {successData.status}
              </span>
            </p>
            <p className="success-detail-row success-detail-row--last">
              <strong>Tổng thanh toán:</strong>{" "}
              <span className="checkout-success-total">
                {parseFloat(successData.totals?.finalTotal || 0).toLocaleString(
                  "vi-VN"
                )}
                ₫
              </span>
            </p>
          </div>

          <button
            type="button"
            className="checkout-success-btn"
            onClick={() => navigate("/shop")}
          >
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page-container">
      <h2 className="checkout-page-title">Thanh Toán Đơn Hàng</h2>

      {cartItems.length === 0 ? (
        <div className="checkout-empty-card">
          <p className="checkout-empty-text">
            Không có sản phẩm nào trong giỏ hàng để thanh toán.
          </p>
          <button
            type="button"
            className="checkout-back-shop-btn"
            onClick={() => navigate("/shop")}
          >
            Quay Lại Cửa Hàng
          </button>
        </div>
      ) : (
        <div className="row g-4">
          <main className="col-lg-7">
            {orderError && (
              <div className="checkout-alert-error">
                {orderError}
              </div>
            )}

            <CheckoutForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          </main>

          <aside className="col-lg-5">
            <CheckoutSummary
              cartItems={cartItems}
              subtotal={totalPrice}
              couponInfo={couponInfo}
              setCouponInfo={setCouponInfo}
              submitting={submitting}
              onSubmitOrder={handleSubmitOrder}
            />
          </aside>
        </div>
      )}
    </div>
  );
}