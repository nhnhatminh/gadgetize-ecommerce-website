import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import "../../styles/layouts/auth.css";

export default function RegisterForm({ onRegisterSuccess }) {
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await register({ firstName, lastName, email, password, phone });

      setSuccess("Tạo tài khoản thành công! Đang chuyển sang trang đăng nhập...");

      if (onRegisterSuccess) {
        setTimeout(() => {
          onRegisterSuccess();
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleFormSubmit}>
      {error && <div className="auth-alert auth-alert--error">{error}</div>}
      {success && <div className="auth-alert auth-alert--success">{success}</div>}

      <div className="row g-3 auth-form-row">
        <div className="col-sm-6">
          <label className="auth-form-label">Họ</label>
          <input
            type="text"
            className="auth-form-input"
            placeholder="Nhập họ"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="col-sm-6">
          <label className="auth-form-label">Tên</label>
          <input
            type="text"
            className="auth-form-input"
            placeholder="Nhập tên"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="auth-form-group">
        <label className="auth-form-label">Địa chỉ Email</label>
        <input
          type="email"
          className="auth-form-input"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="auth-form-group">
        <label className="auth-form-label">Số điện thoại</label>
        <input
          type="text"
          className="auth-form-input"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="auth-form-group">
        <label className="auth-form-label">Mật khẩu</label>
        <input
          type="password"
          className="auth-form-input"
          placeholder="Tối thiểu 6 ký tự"
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
          id="agreeTerms"
          required
          disabled={isSubmitting}
        />
        <label className="auth-checkbox-label" htmlFor="agreeTerms">
          Tôi đồng ý với các{" "}
          <a href="#" className="auth-terms-link">
            Điều khoản dịch vụ
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="btn-auth-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang xử lý..." : "Tạo Tài Khoản"}
      </button>
    </form>
  );
}