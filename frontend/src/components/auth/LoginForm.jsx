import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "../../styles/layouts/auth.css";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await login(email, password);

      if (response?.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Địa chỉ email hoặc mật khẩu không chính xác"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleFormSubmit}>
      {error && <div className="auth-alert auth-alert--error">{error}</div>}

      <div className="auth-form-group">
        <label className="auth-form-label">Địa chỉ Email</label>
        <input
          type="email"
          className="auth-form-input"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="auth-form-group">
        <div className="auth-form-group-header">
          <label className="auth-form-label">Mật khẩu</label>
          <a href="#" className="forgot-password-link">
            Quên mật khẩu?
          </a>
        </div>
        <input
          type="password"
          className="auth-form-input"
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="auth-checkbox-group">
        <input
          type="checkbox"
          className="auth-checkbox-input"
          id="rememberMe"
          disabled={isSubmitting}
        />
        <label className="auth-checkbox-label" htmlFor="rememberMe">
          Ghi nhớ đăng nhập
        </label>
      </div>

      <button
        type="submit"
        className="btn-auth-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
      </button>
    </form>
  );
}