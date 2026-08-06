import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "../common/ProductCard";
import "../../styles/layouts/product_detail_page.css";
import "../../styles/components/showcase.css";
import "swiper/css";
import "swiper/css/pagination";

export default function RelatedProducts({ relatedProducts, navigate }) {
  return (
    <div className="row mt-5">
      <div className="col-12">
        <div className="related-products-wrapper mb-5">
          <h4 className="fw-bold mb-4">Sản Phẩm Gợi Ý</h4>
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
                <ProductCard product={prod} layoutMode="vertical" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
