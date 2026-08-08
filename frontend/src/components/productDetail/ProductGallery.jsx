import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "../../styles/layouts/product_detail_page.css";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductGallery({
  images,
  mainImage,
  setMainImage,
  productName,
}) {
  return (
    <div className="product-gallery-card">
      <div className="product-gallery-main-box">
        <img
          src={mainImage}
          alt={productName}
          className="product-gallery-main-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/no-image.png";
          }}
        />
      </div>

      <div className="product-gallery-thumbs-wrapper">
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={3}
          breakpoints={{
            576: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          }}
          className="thumbs-swiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`gallery-thumb-item ${
                  mainImage === img ? "gallery-thumb-item--active" : ""
                }`}
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt="Thumb"
                  className="gallery-thumb-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/no-image.png";
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}