import React from "react";
import "../../styles/components/produc_card.css";

export default function ProductCard({ product, layoutMode = "horizontal" }) {
  const {
    discount,
    image,
    name,
    description,
    rating,
    reviews,
    oldPrice,
    newPrice,
  } = product;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`${i <= rating ? "fa-solid" : "fa-regular"} fa-star`}
        ></i>,
      );
    }
    return stars;
  };

  const priceContainerClass =
    layoutMode === "vertical"
      ? "product-card-price d-flex flex-column align-items-center mb-3 gap-1 mt-auto"
      : "product-card-price d-flex justify-content-center align-items-baseline mb-3 gap-2 mt-auto";

  return (
    <div className="product-card bg-white rounded-3 p-3 position-relative border h-100 d-flex flex-column">
      {discount && (
        <span className="product-card-badge bg-danger text-white position-absolute">
          -{discount}%
        </span>
      )}

      <div className="product-card-img mb-3">
        <img src={image} alt={name} className="img-fluid w-100" />
      </div>

      <h4 className="product-card-title text-center mb-2">{name}</h4>

      <p className="product-card-desc text-center mb-3">{description}</p>

      <div className="product-card-rating mb-2 d-flex justify-content-center align-items-center gap-2">
        <div className="stars">{renderStars()}</div>
        <span className="text-dark">({reviews} đánh giá)</span>
      </div>

      <div className={priceContainerClass}>
        {oldPrice && (
          <span className="old-price text-muted text-decoration-line-through">
            {oldPrice.toLocaleString("vi-VN")}₫
          </span>
        )}
        <span className="new-price text-dark">
          {(newPrice || 0).toLocaleString("vi-VN")}₫
        </span>
      </div>

      <button className="product-card-btn btn w-100 bg-transparent">
        Thêm vào giỏ hàng
      </button>
    </div>
  );
}
