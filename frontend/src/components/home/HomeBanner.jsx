import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "../../styles/layouts/home.css";
import "../../styles/components/hero.css";
import "../../styles/components/showcase.css";
import "swiper/css";
import "swiper/css/pagination";

export default function HomeBanner({ navigate }) {
  return (
    <div
      className="container"
      id="banner-container"
      style={{ paddingTop: "30px", marginBottom: "40px" }}
    >
      <div className="row g-4">
        <div className="col-lg-8 left-banner">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="main-banner-swiper rounded-4 overflow-hidden shadow-sm h-100"
          >
            <SwiperSlide className="position-relative">
              <img
                src="/images/slider-1.png"
                className="w-100 d-block"
                alt="Banner 1"
              />
              <div className="hero-carousel-caption">
                <p className="top-slider-label">HÀNG MỚI VỀ</p>
                <h3>
                  Màn Hình LCD{" "}
                  <span style={{ color: "var(--primary-color)" }}>4K</span>
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
            <SwiperSlide className="position-relative">
              <img
                src="/images/slider-2.png"
                className="w-100 d-block"
                alt="Banner 2"
              />
              <div className="hero-carousel-caption">
                <p className="top-slider-label">HÀNG MỚI VỀ</p>
                <h3>
                  Màn Hình LCD{" "}
                  <span style={{ color: "var(--primary-color)" }}>4K</span>
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

        <div className="col-lg-4 right-banner d-flex flex-column gap-4">
          <div className="hero-side-item rounded-4 overflow-hidden shadow-sm position-relative flex-grow-1">
            <img
              src="/images/sm-slider-1.png"
              className="w-100 h-100 object-fit-cover"
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
          <div className="hero-side-item rounded-4 overflow-hidden shadow-sm position-relative flex-grow-1">
            <img
              src="/images/sm-slider-2.png"
              className="w-100 h-100 object-fit-cover"
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
