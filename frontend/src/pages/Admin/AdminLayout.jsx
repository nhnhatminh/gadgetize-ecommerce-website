import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "../../styles/layouts/admin.css";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Xử lý đăng xuất tài khoản quản trị
  function handleLogout() {
    logout();
    navigate("/auth");
  }

  // Điều hướng về trang chủ cửa hàng
  function handleNavigateStore() {
    navigate("/");
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo-box" onClick={handleNavigateStore}>
            <i className="fa-solid fa-bolt admin-sidebar-logo-icon"></i>
            <h5 className="admin-sidebar-logo-text">Gadgetize</h5>
          </div>
          <span className="admin-sidebar-version">v1.1</span>
        </div>

        <div className="admin-sidebar-menu">
          <div className="admin-sidebar-category">Tổng quan</div>
          <nav className="admin-sidebar-nav">
            <div
              className={`admin-sidebar-link ${
                currentPath === "/admin" ? "admin-sidebar-link--active" : ""
              }`}
              onClick={() => navigate("/admin")}
            >
              <i className="fa-solid fa-chart-pie admin-sidebar-icon"></i>
              <span>Bảng điều khiển</span>
            </div>
          </nav>

          <div className="admin-sidebar-category">Thương mại</div>
          <nav className="admin-sidebar-nav">
            <div
              className={`admin-sidebar-link ${
                currentPath === "/admin/products"
                  ? "admin-sidebar-link--active"
                  : ""
              }`}
              onClick={() => navigate("/admin/products")}
            >
              <i className="fa-solid fa-box-open admin-sidebar-icon"></i>
              <span>Sản phẩm</span>
            </div>

            <div
              className={`admin-sidebar-link ${
                currentPath === "/admin/orders"
                  ? "admin-sidebar-link--active"
                  : ""
              }`}
              onClick={() => navigate("/admin/orders")}
            >
              <i className="fa-solid fa-file-invoice-dollar admin-sidebar-icon"></i>
              <span>Đơn hàng</span>
            </div>
          </nav>

          <div className="admin-sidebar-category">Cửa hàng</div>
          <nav className="admin-sidebar-nav">
            <div
              className="admin-sidebar-link admin-sidebar-link--store"
              onClick={handleNavigateStore}
            >
              <i className="fa-solid fa-store admin-sidebar-icon"></i>
              <span>Xem Cửa Hàng</span>
            </div>
          </nav>

          <div className="admin-sidebar-category">Hệ thống</div>
          <nav className="admin-sidebar-nav">
            <div
              className="admin-sidebar-link admin-sidebar-link--danger"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket admin-sidebar-icon"></i>
              <span>Đăng xuất</span>
            </div>
          </nav>
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-profile">
            <div className="admin-sidebar-avatar-box">
              {user?.firstName?.charAt(0) || "A"}
            </div>
            <div className="admin-sidebar-profile-info">
              <h6 className="admin-sidebar-username">
                {user ? `${user.lastName} ${user.firstName}` : "Admin"}
              </h6>
              <span className="admin-sidebar-user-role">Quản trị viên</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main-panel">
        <header className="admin-header">
          <div className="admin-header-search-wrapper">
            <i className="fa-solid fa-magnifying-glass admin-header-search-icon"></i>
            <input
              type="text"
              className="admin-header-search-input"
              placeholder="Tìm kiếm hoặc nhập lệnh... (Ctrl + K)"
            />
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              className="admin-header-store-btn"
              onClick={handleNavigateStore}
            >
              <i className="fa-solid fa-store"></i> Xem Cửa Hàng
            </button>
            <button
              type="button"
              className="admin-header-action-btn"
              onClick={() => navigate("/admin/products")}
            >
              <i className="fa-solid fa-plus"></i> Thêm Sản Phẩm
            </button>
            <div className="admin-header-icon-btn">
              <i className="fa-regular fa-bell"></i>
            </div>
            <div className="admin-header-divider"></div>
            <div className="admin-header-profile-badge">
              <div className="admin-header-avatar-mini">
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