import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "../../styles/components/hero.css";
import "swiper/css";
import "swiper/css/pagination";

export default function HomeBanner({ navigate }) {
  return (
    <div className="container home-banner-container">
      <div className="row g-4">
        <div className="col-lg-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            loop={false}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="main-banner-swiper"
          >
            <SwiperSlide className="main-banner-slide">
              <img
                src="/images/slider-1.png"
                className="main-banner-image"
                alt="Banner 1"
              />
              <div className="hero-carousel-caption">
                <p className="top-slider-label">HÀNG MỚI VỀ</p>
                <h3 className="slider-title">
                  Màn Hình LCD{" "}
                  <span className="slider-title-highlight">4K</span>
                  <br />
                  Quantum Vision
                </h3>
                <p className="bottom-slider-label">
                  Ưu đãi có hạn: Chỉ bán trực tuyến
                </p>
                <button
                  className="btn-shop-now"
                  onClick={() => navigate("products")}
                >
                  Mua Ngay
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide className="main-banner-slide">
              <img
                src="/images/slider-2.png"
                className="main-banner-image"
                alt="Banner 2"
              />
              <div className="hero-carousel-caption">
                <p className="top-slider-label">HÀNG MỚI VỀ</p>
                <h3 className="slider-title">
                  Màn Hình LCD{" "}
                  <span className="slider-title-highlight">4K</span>
                  <br />
                  Ultra Bright
                </h3>
                <p className="bottom-slider-label">
                  Ưu đãi có hạn: Chỉ bán trực tuyến
                </p>
                <button
                  className="btn-shop-now"
                  onClick={() => navigate("products")}
                >
                  Mua Ngay
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="col-lg-4 home-banner-sidebar">
          <div className="hero-side-item">
            <img
              src="/images/sm-slider-1.png"
              className="hero-side-image"
              alt="Side Banner 1"
            />
            <div className="hero-side-caption">
              <h3>
                Điện Thoại
                <br />
                Nexus Mobile Pro 256GB
              </h3>
              <p>Ưu Đãi Có Hạn: Chỉ Bán Trực Tuyến!</p>
            </div>
          </div>

          <div className="hero-side-item">
            <img
              src="/images/sm-slider-2.png"
              className="hero-side-image"
              alt="Side Banner 2"
            />
            <div className="hero-side-caption">
              <h3>
                iPad Mini
                <br />
                iPad Mini Pro 10 Inch
              </h3>
              <p>Ưu Đãi Có Hạn: Chỉ Bán Trực Tuyến!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}