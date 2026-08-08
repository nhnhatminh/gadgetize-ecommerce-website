import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "../common/ProductCard";
import "../../styles/layouts/product_detail_page.css";
import "swiper/css";
import "swiper/css/pagination";

export default function RelatedProducts({ relatedProducts, navigate }) {
  return (
    <div className="row related-products-row">
      <div className="col-12">
        <div className="related-products-card">
          <h4 className="related-products-title">Sản Phẩm Gợi Ý</h4>
          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            loop={false}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 2 },
              576: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
              1200: { slidesPerView: 6 },
            }}
            className="related-products-swiper"
          >
            {relatedProducts.map((prod) => (
              <SwiperSlide
                key={prod.id}
                onClick={() => navigate("product-detail", prod.slug)}
              >
                <ProductCard product={prod} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}