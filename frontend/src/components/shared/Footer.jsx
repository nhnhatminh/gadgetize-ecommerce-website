import { useNavigate } from "react-router-dom";
import "../../styles/components/footer.css";

export default function Footer({ navigate: customNavigate }) {
  const defaultNavigate = useNavigate();

  const handleNavigate = (path) => {
    if (customNavigate) {
      customNavigate(path);
    } else {
      const targetPath = path === "home" ? "/" : path.startsWith("/") ? path : `/${path}`;
      defaultNavigate(targetPath);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-services">
        <div className="container">
          <div className="row footer-services-row">
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
                <img
                  src="/images/service-1.png"
                  alt="Service 1"
                  className="service-item-icon"
                />
                <h6 className="service-item-title">Đổi Trả Dễ Dàng</h6>
                <p className="service-item-description">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
                <img
                  src="/images/service-2.png"
                  alt="Service 2"
                  className="service-item-icon"
                />
                <h6 className="service-item-title">Đổi Trả Dễ Dàng</h6>
                <p className="service-item-description">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
                <img
                  src="/images/service-3.png"
                  alt="Service 3"
                  className="service-item-icon"
                />
                <h6 className="service-item-title">Đổi Trả Dễ Dàng</h6>
                <p className="service-item-description">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
                <img
                  src="/images/service-4.png"
                  alt="Service 4"
                  className="service-item-icon"
                />
                <h6 className="service-item-title">Đổi Trả Dễ Dàng</h6>
                <p className="service-item-description">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
                <img
                  src="/images/service-5.png"
                  alt="Service 5"
                  className="service-item-icon"
                />
                <h6 className="service-item-title">Đổi Trả Dễ Dàng</h6>
                <p className="service-item-description">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
                <img
                  src="/images/service-6.png"
                  alt="Service 6"
                  className="service-item-icon"
                />
                <h6 className="service-item-title">Đổi Trả Dễ Dàng</h6>
                <p className="service-item-description">Từ nhà bán uy tín</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="row footer-main-row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div
                className="footer-brand-logo"
                onClick={() => handleNavigate("home")}
              >
                <img src="/images/logo.png" alt="Gadgetize Logo" />
              </div>
              <p className="footer-brand-description">
                Lorem ipsum dolor sit amet consectetur. Eu dolor faucibus sit
                fames elit ac. Hendrerit ultrices morbi faucibus.
              </p>
              <h6 className="footer-social-heading">Kết Nối Với Chúng Tôi!</h6>
              <div className="footer-social-list">
                <a href="#" className="footer-social-link">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="footer-social-link">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="footer-social-link">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="footer-social-link">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6">
              <h5 className="footer-section-title">Tìm Kiếm Nhanh</h5>
              <ul className="footer-links-list">
                <li>
                  <span className="footer-link-item">
                    Laptop & Máy Tính
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Máy Ảnh & Thiết Bị Chụp Hình
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Smartphone & Máy Tính Bảng
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    TV & Âm Thanh
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Đồ Điện Tử Gia Dụng
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Tai Nghe & Loa
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6">
              <h5 className="footer-section-title">Liên Kết Nhanh</h5>
              <ul className="footer-links-list">
                <li>
                  <span
                    className="footer-link-item"
                    onClick={() => handleNavigate("home")}
                  >
                    Trang Chủ
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Về Chúng Tôi
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Mua Ngay
                  </span>
                </li>
                <li>
                  <span
                    className="footer-link-item"
                    onClick={() => handleNavigate("auth")}
                  >
                    Đăng Ký
                  </span>
                </li>
                <li>
                  <span
                    className="footer-link-item"
                    onClick={() => handleNavigate("auth")}
                  >
                    Đăng Nhập
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Chính Sách Bảo Mật
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6">
              <h5 className="footer-section-title">
                Chăm Sóc Khách Hàng
              </h5>
              <ul className="footer-links-list">
                <li>
                  <span className="footer-link-item">
                    Tài Khoản Của Tôi
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Theo Dõi Đơn Hàng
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Sản Phẩm
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Dịch Vụ Khách Hàng
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Đổi Trả Hàng
                  </span>
                </li>
                <li>
                  <span className="footer-link-item">
                    Câu Hỏi Thường Gặp
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-12">
              <div className="footer-contact-info">
                <div className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <p className="footer-contact-text">Quận Bình Thạnh, TP HCM</p>
                </div>
                <div className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <p className="footer-contact-text">demo@info.com</p>
                </div>
              </div>

              <h5 className="footer-section-title footer-section-title--newsletter">
                Đăng Ký Nhận Bản Tin
              </h5>
              <form action="#" className="footer-newsletter-form">
                <input
                  type="email"
                  className="footer-newsletter-input"
                  placeholder="Địa chỉ email của bạn..."
                />
                <button
                  type="submit"
                  className="footer-newsletter-button"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row footer-bottom-row">
            <div className="col-md-6 footer-copyright-col">
              <p className="footer-copyright-text">
                &copy; 2026 Gadgetize. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 footer-payment-col">
              <div className="footer-payment-methods">
                <img src="/images/payment-1.png" alt="Payment Method" />
                <img src="/images/payment-2.png" alt="Payment Method" />
                <img src="/images/payment-3.png" alt="Payment Method" />
                <img src="/images/payment-4.png" alt="Payment Method" />
                <img src="/images/payment-5.png" alt="Payment Method" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}