import React from "react";
import "../../styles/layouts/auth.css";

export default function RegisterForm({
  registerForm,
  setRegisterForm,
  onSubmit,
}) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label className="form-label text-dark fw-medium">Họ</label>
          <input
            type="text"
            className="form-control py-3 text-p"
            placeholder="Nhập họ"
            value={registerForm.lastName}
            onChange={(e) =>
              setRegisterForm({
                ...registerForm,
                lastName: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label text-dark fw-medium">Tên</label>
          <input
            type="text"
            className="form-control py-3 text-p"
            placeholder="Nhập tên"
            value={registerForm.firstName}
            onChange={(e) =>
              setRegisterForm({
                ...registerForm,
                firstName: e.target.value,
              })
            }
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label text-dark fw-medium">Địa chỉ Email</label>
        <input
          type="email"
          className="form-control py-3 text-p"
          placeholder="example@domain.com"
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm({
              ...registerForm,
              email: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-dark fw-medium">Số điện thoại</label>
        <input
          type="text"
          className="form-control py-3 text-p"
          placeholder="Nhập số điện thoại"
          value={registerForm.phone}
          onChange={(e) =>
            setRegisterForm({
              ...registerForm,
              phone: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-dark fw-medium">Mật khẩu</label>
        <input
          type="password"
          className="form-control py-3 text-p"
          placeholder="Tối thiểu 6 ký tự"
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm({
              ...registerForm,
              password: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="mb-4 form-check d-flex align-items-center gap-2">
        <input
          type="checkbox"
          className="form-check-input m-0"
          id="agreeTerms"
          checked={registerForm.agreeTerms}
          onChange={(e) =>
            setRegisterForm({
              ...registerForm,
              agreeTerms: e.target.checked,
            })
          }
          required
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
      >
        Tạo Tài Khoản
      </button>
    </form>
  );
}
