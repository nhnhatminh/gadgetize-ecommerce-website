import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../styles/components/hero.css";
import "swiper/css";

export default function BrandSlider() {
  const brandList = [1, 2, 3, 4, 5];

  return (
    <section className="brands-section">
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
          {brandList.map((num) => (
            <SwiperSlide key={num}>
              <div className="brand-card">
                <img
                  src={`/images/brand-${num}.png`}
                  alt={`Brand ${num}`}
                  className="brand-img"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}