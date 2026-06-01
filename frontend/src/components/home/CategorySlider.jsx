import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "../../styles/layouts/home.css";
import "../../styles/components/hero.css";
import "../../styles/components/showcase.css";

import "swiper/css";
import "swiper/css/navigation";

export default function CategorySlider() {
  const categories = [
    { id: 1, name: "Laptop", count: "10 +", image: "/images/cate-1.png" },
    {
      id: 2,
      name: "Tai nghe không dây",
      count: "10 +",
      image: "/images/cate-2.png",
    },
    { id: 3, name: "Bàn phím", count: "10 +", image: "/images/cate-3.png" },
    {
      id: 4,
      name: "TV & Màn hình LCD",
      count: "10 +",
      image: "/images/cate-4.png",
    },
    { id: 5, name: "Chuột Gaming", count: "10 +", image: "/images/cate-5.png" },
    { id: 6, name: "Điện Thoại", count: "10 +", image: "/images/cate-6.png" },
    {
      id: 7,
      name: "Tai nghe có dây",
      count: "10 +",
      image: "/images/cate-7.png",
    },
    {
      id: 8,
      name: "Tay cầm chơi game",
      count: "10 +",
      image: "/images/cate-8.png",
    },
  ];

  return (
    <div className="container category-container mb-5">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={24}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 6 },
          1400: { slidesPerView: 8 },
        }}
        className="category-swiper"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div className="category-item text-center">
              <div
                className="grey-bg rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#f5f5f7",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="img-fluid"
                  style={{ maxWidth: "60%" }}
                />
              </div>
              <div className="category-label">
                <h6 className="fw-semibold mb-0 text-dark fs-7">{cat.name}</h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                  {cat.count} Sản phẩm
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
