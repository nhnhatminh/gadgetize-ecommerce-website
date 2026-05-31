import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function ProductGallery({
  images,
  mainImage,
  setMainImage,
  productName,
}) {
  return (
    <div className="gallery-wrapper bg-white rounded-4 p-4 p-lg-5 h-100 d-flex flex-column">
      <div className="product-gallery-main flex-grow-1 d-flex align-items-center justify-content-center mb-4">
        <img src={mainImage} alt={productName} className="img-fluid w-75" />
      </div>

      <div className="product-gallery-thumbs mt-auto">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            576: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
            1400: { slidesPerView: 6 },
          }}
          className="thumbs-swiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`thumb-item cursor-pointer bg-light-grey rounded-circle d-flex align-items-center justify-content-center mx-auto p-3 ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt="Thumb" className="img-fluid" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
