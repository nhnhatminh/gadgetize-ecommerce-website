import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../api/adminApi";
import "../../styles/layouts/admin_dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu Admin Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  function handleNavigateProducts() {
    navigate("/admin/products");
  }

  function handleNavigateOrders() {
    navigate("/admin/orders");
  }

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">Bảng Điều Khiển Quản Trị</h2>
      </div>

      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-main">
          <div className="overview-card">
            <div className="overview-card-header">
              <h4 className="overview-card-title">Tổng Quan</h4>
              <select className="overview-time-select">
                <option value="all">Tất cả thời gian</option>
                <option value="month">Tháng này</option>
              </select>
            </div>

            <div className="overview-metrics-row">
              <div className="metric-box">
                <div className="metric-info">
                  <span className="metric-label">Khách hàng</span>
                  <h3 className="metric-value">
                    {stats?.totalCustomers?.toLocaleString("vi-VN") || 0}
                  </h3>
                </div>
                <span className="growth-badge growth-badge--up">8%</span>
              </div>

              <div className="metric-box">
                <div className="metric-info">
                  <span className="metric-label">Doanh thu</span>
                  <h3 className="metric-value">
                    {stats?.totalIncome
                      ? `${stats.totalIncome.toLocaleString("vi-VN")}₫`
                      : "0₫"}
                  </h3>
                </div>
                <span className="growth-badge growth-badge--up">12%</span>
              </div>

              <div className="metric-box">
                <div className="metric-info">
                  <span className="metric-label">Tổng đơn hàng</span>
                  <h3 className="metric-value">
                    {stats?.totalOrders?.toLocaleString("vi-VN") || 0}
                  </h3>
                </div>
                <span className="growth-badge growth-badge--up">5%</span>
              </div>
            </div>

            <div className="overview-recent-activity">
              <p className="activity-notice-text">
                Chào mừng đến với hệ thống quản trị cửa hàng trực tuyến <strong className="brand-text">Gadgetize Store</strong>
              </p>
            </div>
          </div>

          <div className="income-chart-card">
            <div className="income-chart-header">
              <h4 className="income-chart-title">Đơn Hàng Mới Nhất</h4>
              <button
                type="button"
                className="btn-view-all"
                onClick={handleNavigateOrders}
              >
                Xem Tất Cả Đơn Hàng
              </button>
            </div>

            <div className="recent-orders-table-wrapper">
              <table className="recent-orders-table">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentOrders?.map((order) => (
                    <tr key={order.id}>
                      <td className="js-order-id font-bold">#{order.id}</td>
                      <td>
                        {order.first_name} {order.last_name}
                      </td>
                      <td>
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </td>
                      <td>
                        <span
                          className={`order-status-tag status-${order.status}`}
                        >
                          {order.status === "pending"
                            ? "Chờ xử lý"
                            : order.status === "processing"
                            ? "Đang xử lý"
                            : order.status === "shipping"
                            ? "Đang giao"
                            : "Đã giao hàng"}
                        </span>
                      </td>
                      <td className="font-bold">
                        {order.final_total.toLocaleString("vi-VN")}₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-sidebar">
          <div className="widget-card">
            <h4 className="widget-title">Sản Phẩm Bán Chạy</h4>
            <div className="popular-products-list">
              {stats?.popularProducts?.map((item) => (
                <div key={item.id} className="popular-product-item">
                  <img
                    src={item.image_url || "/images/no-image.png"}
                    alt={item.name}
                    className="popular-product-img"
                    onError={(event) => {
                      event.target.onerror = null;
                      event.target.src = "/images/no-image.png";
                    }}
                  />
                  <div className="popular-product-info">
                    <h6 className="popular-product-name">{item.name}</h6>
                    <span className="popular-product-price">
                      Giá gốc: {item.base_price.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  <div className="popular-product-earnings">
                    <strong>
                      {item.earnings.toLocaleString("vi-VN")}₫
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="widget-action-button"
              onClick={handleNavigateProducts}
            >
              Tất Cả Sản Phẩm
            </button>
          </div>

          <div className="widget-card">
            <h4 className="widget-title">Đánh Giá Sản Phẩm</h4>
            <div className="review-preview-box">
              <div className="review-preview-header">
                <span className="review-stars">★★★★★</span>
                <span className="review-date">Hôm nay</span>
              </div>
              <p className="review-text">
                Giao diện trải nghiệm mượt mà, tốc độ phản hồi hệ thống tuyệt vời!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}