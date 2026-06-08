import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { orderApi } from "../../api/orderApi";

export default function Checkout({ navigate }) {
  const { cartItems, clearCart } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);

  const [formData, setFormData] = useState({
    receiverName: "",
    phone: "",
    address: "",
    city: "",
    couponCode: "",
    paymentMethod: "cod",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

    if (
      !formData.receiverName ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      setError("Please fill in all required shipping information");
      setSubmitting(false);
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        variantId: item.variant_id,
        quantity: item.quantity,
      }));

      const fullShippingAddress = `${formData.receiverName} | ${formData.phone} | ${formData.address}, ${formData.city}`;

      const payload = {
        items: orderItems,
        couponCode: formData.couponCode.trim() || null,
        shippingAddress: fullShippingAddress,
        paymentMethod: formData.paymentMethod,
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
              {parseFloat(successData.totals?.totalAmount).toLocaleString()} VND
            </p>
          </div>
          <button
            className="btn btn-primary w-100 py-2 fw-bold"
            onClick={() => navigate("shop")}
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
            onClick={() => navigate("shop")}
          >
            Quay lại Cửa Hàng
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="row g-4">
          <main className="col-lg-7">
            <div className="card p-4 border rounded bg-white mb-4">
              <h3 className="fw-bold text-dark mb-4">Thông tin giao hàng</h3>

              {error && <div className="alert alert-danger mb-4">{error}</div>}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small text-muted fw-medium">
                    Tên người nhận *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    placeholder="Nguyen Van A"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted fw-medium">
                    Số điện thoại *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0901234567"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted fw-medium">
                    Địa chỉ nhận hàng *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Số 123 Đường ABC, Phường X"
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label small text-muted fw-medium">
                    Tỉnh / Thành phố *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Ho Chi Minh City"
                  />
                </div>
              </div>
            </div>

            <div className="card p-4 border rounded bg-white">
              <h3 className="fw-bold text-dark mb-4">Phương thức thanh toán</h3>
              <div className="form-check p-3 border rounded mb-2">
                <input
                  className="form-check-input ms-0 me-2"
                  type="radio"
                  name="paymentMethod"
                  id="payCod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label fw-medium text-dark"
                  htmlFor="payCod"
                >
                  Thanh toán khi nhận hàng (COD)
                </label>
              </div>
            </div>
          </main>

          <aside className="col-lg-5">
            <div
              className="card p-4 border rounded bg-light position-sticky"
              style={{ top: "20px" }}
            >
              <h3 className="fw-bold text-dark mb-4">Đơn hàng của bạn</h3>

              <div
                className="checkout-items-list mb-4 overflow-auto"
                style={{ maxHeight: "240px" }}
              >
                {cartItems.map((item) => (
                  <div
                    className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom"
                    key={item.id}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image_url || "/images/no-image.png"}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        className="rounded"
                      />
                      <div>
                        <h6
                          className="mb-0 text-dark fw-semibold text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {item.name}
                        </h6>
                        <span className="text-muted small">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="text-dark fw-medium">
                      {(
                        parseFloat(item.final_unit_price) * item.quantity
                      ).toLocaleString()}{" "}
                      VND
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="form-label small text-muted fw-medium">
                  Mã giảm giá (Coupon)
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    placeholder="E.g., DEV123"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tạm tính:</span>
                <span className="text-dark fw-semibold">
                  {calculateSubtotal().toLocaleString()} VND
                </span>
              </div>
              <div className="d-flex justify-content-between mb-4 pb-2 border-bottom">
                <span className="text-muted">Phí vận chuyển:</span>
                <span className="text-success fw-medium">Miễn phí</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-5 fw-bold">Tổng cộng:</span>
                <span className="fs-5 fw-bold text-primary">
                  {calculateSubtotal().toLocaleString()} VND
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 fw-bold fs-5"
                disabled={submitting}
              >
                {submitting ? "Xử Lý Giao Dịch..." : "Xác Nhận Đặt Hàng"}
              </button>
            </div>
          </aside>
        </form>
      )}
    </div>
  );
}
