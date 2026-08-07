import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { orderApi } from "../../api/orderApi";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const res = await orderApi.getOrderById(id);
        setOrderData(res);
      } catch (err) {
        setError(
          err.response?.data?.message || "Không thể tải thông tin đơn hàng."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div
        className="alert alert-danger mx-auto p-4 rounded-4"
        style={{ maxWidth: "500px" }}
      >
        <h5 className="fw-bold mb-2">Đã xảy ra lỗi</h5>
        <p className="mb-3">{error || "Đơn hàng không tồn tại."}</p>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm px-4 fw-medium"
          onClick={() => navigate("/shop")}
        >
          Quay Lại Cửa Hàng
        </button>
      </div>
    );
  }

  const { order, items } = orderData;

  return (
    <div
      className="max-w-700 mx-auto bg-white p-4 p-md-5 rounded-4 shadow-sm border"
      style={{ maxWidth: "750px" }}
    >
      <div className="text-center mb-4">
        <div className="text-success mb-2">
          <i className="fa-solid fa-circle-check display-4"></i>
        </div>
        <h3 className="fw-bold text-dark mb-1">Cảm Ơn Bạn Đã Đặt Hàng!</h3>
        <p className="text-muted fs-7">
          Đơn hàng <span className="fw-bold text-dark">#{order.id}</span> đã
          được ghi nhận và đang xử lý.
        </p>
      </div>

      <div className="bg-light p-3 rounded-3 mb-4 fs-7 border">
        <div className="row g-2">
          <div className="col-sm-6">
            <span className="text-muted">Ngày đặt:</span>{" "}
            <strong className="text-dark">
              {new Date(order.created_at).toLocaleString("vi-VN")}
            </strong>
          </div>
          <div className="col-sm-6">
            <span className="text-muted">Trạng thái:</span>{" "}
            <span className="badge bg-warning text-dark fw-medium ms-1">
              {order.status}
            </span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted">Phương thức:</span>{" "}
            <strong className="text-dark">
              {order.payment_method === "cod"
                ? "Thanh toán COD"
                : "Chuyển khoản"}
            </strong>
          </div>
          <div className="col-sm-6">
            <span className="text-muted">Mã giảm giá:</span>{" "}
            <strong className="text-success">
              {order.coupon_code || "Không có"}
            </strong>
          </div>
          <div className="col-12 mt-2 pt-2 border-top">
            <span className="text-muted">Địa chỉ nhận hàng:</span>
            <p className="mb-0 fw-medium text-dark mt-1">
              {order.shipping_address}
            </p>
          </div>
        </div>
      </div>

      <h5 className="fw-bold text-dark mb-3 fs-6">Chi Tiết Sản Phẩm</h5>
      <div className="checkout-items-list mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="d-flex align-items-center gap-3 py-2 border-bottom"
          >
            <img
              src={item.image_url || "/images/no-image.png"}
              alt={item.product_name}
              className="rounded-3 border p-1 object-fit-contain bg-light"
              style={{ width: "50px", height: "50px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/no-image.png";
              }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-bold text-dark fs-7">
                {item.product_name}
              </h6>
              <span className="text-muted fs-8">
                Màu: {item.color_name || "Mặc định"} | SKU: {item.sku}
              </span>
            </div>
            <div className="text-end fs-7">
              <div className="fw-bold text-dark">
                {item.unit_price.toLocaleString("vi-VN")}₫
              </div>
              <div className="text-muted fs-8">x{item.quantity}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-top pt-3 mb-4 fs-7">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Tạm tính:</span>
          <span className="fw-medium">
            {order.subtotal.toLocaleString("vi-VN")}₫
          </span>
        </div>

        {order.discount_total > 0 && (
          <div className="d-flex justify-content-between mb-2 text-success">
            <span>Giảm giá:</span>
            <span className="fw-bold">
              -{order.discount_total.toLocaleString("vi-VN")}₫
            </span>
          </div>
        )}

        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Phí giao hàng:</span>
          <span className="fw-bold text-success">Miễn phí</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center fs-6">
          <span className="fw-bold text-dark">Tổng Thanh Toán:</span>
          <span className="fw-bold text-success fs-4">
            {order.final_total.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button
          type="button"
          className="btn btn-success flex-grow-1 py-2 fw-bold rounded-3 border-0 text-white"
          onClick={() => navigate("/shop")}
          style={{ backgroundColor: "#006837" }}
        >
          Tiếp Tục Mua Sắm
        </button>
      </div>
    </div>
  );
}