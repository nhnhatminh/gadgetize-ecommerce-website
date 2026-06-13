import React from "react";
import "../../styles/layouts/admin.css";

export default function AdminLayout({ navigate, currentPage, children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <img
            src="/images/logo.png"
            alt="Admin Logo"
            className="admin-sidebar__logo"
          />
          <span className="admin-sidebar__badge">Workspace</span>
        </div>

        <nav className="admin-sidebar__nav">
          <div
            className={`admin-sidebar__link ${currentPage === "admin-dashboard" ? "admin-sidebar__link--active" : ""}`}
            onClick={() => navigate("admin-dashboard")}
          >
            <i className="fa-solid fa-chart-pie admin-sidebar__icon"></i>
            <span>Tổng quan</span>
          </div>

          <div
            className={`admin-sidebar__link ${currentPage === "admin-products" ? "admin-sidebar__link--active" : ""}`}
            onClick={() => navigate("admin-products")}
          >
            <i className="fa-solid fa-box-open admin-sidebar__icon"></i>
            <span>Quản lý sản phẩm</span>
          </div>

          <div
            className={`admin-sidebar__link ${currentPage === "admin-orders" ? "admin-sidebar__link--active" : ""}`}
            onClick={() => navigate("admin-orders")}
          >
            <i className="fa-solid fa-file-invoice-dollar admin-sidebar__icon"></i>
            <span>Quản lý đơn hàng</span>
          </div>
        </nav>

        <div className="admin-sidebar__footer">
          <div
            className="admin-sidebar__link text-danger border-top pt-3"
            onClick={() => navigate("home")}
          >
            <i className="fa-solid fa-right-from-bracket admin-sidebar__icon"></i>
            <span>Thoát quản trị</span>
          </div>
        </div>
      </aside>

      <div className="admin-main-panel">
        <header className="admin-header">
          <div className="admin-header__left">
            <h5 className="admin-header__title">Hệ Thống Quản Trị Gadgetize</h5>
          </div>
          <div className="admin-header__right">
            <div className="admin-header__user">
              <div className="admin-header__avatar">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <span className="admin-header__username">Administrator</span>
            </div>
          </div>
        </header>

        <main className="admin-content-body">{children}</main>
      </div>
    </div>
  );
}
