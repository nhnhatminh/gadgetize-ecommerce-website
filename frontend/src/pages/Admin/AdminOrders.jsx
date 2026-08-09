import { useState, useEffect } from "react";
import { adminApi } from "../../api/adminApi";
import "../../styles/layouts/admin_orders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tải danh sách đơn hàng
  useEffect(() => {
    let isMounted = true;

    const fetchAdminOrders = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getAllOrders();
        if (isMounted) {
          setOrders(data || []);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách đơn hàng:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAdminOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  // Xử lý cập nhật trạng thái đơn hàng
  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminApi.updateOrderStatus(id, newStatus);
      const updatedData = await adminApi.getAllOrders();
      setOrders(updatedData || []);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    }
  };

  return (
    <div className="admin-orders-view">
      <div className="admin-orders-header">
        <h4 className="admin-orders-title">Quản Lý Trạng Thái Đơn Hàng</h4>
        <p className="admin-orders-subtitle">
          Hệ thống phê duyệt tiến trình hóa đơn và vận chuyển toàn sàn giao dịch.
        </p>
      </div>

      <div className="admin-table-card">
        {loading ? (
          <div className="admin-table-loading">
            <div className="dashboard-spinner"></div>
          </div>
        ) : (
          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr className="admin-table-header-row">
                  <th className="admin-table-th admin-table-th--first">Mã đơn</th>
                  <th className="admin-table-th">Khách hàng</th>
                  <th className="admin-table-th">Địa chỉ giao hàng</th>
                  <th className="admin-table-th">Phương thức</th>
                  <th className="admin-table-th">Thời gian đặt</th>
                  <th className="admin-table-th">Tổng thanh toán</th>
                  <th className="admin-table-th">Trạng thái kiểm soát</th>
                  <th className="admin-table-th admin-table-th--last">Cập nhật nhanh</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord) => (
                  <tr key={ord.id} className="admin-table-row">
                    <td className="admin-table-td admin-table-td--first admin-order-id">
                      #{ord.id}
                    </td>
                    <td className="admin-table-td">
                      <div className="admin-customer-name">
                        {ord.first_name} {ord.last_name}
                      </div>
                      <div className="admin-customer-email">{ord.email}</div>
                    </td>
                    <td className="admin-table-td">
                      <div
                        className="admin-shipping-address"
                        title={ord.shipping_address}
                      >
                        {ord.shipping_address}
                      </div>
                    </td>
                    <td className="admin-table-td">
                      <span className="admin-payment-badge">
                        {ord.payment_method}
                      </span>
                    </td>
                    <td className="admin-table-td">
                      {new Date(ord.created_at).toLocaleString("vi-VN")}
                    </td>
                    <td className="admin-table-td admin-order-price">
                      {parseFloat(ord.final_total).toLocaleString("vi-VN")}₫
                    </td>
                    <td className="admin-table-td">
                      <span
                        className={`admin-status-badge ${
                          ord.status === "pending"
                            ? "admin-status-badge--pending"
                            : ord.status === "processing"
                              ? "admin-status-badge--processing"
                              : ord.status === "shipping"
                                ? "admin-status-badge--shipping"
                                : "admin-status-badge--delivered"
                        }`}
                      >
                        {ord.status === "pending"
                          ? "Chờ xử lý"
                          : ord.status === "processing"
                            ? "Đang xử lý"
                            : ord.status === "shipping"
                              ? "Đang giao"
                              : "Đã giao hàng"}
                      </span>
                    </td>
                    <td className="admin-table-td admin-table-td--last">
                      <select
                        className="admin-status-select"
                        value={ord.status}
                        onChange={(e) =>
                          handleStatusChange(ord.id, e.target.value)
                        }
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="shipping">Đang giao</option>
                        <option value="delivered">Đã giao hàng</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}