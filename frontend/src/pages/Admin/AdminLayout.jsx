import React, { useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/layouts/admin.css";

export default function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo-box">
            <i className="fa-solid fa-bolt admin-sidebar__logo-icon"></i>
            <h5 className="admin-sidebar__logo-text">Gadgetize</h5>
          </div>
          <span className="admin-sidebar__version">v1.1</span>
        </div>

        <div className="admin-sidebar__menu">
          <div className="admin-sidebar__category">Overview</div>
          <nav className="admin-sidebar__nav">
            <div
              className={`admin-sidebar__link ${currentPath === "/admin" ? "admin-sidebar__link--active" : ""}`}
              onClick={() => navigate("/admin")}
            >
              <i className="fa-solid fa-chart-pie admin-sidebar__icon"></i>
              <span>Dashboard</span>
            </div>
          </nav>

          <div className="admin-sidebar__category">Commerce</div>
          <nav className="admin-sidebar__nav">
            <div
              className={`admin-sidebar__link ${currentPath === "/admin/products" ? "admin-sidebar__link--active" : ""}`}
              onClick={() => navigate("/admin/products")}
            >
              <i className="fa-solid fa-box-open admin-sidebar__icon"></i>
              <span>Products</span>
            </div>

            <div
              className={`admin-sidebar__link ${currentPath === "/admin/orders" ? "admin-sidebar__link--active" : ""}`}
              onClick={() => navigate("/admin/orders")}
            >
              <i className="fa-solid fa-file-invoice-dollar admin-sidebar__icon"></i>
              <span>Orders</span>
            </div>
          </nav>

          <div className="admin-sidebar__category">System</div>
          <nav className="admin-sidebar__nav">
            <div
              className="admin-sidebar__link text-danger"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket admin-sidebar__icon"></i>
              <span>Logout</span>
            </div>
          </nav>
        </div>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__profile">
            <div className="admin-sidebar__avatar-box">
              {user?.firstName?.charAt(0) || "A"}
            </div>
            <div className="admin-sidebar__profile-info">
              <h6 className="admin-sidebar__username">
                {user ? `${user.lastName} ${user.firstName}` : "Admin"}
              </h6>
              <span className="admin-sidebar__user-role">Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main-panel">
        <header className="admin-header">
          <div className="admin-header__search-wrapper">
            <i className="fa-solid fa-magnifying-glass admin-header__search-icon"></i>
            <input
              type="text"
              className="admin-header__search-input"
              placeholder="Search anything... (Ctrl + K)"
            />
          </div>

          <div className="admin-header__actions">
            <button
              className="admin-header__btn-action"
              onClick={() => navigate("admin-products")}
            >
              <i className="fa-solid fa-plus me-2"></i> New Product
            </button>
            <div className="admin-header__icon-btn">
              <i className="fa-regular fa-moon"></i>
            </div>
            <div className="admin-header__icon-btn position-relative">
              <i className="fa-regular fa-bell"></i>
              <span className="admin-header__badge-dot"></span>
            </div>
            <div className="admin-header__divider"></div>
            <div className="admin-header__profile-badge">
              <div className="admin-header__avatar-mini">
                {user?.firstName?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </header>

        <main className="admin-content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
