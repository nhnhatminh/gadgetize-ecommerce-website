import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { orderApi } from "../../api/orderApi";
import "../../styles/layouts/order_success.css";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Tải thông tin chi tiết đơn hàng khi có ID trên URL
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

  // Hiển thị màn hình chờ tải thông tin đơn hàng
  if (loading) {
    return (
      <div className="order-success-loading-wrapper">
        <div className="order-success-spinner" role="status">
          <span className="order-success-loading-text">Loading...</span>
        </div>
      </div>
    );
  }

  // Hiển thị thông báo lỗi nếu đơn hàng không tồn tại hoặc có lỗi từ API
  if (error || !orderData) {
    return (
      <div className="order-success-error-card">
        <h5 className="order-success-error-title">Đã xảy ra lỗi</h5>
        <p className="order-success-error-message">
          {error || "Đơn hàng không tồn tại."}
        </p>
        <button
          type="button"
          className="order-success-back-btn"
          onClick={() => navigate("/shop")}
        >
          Quay Lại Cửa Hàng
        </button>
      </div>
    );
  }

  const { order, items } = orderData;

  return (
    <div className="order-success-page-wrapper">
      <div className="order-success-card">
        <div className="order-success-header">
          <div className="order-success-icon-box">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h3 className="order-success-title">Cảm Ơn Bạn Đã Đặt Hàng!</h3>
          <p className="order-success-subtitle">
            Đơn hàng <span className="order-id-text">#{order.id}</span> đã được ghi nhận và đang xử lý.
          </p>
        </div>

        <div className="order-info-details-box">
          <div className="row g-2">
            <div className="col-sm-6">
              <span className="order-info-label">Ngày đặt:</span>{" "}
              <strong className="order-info-value">
                {new Date(order.created_at).toLocaleString("vi-VN")}
              </strong>
            </div>
            <div className="col-sm-6">
              <span className="order-info-label">Trạng thái:</span>{" "}
              <span className="order-status-badge">{order.status}</span>
            </div>
            <div className="col-sm-6">
              <span className="order-info-label">Phương thức:</span>{" "}
              <strong className="order-info-value">
                {order.payment_method === "cod"
                  ? "Thanh toán COD"
                  : "Chuyển khoản"}
              </strong>
            </div>
            <div className="col-sm-6">
              <span className="order-info-label">Mã giảm giá:</span>{" "}
              <strong className="order-info-coupon">
                {order.coupon_code || "Không có"}
              </strong>
            </div>
            <div className="col-12 order-address-col">
              <span className="order-info-label">Địa chỉ nhận hàng:</span>
              <p className="order-address-text">{order.shipping_address}</p>
            </div>
          </div>
        </div>

        <h5 className="order-items-title">Chi Tiết Sản Phẩm</h5>
        <div className="order-items-list">
          {items.map((item) => (
            <div key={item.id} className="order-item-row">
              <div className="order-item-img-box">
                <img
                  src={item.image_url || "/images/no-image.png"}
                  alt={item.product_name}
                  className="order-item-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/no-image.png";
                  }}
                />
              </div>
              <div className="order-item-info">
                <h6 className="order-item-name">{item.product_name}</h6>
                <span className="order-item-meta">
                  Màu: {item.color_name || "Mặc định"} | SKU: {item.sku}
                </span>
              </div>
              <div className="order-item-price-box">
                <div className="order-item-unit-price">
                  {item.unit_price.toLocaleString("vi-VN")}₫
                </div>
                <div className="order-item-quantity">x{item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-totals-breakdown">
          <div className="order-totals-line">
            <span className="order-totals-label">Tạm tính:</span>
            <span className="order-totals-value">
              {order.subtotal.toLocaleString("vi-VN")}₫
            </span>
          </div>

          {order.discount_total > 0 && (
            <div className="order-totals-line order-totals-line--discount">
              <span>Giảm giá:</span>
              <span>-{order.discount_total.toLocaleString("vi-VN")}₫</span>
            </div>
          )}

          <div className="order-totals-line">
            <span className="order-totals-label">Phí giao hàng:</span>
            <span className="order-totals-value order-totals-value--free">Miễn phí</span>
          </div>

          <div className="order-divider" />

          <div className="order-totals-final-line">
            <span className="order-final-label">Tổng Thanh Toán:</span>
            <span className="order-final-price">
              {order.final_total.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <div className="order-success-actions">
          <button
            type="button"
            className="order-success-continue-btn"
            onClick={() => navigate("/shop")}
          >
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>
    </div>
  );
}