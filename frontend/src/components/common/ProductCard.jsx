import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/useAuth";
import "../../styles/components/product_card.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
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
      JSON.stringify(testPayload)
    );

    try {
      await addToCart(product.variantId, 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditProduct = (e) => {
    e.stopPropagation();
    navigate("/admin/products");
  };

  return (
    <div className="product-card">
      {product.discount > 0 && (
        <span className="product-discount-badge">
          -{product.discount}%
        </span>
      )}

      <div className="product-img-box">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/no-image.png";
          }}
        />
      </div>

      <div className="product-info-box">
        <h6 className="product-title">
          {product.name}
        </h6>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-rating-row">
          <div className="product-stars-group">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <span className="product-rating-count">({product.reviews} đánh giá)</span>
        </div>

        <div className="product-price-row">
          <span className="product-old-price">
            {product.oldPrice
              ? `${product.oldPrice.toLocaleString("vi-VN")}₫`
              : ""}
          </span>
          <span className="product-new-price">
            {product.newPrice
              ? `${product.newPrice.toLocaleString("vi-VN")}₫`
              : ""}
          </span>
        </div>

        {user?.role === "admin" ? (
          <button
            type="button"
            className="product-edit-btn"
            onClick={handleEditProduct}
          >
            <i className="fa-regular fa-pen-to-square"></i> Quản lý sản phẩm
          </button>
        ) : (
          <button
            type="button"
            className="product-add-cart-btn"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
          </button>
        )}
      </div>
    </div>
  );
}