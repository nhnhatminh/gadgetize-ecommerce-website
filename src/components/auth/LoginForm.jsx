import React from "react";
import "../../styles/layouts/auth.css";

export default function LoginForm({ loginForm, setLoginForm, onSubmit }) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label text-dark fw-medium">
          Địa chỉ Email / Số điện thoại
        </label>
        <input
          type="text"
          className="form-control py-3 text-p"
          placeholder="Nhập email hoặc số điện thoại"
          value={loginForm.emailOrPhone}
          onChange={(e) =>
            setLoginForm({
              ...loginForm,
              emailOrPhone: e.target.value,
            })
          }
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
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
          required
        />
      </div>
      <div className="mb-4 form-check d-flex align-items-center gap-2">
        <input
          type="checkbox"
          className="form-check-input m-0"
          id="rememberMe"
          checked={loginForm.rememberMe}
          onChange={(e) =>
            setLoginForm({
              ...loginForm,
              rememberMe: e.target.checked,
            })
          }
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
