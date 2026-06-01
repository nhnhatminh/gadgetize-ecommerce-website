import React from "react";
import "../../styles/layouts/home.css";
import "../../styles/components/footer.css";

export default function Footer({ navigate }) {
  return (
    <footer className="site-footer bg-white border-top mt-5">
      <div className="footer-services border-bottom py-5">
        <div class="container">
          <div class="row g-4 justify-content-center text-center">
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div class="service-item">
                <img src="/images/service-1.png" alt="Service 1" class="mb-3" />
                <h6 class="fw-bold mb-1">Đổi Trả Dễ Dàng</h6>
                <p class="text-muted text-des mb-0">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div class="service-item">
                <img src="/images/service-2.png" alt="Service 2" class="mb-3" />
                <h6 class="fw-bold mb-1">Đổi Trả Dễ Dàng</h6>
                <p class="text-muted text-des mb-0">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div class="service-item">
                <img src="/images/service-3.png" alt="Service 3" class="mb-3" />
                <h6 class="fw-bold mb-1">Đổi Trả Dễ Dàng</h6>
                <p class="text-muted text-des mb-0">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div class="service-item">
                <img src="/images/service-4.png" alt="Service 4" class="mb-3" />
                <h6 class="fw-bold mb-1">Đổi Trả Dễ Dàng</h6>
                <p class="text-muted text-des mb-0">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div class="service-item">
                <img src="/images/service-5.png" alt="Service 5" class="mb-3" />
                <h6 class="fw-bold mb-1">Đổi Trả Dễ Dàng</h6>
                <p class="text-muted text-des mb-0">Từ nhà bán uy tín</p>
              </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6">
              <div class="service-item">
                <img src="/images/service-6.png" alt="Service 6" class="mb-3" />
                <h6 class="fw-bold mb-1">Đổi Trả Dễ Dàng</h6>
                <p class="text-muted text-des mb-0">Từ nhà bán uy tín</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div
                className="d-block mb-4 cursor-pointer"
                onClick={() => navigate("home")}
              >
                <img src="/images/logo.png" alt="Gadgetize Logo" />
              </div>
              <p className="text-muted mb-4 pe-lg-3">
                Lorem ipsum dolor sit amet consectetur. Eu dolor faucibus sit
                fames elit ac. Hendrerit ultrices morbi faucibus.
              </p>
              <h6 className="fw-bold mb-3">Kết Nối Với Chúng Tôi!</h6>
              <div className="social-icons d-flex gap-2">
                <a href="#" className="social-link">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6">
              <h5 className="footer-title fw-bold mb-4 fs-6">Tìm Kiếm Nhanh</h5>
              <ul className="footer-links">
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Laptop & Máy Tính
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Máy Ảnh & Thiết Bị Chụp Hình
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Smartphone & Máy Tính Bảng
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    TV & Âm Thanh
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Đồ Điện Tử Gia Dụng
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Tai Nghe & Loa
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6">
              <h5 className="footer-title fw-bold mb-4 fs-6">Liên Kết Nhanh</h5>
              <ul className="footer-links">
                <li>
                  <span
                    className="cursor-pointer text-muted text-des"
                    onClick={() => navigate("home")}
                  >
                    Trang Chủ
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Về Chúng Tôi
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Mua Ngay
                  </span>
                </li>
                <li>
                  <span
                    className="cursor-pointer text-muted text-des"
                    onClick={() => navigate("auth")}
                  >
                    Đăng Ký
                  </span>
                </li>
                <li>
                  <span
                    className="cursor-pointer text-muted text-des"
                    onClick={() => navigate("auth")}
                  >
                    Đăng Nhập
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Chính Sách Bảo Mật
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl-2 col-lg-2 col-md-6">
              <h5 className="footer-title fw-bold mb-4 fs-6">
                Chăm Sóc Khách Hàng
              </h5>
              <ul className="footer-links">
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Tài Khoản Của Tôi
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Theo Dõi Đơn Hàng
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Sản Phẩm
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Dịch Vụ Khách Hàng
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Đổi Trả Hàng
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-muted text-des">
                    Câu Hỏi Thường Gặp
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-12">
              <div className="contact-info mb-4">
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="contact-icon text-success fs-5">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <p className="text-muted mb-0">Quận Bình Thạnh, TP HCM</p>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="contact-icon text-success fs-5">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <p className="text-muted mb-0">demo@info.com</p>
                </div>
              </div>

              <h5 className="footer-title fw-bold mb-3 fs-6 mt-4">
                Đăng Ký Nhận Bản Tin
              </h5>
              <form action="#" className="newsletter-form d-flex">
                <input
                  type="email"
                  className="form-control rounded-0 rounded-start"
                  placeholder="Địa chỉ email của bạn..."
                />
                <button
                  type="submit"
                  className="btn text-white rounded-0 rounded-end px-4 fw-medium"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom border-top py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="text-muted mb-0 text-des">
                &copy; 2026 Gadgetize. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="payment-methods d-flex gap-2 justify-content-center justify-content-md-end">
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
