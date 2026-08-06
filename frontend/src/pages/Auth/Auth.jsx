import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import SocialLogin from "../../components/auth/SocialLogin";
import "../../styles/layouts/auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // Chuyển về trang chủ nếu đã đăng nhập
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="auth-page-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="auth-card bg-white rounded-4 shadow-sm border border-light-subtle p-4 p-sm-5 m-3">
        <div className="text-center mb-4">
          <div
            className="cursor-pointer d-inline-block mb-3"
            onClick={() => navigate("/")}
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
              <LoginForm/>
            </div>
          ) : (
            <div className="tab-pane fade show active">
              <RegisterForm onRegisterSuccess={() => setActiveTab("login")} />
            </div>
          )}
        </div>

        <SocialLogin />
      </div>
    </div>
  );
}
