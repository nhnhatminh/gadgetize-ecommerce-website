import React, { useState } from "react";
import "../../styles/layouts/auth.css";

export default function Auth({ navigate }) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: false,
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate("home");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setActiveTab("login");
  };

  return (
    <div className="auth-page-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="auth-card bg-white rounded-4 shadow-sm border border-light-subtle p-4 p-sm-5 m-3">
        <div className="text-center mb-4">
          <div
            className="cursor-pointer d-inline-block mb-3"
            onClick={() => navigate("home")}
          >
            <img
              src="/images/logo.png"
              alt="Gadgetize Logo"
              className="auth-logo"
            />
          </div>
          <p className="text-muted text-des mb-0">
            Hệ thống kết nối và mua sắm thiết bị công nghệ hàng đầu
          </p>
        </div>

        <ul
          className="nav nav-tabs auth-tabs justify-content-center border-bottom mb-4"
          role="tablist"
        >
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "login" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab("login")}
            >
              Đăng Nhập
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "register" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab("register")}
            >
              Đăng Ký
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === "login" ? (
            <div className="tab-pane fade show active">
              <form className="auth-form" onSubmit={handleLoginSubmit}>
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
            </div>
          ) : (
            <div className="tab-pane fade show active">
              <form className="auth-form" onSubmit={handleRegisterSubmit}>
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
                    <label className="form-label text-dark fw-medium">
                      Tên
                    </label>
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
                  <label className="form-label text-dark fw-medium">
                    Địa chỉ Email
                  </label>
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
                  <label className="form-label text-dark fw-medium">
                    Số điện thoại
                  </label>
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
                  <label className="form-label text-dark fw-medium">
                    Mật khẩu
                  </label>
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
                    <a
                      href="#"
                      className="text-dark fw-medium text-decoration-none"
                    >
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
            </div>
          )}
        </div>

        <div className="position-relative d-flex align-items-center justify-content-center my-4">
          <div className="position-absolute border-top w-100 border-light-subtle"></div>
          <span className="position-relative bg-white px-3 text-muted text-des">
            Hoặc kết nối qua
          </span>
        </div>

        <div className="d-flex gap-3">
          <button
            type="button"
            className="btn btn-social-login w-50 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 text-dark fw-medium border"
          >
            <i className="fa-brands fa-google text-danger fs-5"></i> Google
          </button>
          <button
            type="button"
            className="btn btn-social-login w-50 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 text-dark fw-medium border"
          >
            <i className="fa-brands fa-facebook text-primary fs-5"></i> Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
