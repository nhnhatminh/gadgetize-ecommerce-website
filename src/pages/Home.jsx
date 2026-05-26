import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductCard from "../components/common/ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/layouts/home.css";
import "../styles/components/hero.css";
import "../styles/components/showcase.css";

export default function Home({ navigate }) {
  const [activeTab, setActiveTab] = useState("all");
  const [activePopularTab, setActivePopularTab] = useState("all");

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

  const products = [
    {
      id: 1,
      category: "headphone",
      discount: 20,
      image: "/images/pr-1.png",
      name: "Tai Nghe Razer Electra",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 1,
      oldPrice: 1500000,
      newPrice: 1200000,
    },
    {
      id: 2,
      category: "mouse",
      discount: 2,
      image: "/images/pr-2.png",
      name: "Chuột Hyper Glide",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 1,
      oldPrice: 2500000,
      newPrice: 2450000,
    },
    {
      id: 3,
      category: "keyboard",
      discount: 9,
      image: "/images/pr-3.png",
      name: "Màn Hình LCD Radiant View",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
      rating: 5,
      reviews: 1,
      oldPrice: 24500000,
      newPrice: 22500000,
    },
    {
      id: 4,
      category: "laptop",
      discount: 15,
      image: "/images/pr-4.png",
      name: "Laptop Gaming Nitro 5",
      description:
        "Sản phẩm laptop cấu hình cao dành riêng cho giới game thủ chuyên nghiệp.",
      rating: 5,
      reviews: 5,
      oldPrice: 20000000,
      newPrice: 17000000,
    },
  ];

  const popularProducts = [
    {
      id: 5,
      name: "Tai Nghe Razer Electra",
      price: 1200000,
      oldPrice: 1500000,
      image: "/images/pr-1.png",
      discount: 20,
    },
    {
      id: 6,
      name: "Chuột Hyper Glide",
      price: 2450000,
      oldPrice: 2500000,
      image: "/images/pr-2.png",
      discount: 2,
    },
    {
      id: 7,
      name: "iTab Vision Pro",
      price: 8600000,
      oldPrice: 10000000,
      image: "/images/pr-4.png",
      discount: 14,
    },
    {
      id: 8,
      name: "iPhone 15 Pro Max",
      price: 32000000,
      oldPrice: 44000000,
      image: "/images/pr-5.png",
      discount: 27,
    },
    {
      id: 9,
      name: "Thiết Bị Âm Thanh",
      price: 1500000,
      oldPrice: 1800000,
      image: "/images/pr-6.png",
      discount: 20,
    },
    {
      id: 10,
      name: "Màn Hình LCD Phụ",
      price: 4950000,
      oldPrice: 5500000,
      image: "/images/pr-3.png",
      discount: 10,
    },
  ];

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <main className="bg-white">
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
                  <h6 className="fw-semibold mb-0 text-dark fs-7">
                    {cat.name}
                  </h6>
                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {cat.count} Sản phẩm
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <section
        className="showcase-section pb-5"
        style={{ backgroundColor: "var(--bg-main)", paddingTop: "50px" }}
      >
        <div className="container">
          <div class="row g-4">
            <div className="col-xl-3 col-lg-4 d-none d-lg-block">
              <div
                className="showcase-banner rounded-4 p-4 d-flex flex-column h-100 justify-content-between"
                style={{
                  backgroundImage: "url('/images/horizontal-banner.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "450px",
                }}
              >
                <div className="text-center">
                  <h4 className="showcase-banner-title fw-bold fs-5 text-dark bg-white d-inline-block px-3 py-1 rounded-pill shadow-sm">
                    Ưu Đãi Đặc Biệt
                  </h4>
                </div>
                <div className="text-center">
                  <h5 className="text-white fw-bold mb-2 fs-6">
                    Tay Cầm Điều Khiển
                    <br />
                    Aero Control Pro
                  </h5>
                  <p className="text-white fw-bold fs-4 mb-0">3.000.000₫</p>
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="d-flex flex-wrap justify-content-between align-items-center bg-white p-3 rounded-4 mb-4 shadow-sm gap-3">
                <h3 className="mb-0 fs-5 fw-bold ms-2 text-dark">
                  Sản Phẩm Nổi Bật
                </h3>
                <ul
                  className="nav nav-pills showcase-filter gap-1"
                  role="tablist"
                >
                  {["all", "laptop", "keyboard", "mouse", "headphone"].map(
                    (tab) => (
                      <li className="nav-item" key={tab}>
                        <button
                          className={`nav-link rounded-pill px-3 py-1 text-des fw-medium border-0 ${activeTab === tab ? "active bg-success text-white" : "text-muted bg-transparent"}`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab === "all"
                            ? "Tất Cả Sản Phẩm"
                            : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="row g-4">
                {filteredProducts.map((prod) => (
                  <div
                    className="col-xl-3 col-md-4 col-sm-6"
                    key={prod.id}
                    onClick={() => navigate("product-detail")}
                  >
                    <ProductCard product={prod} layoutMode="horizontal" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-grid-section py-5">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center bg-white p-3 rounded-4 mb-4 shadow-sm gap-3">
            <h3 className="mb-0 fs-5 fw-bold ms-2 text-dark">
              Sản Phẩm Phổ Biến
            </h3>
            <ul className="nav nav-pills showcase-filter gap-1" role="tablist">
              {["all", "laptop", "keyboard", "mouse", "headphone"].map(
                (tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link rounded-pill px-3 py-1 text-des fw-medium border-0 ${activePopularTab === tab ? "active bg-success text-white" : "text-muted bg-transparent"}`}
                      onClick={() => setActivePopularTab(tab)}
                    >
                      {tab === "all"
                        ? "Tất Cả"
                        : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="row g-4">
            {popularProducts.map((prod) => (
              <div
                className="col-xl-2 col-lg-3 col-md-4 col-sm-6"
                key={prod.id}
                onClick={() => navigate("product-detail")}
              >
                <div className="product-card bg-white rounded-4 p-3 position-relative border h-100 d-flex flex-column transition shadow-sm">
                  <span className="product-card-badge bg-danger text-white position-absolute top-0 start-0 m-3 px-2 py-0.5 rounded fs-8">
                    -{prod.discount}%
                  </span>
                  <div
                    className="product-card-img mb-3 text-center d-flex align-items-center justify-content-center"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="img-fluid"
                      style={{ maxHeight: "80%" }}
                    />
                  </div>
                  <h5 className="product-card-title text-center fs-7 fw-bold text-dark mb-2">
                    {prod.name}
                  </h5>
                  <div className="product-card-price d-flex flex-column align-items-center mb-3 gap-1 mt-auto">
                    <span className="old-price text-muted text-decoration-line-through fs-8">
                      {prod.oldPrice.toLocaleString("vi-VN")}₫
                    </span>
                    <span className="new-price text-dark fw-bold fs-6">
                      {prod.price.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  <button className="btn btn-outline-success w-100 rounded-3 fs-7 py-2">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="brands-section py-5 border-top bg-light">
        <div className="container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            loop={true}
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
    </main>
  );
}
