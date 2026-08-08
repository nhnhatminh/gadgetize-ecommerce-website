import "../../styles/layouts/auth.css";

export default function SocialLogin() {
  return (
    <>
      <div className="social-divider-wrapper">
        <div className="social-divider-line"></div>
        <span className="social-divider-text">Hoặc kết nối qua</span>
      </div>

      <div className="social-buttons-group">
        <button type="button" className="btn-social-login">
          <i className="fa-brands fa-google google-icon"></i> Google
        </button>
        <button type="button" className="btn-social-login">
          <i className="fa-brands fa-facebook facebook-icon"></i> Facebook
        </button>
      </div>
    </>
  );
}