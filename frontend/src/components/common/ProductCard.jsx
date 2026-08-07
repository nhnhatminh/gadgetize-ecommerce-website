import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "../../styles/components/produc_card.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);

    const testPayload = {
      variantId: product.variantId,
      quantity: 1,
    };
    console.log(
      "Trigger AddToCart from ProductCard. Payload JSON:",
      JSON.stringify(testPayload),
    );

    try {
      await addToCart(product.variantId, 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card-custom h-100 d-flex flex-column bg-white rounded-4 p-3 border border-light-subtle position-relative cursor-pointer">
      {product.discount > 0 && (
        <span className="product-discount-badge position-absolute bg-danger text-white fs-8 fw-bold px-2 py-1 rounded-1 z-2">
          -{product.discount}%
        </span>
      )}

      <div className="product-img-box w-100 d-flex align-items-center justify-content-center rounded-3 p-3 mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid object-fit-contain"
          style={{ maxHeight: "120px" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/no-image.png";
          }}
        />
      </div>

      <div className="product-info-box d-flex flex-column flex-grow-1">
        <h6 className="product-title-green fw-bold mb-2 fs-7 text-center">
          {product.name}
        </h6>

        <p className="product-desc-clamp text-muted fs-8 mb-2 flex-grow-1">
          {product.description}
        </p>

        <div className="product-rating-row d-flex align-items-center justify-content-center gap-1 mb-2 fs-8 text-warning">
          <div className="stars-group d-flex gap-1">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <span className="text-muted fs-8">({product.reviews} đánh giá)</span>
        </div>

        <div className="product-price-row d-flex align-items-center justify-content-center gap-2 mb-3 fs-8">
          <span className="text-muted text-decoration-line-through">
            {product.oldPrice
              ? `${product.oldPrice.toLocaleString("vi-VN")}₫`
              : ""}
          </span>
          <span className="fw-bold text-dark">
            {product.newPrice
              ? `${product.newPrice.toLocaleString("vi-VN")}₫`
              : ""}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-outline-cart-custom w-100 py-2 fs-8 fw-medium rounded-2 mt-auto"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
        </button>
      </div>
    </div>
  );
}
