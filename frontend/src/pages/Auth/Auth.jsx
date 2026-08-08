import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div
            className="auth-logo-box"
            onClick={() => navigate("/")}
          >
            <img
              src="/images/logo.png"
              alt="Gadgetize Logo"
              className="auth-logo"
            />
          </div>
          <p className="auth-subtitle">
            Hệ thống kết nối và mua sắm thiết bị công nghệ hàng đầu
          </p>
        </div>

        <ul className="auth-tabs-list" role="tablist">
          <li className="auth-tab-item">
            <button
              className={`auth-tab-button ${activeTab === "login" ? "auth-tab-button--active" : ""}`}
              type="button"
              onClick={() => setActiveTab("login")}
            >
              Đăng Nhập
            </button>
          </li>
          <li className="auth-tab-item">
            <button
              className={`auth-tab-button ${activeTab === "register" ? "auth-tab-button--active" : ""}`}
              type="button"
              onClick={() => setActiveTab("register")}
            >
              Đăng Ký
            </button>
          </li>
        </ul>

        <div className="auth-tab-content">
          {activeTab === "login" ? (
            <div className="auth-tab-pane">
              <LoginForm />
            </div>
          ) : (
            <div className="auth-tab-pane">
              <RegisterForm onRegisterSuccess={() => setActiveTab("login")} />
            </div>
          )}
        </div>

        <SocialLogin />
      </div>
    </div>
  );
}