import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../styles/layouts/home.css";
import "../../styles/components/hero.css";
import "../../styles/components/showcase.css";

import "swiper/css";

export default function BrandSlider() {
  return (
    <section className="brands-section py-5 border-top bg-light">
      <div className="container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={false}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          }}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <SwiperSlide key={num}>
              <div
                className="brand-item text-center p-3 bg-white rounded-3 border d-flex align-items-center justify-content-center"
                style={{ height: "80px" }}
              >
                <img
                  src={`/images/brand-${num}.png`}
                  alt={`Brand ${num}`}
                  className="img-fluid"
                  style={{ maxHeight: "70%" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
