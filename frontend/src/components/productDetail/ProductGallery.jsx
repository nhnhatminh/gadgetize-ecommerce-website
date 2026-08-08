import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "../../styles/layouts/product_detail_page.css";
import "../../styles/components/showcase.css";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductGallery({
  images,
  mainImage,
  setMainImage,
  productName,
}) {
  return (
    <div className="gallery-wrapper bg-white rounded-4 p-4 p-lg-5 h-100 d-flex flex-column border border-light-subtle">
      <div
        className="product-gallery-main flex-grow-1 d-flex align-items-center justify-content-center mb-4 rounded-4 bg-light"
        style={{ minHeight: "400px", padding: "40px" }}
      >
        <img
          src={mainImage}
          alt={productName}
          className="img-fluid object-fit-contain"
          style={{ minHeight: "500px", maxWidth: "100%", width: "auto" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/no-image.png";
          }}
        />
      </div>

      <div className="product-gallery-thumbs mt-auto">
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
                className={`thumb-item cursor-pointer rounded-circle d-flex align-items-center justify-content-center mx-auto bg-light border ${
                  mainImage === img
                    ? "border-success border-2 shadow-sm"
                    : "border-light-subtle"
                }`}
                onClick={() => setMainImage(img)}
                style={{
                  width: "70px",
                  height: "70px",
                  padding: "10px",
                  transition: "all 0.2s ease",
                }}
              >
                <img
                  src={img}
                  alt="Thumb"
                  className="img-fluid object-fit-contain"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
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