import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "../../styles/layouts/admin_login.css";

export default function AdminLogin() {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await adminLogin(email, password);
      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Thông tin xác thực Quản trị viên không chính xác hoặc không có quyền truy cập."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h3 className="admin-login-title">Hệ Thống Quản Trị Gadgetize</h3>
          <p className="admin-login-subtitle">
            Cổng xác thực danh tính dành riêng cho Quản trị viên
          </p>
        </div>

        <form className="admin-login-form" onSubmit={handleAdminSubmit}>
          {error && <div className="admin-login-alert">{error}</div>}

          <div className="admin-form-group">
            <label className="admin-form-label">Email quản trị</label>
            <input
              type="email"
              className="admin-form-input"
              placeholder="admin@gadgetize.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Mật khẩu</label>
            <input
              type="password"
              className="admin-form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xác thực..." : "Đăng Nhập Quản Trị"}
          </button>
        </form>

        <div className="admin-login-footer">
          <button
            type="button"
            className="admin-back-store-btn"
            onClick={() => navigate("/")}
          >
            <i className="fa-solid fa-arrow-left"></i> Quay lại Cửa Hàng
          </button>
        </div>
      </div>
    </div>
  );
}