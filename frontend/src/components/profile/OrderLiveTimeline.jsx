import { useState } from "react";
import "../../styles/layouts/profile.css";

export default function OrderLiveTimeline() {
  const [activeTab, setActiveTab] = useState("timeline");

  const activeOrder = {
    orderId: "GDZ-884920",
    orderDate: "13 Tháng 5, 2026 - 09:15",
    estimatedDelivery: "15 Tháng 5, 2026",
    courierName: "Giao Hàng Nhanh (GHN)",
    trackingCode: "GHN99201844",
    driverName: "Trần Văn Nam",
    driverPhone: "0912 345 678",
    totalPrice: 24500000,
    itemCount: 1,
    productName: "Màn Hình LCD Radiant View 4K Quantum",
    productImg: "/images/pr-3.png",
    timelineSteps: [
      {
        id: 1,
        status: "Đã Nhận Hàng",
        location: "Giao hàng thành công đến người nhận tại Quận Bình Thạnh, TP. HCM",
        time: "11:32 - 15/05/2026",
        completed: false,
        isCurrent: false,
        icon: "fa-solid fa-house-chimney-check",
      },
      {
        id: 2,
        status: "Đang Giao Hàng",
        location: "Bưu tá Trần Văn Nam đang trên đường giao hàng đến bạn",
        time: "08:10 - 15/05/2026",
        completed: true,
        isCurrent: true,
        icon: "fa-solid fa-truck-ramping",
      },
      {
        id: 3,
        status: "Đã Đến Bưu Cục Đích",
        location: "Đơn hàng đã tới bưu cục Bình Thạnh HUB - TP. Hồ Chí Minh",
        time: "04:29 - 15/05/2026",
        completed: true,
        isCurrent: false,
        icon: "fa-solid fa-warehouse",
      },
      {
        id: 4,
        status: "Đã Xuất Kho Trung Chuyển",
        location: "Đơn hàng rời kho tổng Tân Bình và đang vận chuyển đường bộ",
        time: "19:40 - 14/05/2026",
        completed: true,
        isCurrent: false,
        icon: "fa-solid fa-truck-fast",
      },
      {
        id: 5,
        status: "Đã Xác Nhận Đơn Hàng",
        location: "Người bán Gadgetize Store đang đóng gói sản phẩm",
        time: "09:30 - 13/05/2026",
        completed: true,
        isCurrent: false,
        icon: "fa-solid fa-receipt",
      },
    ],
  };

  const pastOrders = [
    {
      id: "GDZ-773821",
      date: "02/04/2026",
      status: "delivered",
      statusText: "Đã giao hàng",
      total: 1200000,
      name: "Tai Nghe Razer Electra V2",
      img: "/images/pr-1.png",
    },
    {
      id: "GDZ-661902",
      date: "18/02/2026",
      status: "delivered",
      statusText: "Đã giao hàng",
      total: 2450000,
      name: "Chuột Gaming Hyper Glide Pro",
      img: "/images/pr-2.png",
    },
  ];

  return (
    <div className="order-live-container">
      <div className="order-tab-header">
        <button
          className={`order-tab-btn ${
            activeTab === "timeline" ? "order-tab-btn--active" : ""
          }`}
          onClick={() => setActiveTab("timeline")}
        >
          <i className="fa-solid fa-route"></i> Theo Dõi Lộ Trình Đơn Hàng
        </button>
        <button
          className={`order-tab-btn ${
            activeTab === "purchases" ? "order-tab-btn--active" : ""
          }`}
          onClick={() => setActiveTab("purchases")}
        >
          <i className="fa-solid fa-clock-rotate-left"></i> Lịch Sử Mua Hàng
        </button>
      </div>

      {activeTab === "timeline" ? (
        <div className="timeline-view-card">
          <div className="order-summary-top">
            <div className="order-summary-item-box">
              <img
                src={activeOrder.productImg}
                alt={activeOrder.productName}
                className="order-summary-img"
              />
              <div className="order-summary-info">
                <span className="order-summary-code">
                  Đơn hàng #{activeOrder.orderId}
                </span>
                <h6 className="order-summary-title">
                  {activeOrder.productName}
                </h6>
                <p className="order-summary-price">
                  {activeOrder.totalPrice.toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>

            <div className="order-courier-box">
              <span className="courier-label">Đơn vị vận chuyển</span>
              <strong className="courier-name">{activeOrder.courierName}</strong>
              <span className="courier-tracking">
                Mã vận đơn: {activeOrder.trackingCode}
              </span>
            </div>
          </div>

          <div className="driver-info-card">
            <div className="driver-details">
              <i className="fa-solid fa-user-ninja driver-icon"></i>
              <div>
                <span className="driver-title">Nhân viên giao hàng</span>
                <strong className="driver-name">{activeOrder.driverName}</strong>
              </div>
            </div>
            <a
              href={`tel:${activeOrder.driverPhone}`}
              className="driver-call-btn"
            >
              <i className="fa-solid fa-phone"></i> Gọi Bưu Tá ({activeOrder.driverPhone})
            </a>
          </div>

          <div className="timeline-stepper">
            <h6 className="timeline-stepper-title">Lộ trình vận chuyển chi tiết</h6>
            <div className="timeline-list">
              {activeOrder.timelineSteps.map((step) => (
                <div
                  key={step.id}
                  className={`timeline-item ${
                    step.isCurrent
                      ? "timeline-item--active"
                      : step.completed
                      ? "timeline-item--completed"
                      : ""
                  }`}
                >
                  <div className="timeline-node">
                    <div className="timeline-icon-box">
                      <i className={step.icon}></i>
                    </div>
                    <div className="timeline-line"></div>
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <h6 className="timeline-status-name">{step.status}</h6>
                      <span className="timeline-timestamp">{step.time}</span>
                    </div>
                    <p className="timeline-location-text">{step.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="purchases-view-card">
          <h6 className="purchases-card-title">Đơn hàng đã hoàn thành</h6>
          <div className="purchases-list">
            {pastOrders.map((item) => (
              <div key={item.id} className="purchase-item-card">
                <img
                  src={item.img}
                  alt={item.name}
                  className="purchase-item-img"
                />
                <div className="purchase-item-details">
                  <div className="purchase-item-header">
                    <span className="purchase-id">#{item.id}</span>
                    <span className="purchase-status-badge">
                      {item.statusText}
                    </span>
                  </div>
                  <h6 className="purchase-name">{item.name}</h6>
                  <span className="purchase-date">Ngày đặt: {item.date}</span>
                </div>
                <div className="purchase-item-action">
                  <span className="purchase-total">
                    {item.total.toLocaleString("vi-VN")}₫
                  </span>
                  <button className="purchase-reorder-btn">
                    Mua Lại
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}