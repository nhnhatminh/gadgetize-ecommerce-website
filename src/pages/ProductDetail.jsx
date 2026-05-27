import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductCard from "../components/common/ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/layouts/product_detail_page.css";
import "../styles/components/showcase.css";

export default function ProductDetail({ navigate }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("green");
  const [activeTab, setActiveTab] = useState("desc");

  const mainProduct = {
    name: "Tai Nghe Razer Electra",
    price: 300000,
    oldPrice: 375000,
    discount: 20,
    rating: 5,
    reviews: 1,
    description:
      "Lorem ipsum dolor sit amet consectetur. Est morbi cum bibendum id eleifend ultrices enim nec. Vitae morbi mus imperdiet tincidunt ultrices hendrerit. Lobortis donec massa fermentum aliquet sapien. Magna risus donec aliquam diam aliquet consectetur...",
    stock: 10,
    sku: "RZ-ELECTRA-01",
    category: "Tai Nghe Rảnh Tay, Trang Chủ",
    tags: "Phụ kiện, Earbuds, Thiết bị điện tử",
    images: [
      "/images/pr-1.png",
      "/images/pr-4.png",
      "/images/pr-9.png",
      "/images/cate-3.png",
      "/images/pr-3.png",
      "/images/pr-2.png",
      "/images/pr-5.png",
    ],
  };

  const [mainImage, setMainImage] = useState(mainProduct.images[0]);

  const relatedProducts = [
    {
      id: 1,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 2,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 3,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 4,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 5,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
    {
      id: 6,
      name: "Thiết Bị Âm Thanh Cao Cấp",
      newPrice: 1500000,
      oldPrice: 1200000,
      image: "/images/pr-1.png",
      discount: 20,
      rating: 5,
      reviews: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur. Fermentum malesuada iaculis aliquet nunc turpis.",
    },
  ];

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="product-detail-page-wrapper">
      <section
        className="page-banner position-relative py-5 overflow-hidden"
        style={{ backgroundColor: "var(--light-grey)" }}
      >
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{ minHeight: "180px" }}
          >
            <div className="col-12 text-center z-2">
              <h1 className="fw-bold text-dark mb-0">{mainProduct.name}</h1>
            </div>
            <img
              src="/images/breadcome-pr.png"
              alt="Tablet"
              className="position-absolute start-0 bottom-0 d-none d-lg-block w-auto h-100 p-3 z-1"
            />
            <img
              src="/images/pr-5.png"
              alt="Phones"
              className="position-absolute end-0 bottom-0 d-none d-lg-block w-auto h-100 p-3 z-1"
            />
          </div>
        </div>
      </section>

      <main className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="gallery-wrapper bg-white rounded-4 p-4 p-lg-5 h-100 d-flex flex-column">
                <div className="product-gallery-main flex-grow-1 d-flex align-items-center justify-content-center mb-4">
                  <img
                    src={mainImage}
                    alt={mainProduct.name}
                    className="img-fluid w-75"
                  />
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
                    {mainProduct.images.map((img, idx) => (
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
            </div>

            <div className="col-lg-6">
              <div className="product-info-wrapper bg-white rounded-4 p-4 p-lg-5 h-100">
                <h2 className="fw-bold mb-2">{mainProduct.name}</h2>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="stars text-danger fs-6">
                    {[...Array(mainProduct.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <span className="text-dark fs-7">
                    ({mainProduct.reviews} đánh giá)
                  </span>
                </div>

                <div className="price-block mb-3">
                  <h3 className="fw-bold mb-1">
                    {mainProduct.price.toLocaleString("vi-VN")}₫
                  </h3>
                  <p className="text-muted text-des mb-0">
                    Giảm giá: 7.500₫ ({mainProduct.discount}%){" "}
                    <span className="text-decoration-line-through">
                      {mainProduct.oldPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </p>
                </div>

                <p className="text-muted text-des mb-4">
                  {mainProduct.description}
                </p>

                <div className="color-selection mb-4">
                  <p className="fw-bold mb-2">
                    Màu sắc:{" "}
                    <span className="fw-normal">
                      {selectedColor === "green"
                        ? "Xanh Lá"
                        : selectedColor === "beige"
                          ? "Beige"
                          : "Đen"}
                    </span>
                  </p>
                  <div className="d-flex gap-2">
                    <label className="color-swatch-detail cursor-pointer">
                      <input
                        type="radio"
                        name="pd-color"
                        checked={selectedColor === "beige"}
                        onChange={() => setSelectedColor("beige")}
                      />
                      <span style={{ backgroundColor: "#f5f5dc" }}></span>
                    </label>
                    <label className="color-swatch-detail cursor-pointer">
                      <input
                        type="radio"
                        name="pd-color"
                        checked={selectedColor === "black"}
                        onChange={() => setSelectedColor("black")}
                      />
                      <span style={{ backgroundColor: "#111111" }}></span>
                    </label>
                    <label className="color-swatch-detail cursor-pointer">
                      <input
                        type="radio"
                        name="pd-color"
                        checked={selectedColor === "green"}
                        onChange={() => setSelectedColor("green")}
                      />
                      <span style={{ backgroundColor: "#008000" }}></span>
                    </label>
                  </div>
                </div>

                <div className="stock-progress mb-4 border-bottom pb-4">
                  <p className="text-des fw-medium mb-2">
                    Nhanh Lên! Chỉ Còn {mainProduct.stock} Sản Phẩm Trong Kho!
                  </p>
                  <div className="progress" style={{ height: "4px" }}>
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>

                <ul className="list-unstyled mb-4 text-des">
                  <li className="mb-2">
                    <span className="fw-bold me-2">Tình Trạng:</span>
                    <span className="badge bg-success px-2 py-1">Còn Hàng</span>
                  </li>
                  <li className="mb-2">
                    <span className="fw-bold me-2">Danh Mục:</span>{" "}
                    {mainProduct.category}
                  </li>
                  <li className="mb-2">
                    <span className="fw-bold me-2">Thẻ:</span>{" "}
                    {mainProduct.tags}
                  </li>
                </ul>

                <div className="product-actions border-top pt-4 mb-4">
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <div className="quantity-selector d-flex align-items-center border border-light-subtle rounded-3 overflow-hidden">
                      <button
                        className="btn btn-light border-0 rounded-0 px-3 py-2"
                        onClick={() => handleQuantityChange("decrease")}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control border-0 text-center fw-bold p-0 bg-transparent"
                        value={quantity}
                        readOnly
                        style={{ width: "40px" }}
                      />
                      <button
                        className="btn btn-light border-0 rounded-0 px-3 py-2"
                        onClick={() => handleQuantityChange("increase")}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <button className="btn btn-outline-success flex-grow-1 fw-bold rounded-3">
                      Thêm Vào Giỏ Hàng
                    </button>
                    <button className="btn btn-outline-secondary px-3 rounded-3">
                      <i className="fa-regular fa-heart"></i>
                    </button>
                    <button className="btn btn-outline-secondary px-3 rounded-3">
                      <i className="fa-solid fa-arrow-right-arrow-left"></i>
                    </button>
                  </div>
                  <button
                    className="btn btn-success w-100 py-3 fw-bold rounded-3"
                    onClick={() => navigate("cart")}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      borderColor: "var(--primary-color)",
                    }}
                  >
                    Mua Ngay
                  </button>
                </div>

                <div className="shipping-info text-des mb-4">
                  <div className="d-flex align-items-start gap-2 mb-2">
                    <i className="fa-solid fa-truck text-muted mt-1"></i>
                    <p className="mb-0 text-muted">
                      Dự Kiến Giao Hàng:{" "}
                      <span className="fw-bold text-dark">
                        01 Tháng 8 – 05 Tháng 8
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-start gap-2">
                    <i className="fa-solid fa-rotate-left text-muted mt-1"></i>
                    <p className="mb-0 text-muted">
                      Hoàn trả trong vòng 90 ngày kể từ ngày mua. Thuế không
                      được hoàn lại.
                    </p>
                  </div>
                </div>

                <div className="social-share d-flex align-items-center gap-2 border-top pt-3">
                  <span className="fw-bold text-dark fs-7">Chia sẻ:</span>
                  <a href="#" className="share-icon">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#" className="share-icon">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#" className="share-icon">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" className="share-icon">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="product-description-tabs bg-white rounded-4 p-4 p-lg-5 mb-5 shadow-sm">
                <ul
                  className="nav nav-tabs justify-content-center border-bottom mb-4"
                  role="tablist"
                >
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "desc" ? "active" : ""}`}
                      onClick={() => setActiveTab("desc")}
                      type="button"
                    >
                      Mô Tả
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "info" ? "active" : ""}`}
                      onClick={() => setActiveTab("info")}
                      type="button"
                    >
                      Thông Tin Bổ Sung
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                      onClick={() => setActiveTab("review")}
                      type="button"
                    >
                      Đánh Giá
                    </button>
                  </li>
                </ul>

                <div className="tab-content">
                  {activeTab === "desc" && (
                    <div className="tab-pane fade show active">
                      <h4 className="fw-bold mb-4">Mô Tả</h4>
                      <p className="text-muted text-des mb-4">
                        Lorem ipsum dolor sit amet consectetur. Est morbi cum
                        bibendum id eleifend ultrices enim nec. Vitae morbi mus
                        imperdiet tincidunt ultrices hendrerit. Lobortis donec
                        massa fermentum aliquet sapien. Magna risus donec
                        aliquam diam aliquet consectetur. Etiam accumsan ipsum
                        augue sed vitae. Tortor volutpat et dui in malesuada
                        euismod. Sociis aenean porttitor aliquet sit amet.
                      </p>
                      <p className="text-muted text-des mb-5">
                        Nibh nunc at eget netus dictumst aenean ultricies ligula
                        nunc. Morbi elit eu neque amet nulla posuere amet
                        dictum. Nisl viverra sagittis elit proin donec sed. Enim
                        ipsum at dolor nulla. Accumsan in commodo in facilisi ut
                        euismod imperdiet dui. Fringilla pellentesque
                        consectetur ac nibh diam morbi mattis iaculis.
                      </p>
                      <div className="text-center mb-5">
                        <div className="row g-4">
                          <div className="col-lg-6">
                            <img
                              src="/images/pr-5.png"
                              alt="Product Details"
                              className="img-fluid w-75 object-fit-contain"
                              style={{ maxHeight: "500px" }}
                            />
                          </div>
                          <div className="col-lg-6">
                            <img
                              src="/images/pr-6.png"
                              alt="Product Details"
                              className="img-fluid w-75 object-fit-contain"
                              style={{ maxHeight: "500px" }}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-muted text-des mb-4">
                        Lorem ipsum dolor sit amet consectetur. Est morbi cum
                        bibendum id eleifend ultrices enim nec. Vitae morbi mus
                        imperdiet tincidunt ultrices hendrerit. Lobortis donec
                        massa fermentum aliquet sapien. Magna risus donec
                        aliquam diam aliquet consectetur. Etiam accumsan ipsum
                        augue sed vitae. Tortor volutpat et dui in malesuada
                        euismod. Sociis aenean porttitor aliquet sit amet.
                      </p>
                      <p className="text-muted text-des mb-0">
                        Nibh nunc at eget netus dictumst aenean ultricies ligula
                        nunc. Morbi elit eu neque amet nulla posuere amet
                        dictum. Nisl viverra sagittis elit proin donec sed. Enim
                        ipsum at dolor nulla. Accumsan in commodo in facilisi ut
                        euismod imperdiet dui. Fringilla pellentesque
                        consectetur ac nibh diam morbi mattis iaculis.
                      </p>
                    </div>
                  )}
                  {activeTab === "info" && (
                    <div className="tab-pane fade show active">
                      <h4 className="fw-bold mb-4">Thông Tin Bổ Sung</h4>
                      <p className="text-muted text-des">
                        Nội dung thông tin bổ sung đang được cập nhật...
                      </p>
                    </div>
                  )}
                  {activeTab === "review" && (
                    <div className="tab-pane fade show active">
                      <h4 className="fw-bold mb-4">Đánh Giá Sản Phẩm</h4>
                      <p className="text-muted text-des">
                        Chưa có đánh giá nào cho sản phẩm này.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <div className="related-products-wrapper mb-5">
                <h4 className="fw-bold mb-4">Sản Phẩm Gợi Ý</h4>
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={24}
                  loop={true}
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
                    <SwiperSlide key={prod.id}>
                      <ProductCard product={prod} layoutMode="vertical" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
