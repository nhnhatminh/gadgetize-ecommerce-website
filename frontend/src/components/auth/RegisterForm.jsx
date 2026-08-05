import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import "../../styles/layouts/auth.css";

export default function RegisterForm({ onRegisterSuccess }) {
  // Lấy hàm register từ AuthContext
  const { register } = useAuth();

  // State quản lý form và trạng thái submit
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý đăng ký
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      // Gửi dữ liệu đăng ký
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
      {error && <div className="alert alert-danger py-2 small">{error}</div>}
      {success && (
        <div className="alert alert-success py-2 small">{success}</div>
      )}

      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label className="form-label text-dark fw-medium">Họ</label>
          <input
            type="text"
            className="form-control py-3 text-p"
            placeholder="Nhập họ"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label text-dark fw-medium">Tên</label>
          <input
            type="text"
            className="form-control py-3 text-p"
            placeholder="Nhập tên"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-dark fw-medium">Địa chỉ Email</label>
        <input
          type="email"
          className="form-control py-3 text-p"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-dark fw-medium">Số điện thoại</label>
        <input
          type="text"
          className="form-control py-3 text-p"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-dark fw-medium">Mật khẩu</label>
        <input
          type="password"
          className="form-control py-3 text-p"
          placeholder="Tối thiểu 6 ký tự"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4 form-check d-flex align-items-center gap-2">
        <input
          type="checkbox"
          className="form-check-input m-0"
          id="agreeTerms"
          required
          disabled={isSubmitting}
        />
        <label
          className="form-check-label text-des text-muted mt-1"
          htmlFor="agreeTerms"
        >
          Tôi đồng ý với các{" "}
          <a href="#" className="text-dark fw-medium text-decoration-none">
            Điều khoản dịch vụ
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-auth-submit w-100 py-3 fw-medium text-white rounded-3 mb-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang xử lý..." : "Tạo Tài Khoản"}
      </button>
    </form>
  );
}