import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { orderApi } from "../../api/orderApi";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import "../../styles/layouts/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart, fetchCart } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [couponInfo, setCouponInfo] = useState(null);

  // Thông tin người nhận và thanh toán
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cod",
  });

  // Lỗi validation
  const [errors, setErrors] = useState({});

  // Kiểm tra Form
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

  // Tạo đơn hàng
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

      // Xóa giỏ hàng sau khi đặt hàng thành công
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

  // Màn hình đặt hàng thành công
  if (successData) {
    return (
      <div className="container py-5">
        <div
          className="card p-5 border-0 shadow-sm rounded-4 mx-auto bg-white"
          style={{ maxWidth: "600px" }}
        >
          <div className="text-center">
            <h2 className="fw-bold text-success mb-3">Đặt Hàng Thành Công!</h2>
            <p className="text-muted mb-4">
              Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được hệ thống xử lý.
            </p>
          </div>

          <div className="text-start bg-light p-3 rounded-3 mb-4 fs-7 border">
            <p className="mb-2">
              <strong>Mã đơn hàng:</strong> #{successData.orderId}
            </p>
            <p className="mb-2">
              <strong>Trạng thái:</strong>{" "}
              <span className="badge bg-warning text-dark fw-medium">
                {successData.status}
              </span>
            </p>
            <p className="mb-0">
              <strong>Tổng thanh toán:</strong>{" "}
              <span className="text-success fw-bold">
                {parseFloat(successData.totals?.finalTotal || 0).toLocaleString(
                  "vi-VN"
                )}
                ₫
              </span>
            </p>
          </div>

          <button
            type="button"
            className="btn btn-success w-100 py-2 fw-bold rounded-3 text-white border-0"
            onClick={() => navigate("/shop")}
            style={{ backgroundColor: "#006837" }}
          >
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-dark mb-4">Thanh Toán Đơn Hàng</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-5">
          <p className="text-muted fs-6 mb-3">
            Không có sản phẩm nào trong giỏ hàng để thanh toán.
          </p>
          <button
            type="button"
            className="btn btn-success px-4 py-2 fw-bold rounded-3"
            onClick={() => navigate("/shop")}
            style={{ backgroundColor: "#006837" }}
          >
            Quay Lại Cửa Hàng
          </button>
        </div>
      ) : (
        <div className="row g-4">
          <main className="col-lg-7">
            {orderError && (
              <div className="alert alert-danger mb-4 fs-7 rounded-3">
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