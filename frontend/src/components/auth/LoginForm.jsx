import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/layouts/auth.css";

export default function LoginForm({ navigate }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Địa chỉ email hoặc mật khẩu không chính xác",
      );
    }
  };

  return (
    <form className="auth-form" onSubmit={handleFormSubmit}>
      {error && <div className="alert alert-danger py-2 small">{error}</div>}

      <div className="mb-3">
        <label className="form-label text-dark fw-medium">Địa chỉ Email</label>
        <input
          type="email"
          className="form-control py-3 text-p"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label className="form-label text-dark fw-medium mb-0">
            Mật khẩu
          </label>
          <a
            href="#"
            className="forgot-password-link text-des text-muted text-decoration-none"
          >
            Quên mật khẩu?
          </a>
        </div>
        <input
          type="password"
          className="form-control py-3 text-p"
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 form-check d-flex align-items-center gap-2">
        <input
          type="checkbox"
          className="form-check-input m-0"
          id="rememberMe"
        />
        <label
          className="form-check-label text-des text-muted mt-1"
          htmlFor="rememberMe"
        >
          Ghi nhớ đăng nhập
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-auth-submit w-100 py-3 fw-medium text-white rounded-3 mb-3"
      >
        Đăng Nhập
      </button>
    </form>
  );
}
