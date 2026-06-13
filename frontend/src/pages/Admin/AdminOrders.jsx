import React, { useState, useEffect } from "react";
import { adminApi } from "../../api/adminApi";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadAdminOrders = async () => {
    try {
      const data = await adminApi.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAdminOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminApi.updateOrderStatus(id, newStatus);
      loadAdminOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-orders-view">
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Quản Lý Trạng Thái Đơn Hàng</h4>
        <p className="text-muted text-des mb-0">
          Hệ thống phê duyệt tiến trình hóa đơn và vận chuyển toàn sàn giao
          dịch.
        </p>
      </div>

      <div className="card border rounded-4 shadow-sm overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr className="text-secondary fs-7">
                <th className="ps-4">Mã đơn</th>
                <th>Khách hàng</th>
                <th>Địa chỉ giao hàng</th>
                <th>Phương thức</th>
                <th>Thời gian đặt</th>
                <th>Tổng thanh toán</th>
                <th>Trạng thái kiểm soát</th>
                <th className="pe-4">Cập nhật nhanh</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id} className="fs-7 text-dark">
                  <td className="ps-4 fw-bold text-primary">#{ord.id}</td>
                  <td>
                    <div className="fw-bold">
                      {ord.first_name} {ord.last_name}
                    </div>
                    <div className="text-muted fs-8">{ord.email}</div>
                  </td>
                  <td>
                    <div
                      className="text-truncate"
                      style={{ maxWidth: "200px" }}
                      title={ord.shipping_address}
                    >
                      {ord.shipping_address}
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark text-uppercase border">
                      {ord.payment_method}
                    </span>
                  </td>
                  <td>{new Date(ord.created_at).toLocaleString("vi-VN")}</td>
                  <td className="fw-bold text-dark">
                    {parseFloat(ord.final_total).toLocaleString("vi-VN")}₫
                  </td>
                  <td>
                    <span
                      className={`badge px-2 py-1 rounded-1 fw-semibold ${
                        ord.status === "pending"
                          ? "bg-warning-subtle text-warning-custom"
                          : ord.status === "processing"
                            ? "bg-primary-subtle text-primary"
                            : ord.status === "shipping"
                              ? "bg-info-subtle text-info"
                              : "bg-success-subtle text-success"
                      }`}
                      style={
                        ord.status === "pending" ? { color: "#b25e00" } : {}
                      }
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
                  <td className="pe-4">
                    <select
                      className="form-select form-select-sm border-light-subtle rounded-2 text-dark fs-7"
                      value={ord.status}
                      onChange={(e) =>
                        handleStatusChange(ord.id, e.target.value)
                      }
                      style={{ width: "130px" }}
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
      </div>
    </div>
  );
}
