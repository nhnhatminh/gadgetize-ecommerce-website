import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "../../styles/components/admin_bar.css";

export default function AdminBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.role !== "admin") return null;

  return (
    <div className="admin-notice-bar">
      <div className="container admin-notice-container">
        <div className="admin-notice-content">
          <i className="fa-solid fa-user-shield admin-notice-icon"></i>
          <span className="admin-notice-text">
            Bạn đang duyệt cửa hàng với quyền Quản trị viên
          </span>
        </div>
        <button
          type="button"
          className="admin-notice-btn"
          onClick={() => navigate("/admin")}
        >
          <i className="fa-solid fa-gauge-high"></i> Vào Dashboard Quản Trị
        </button>
      </div>
    </div>
  );
}