import { useState, useEffect } from "react";
import "../../styles/layouts/cart.css";

export default function CartItemRow({ item, onQuantityChange, onRemoveItem }) {
  return (
    <div className="cart-item d-flex flex-wrap align-items-center py-4 border-bottom position-relative">
      <div className="col-12 col-md-5 d-flex align-items-center gap-3 mb-3 mb-md-0">
        <div
          className="cart-item-img bg-light rounded-3 p-2 d-flex align-items-center justify-content-center"
          style={{ width: "100px", height: "100px" }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="img-fluid object-fit-contain"
          />
        </div>
        <div className="cart-item-info">
          <h6 className="fw-bold mb-1 text-dark">{item.name}</h6>
          <p className="text-des mb-1">Màu: {item.color}</p>
          <p
            className="fw-bold text-dark mb-0"
            style={{ fontSize: "0.875rem" }}
          >
            Giá: {item.price.toLocaleString("vi-VN")}₫
          </p>
          <p
            className="text-muted text-decoration-line-through mb-0"
            style={{ fontSize: "0.75rem" }}
          >
            Giá gốc: {item.oldPrice.toLocaleString("vi-VN")}₫
          </p>
        </div>
      </div>

      <div className="col-6 col-md-3 d-flex justify-content-md-center">
        <div className="quantity-selector d-flex align-items-center border border-light-subtle rounded-3 overflow-hidden">
          <button
            className="btn btn-light border-0 rounded-0 px-3 py-1"
            onClick={() => onQuantityChange(item.id, "decrease")}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="text"
            className="form-control border-0 text-center fw-bold p-0 bg-transparent"
            value={String(item.quantity).padStart(2, "0")}
            readOnly
            style={{ width: "45px" }}
          />
          <button
            className="btn btn-light border-0 rounded-0 px-3 py-1"
            onClick={() => onQuantityChange(item.id, "increase")}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="col-6 col-md-2 text-md-center text-end fw-bold text-dark">
        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
      </div>

      <div className="col-12 col-md-2 text-end remove-btn-container">
        <button
          className="btn btn-remove text-white rounded-3"
          onClick={() => onRemoveItem(item.id)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}
