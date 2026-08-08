import "../../styles/layouts/cart.css";

export default function CartItemRow({ item, onUpdateQuantity, onRemoveItem }) {
  const unitPrice = parseFloat(item.final_unit_price || 0);
  const oldPrice = parseFloat(item.base_price || 0);
  const isMaxStock = item.quantity >= (item.stock_quantity || 99);

  return (
    <div className="row cart-item-row">
      <div className="col-12 col-md-5 cart-item-info-col">
        <div className="cart-item-img-box">
          <img
            src={item.image_url || "/images/no-image.png"}
            alt={item.name}
            className="cart-item-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/no-image.png";
            }}
          />
        </div>

        <div className="cart-item-details">
          <h6 className="cart-item-title">{item.name}</h6>
          <p className="cart-item-meta">
            Màu: {item.color_name || "Mặc định"} | SKU: {item.sku}
          </p>

          <div className="cart-item-price-wrapper">
            <span className="cart-item-price-current">
              {unitPrice.toLocaleString("vi-VN")}₫
            </span>

            {oldPrice > unitPrice && (
              <span className="cart-item-price-old">
                {oldPrice.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="col-6 col-md-3 cart-item-quantity-col">
        <div className="cart-quantity-selector">
          <button
            type="button"
            className="cart-quantity-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="text"
            className="cart-quantity-input"
            value={item.quantity}
            readOnly
          />
          <button
            type="button"
            className="cart-quantity-btn"
            disabled={isMaxStock}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            title={isMaxStock ? "Đã đạt số lượng tồn kho tối đa" : ""}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="col-6 col-md-2 cart-item-subtotal-col">
        {(unitPrice * item.quantity).toLocaleString("vi-VN")}₫
      </div>

      <div className="col-12 col-md-2 cart-item-action-col">
        <button
          type="button"
          className="cart-remove-item-btn"
          onClick={() => onRemoveItem(item.id)}
        >
          <i className="fa-solid fa-trash-can"></i> Xóa
        </button>
      </div>
    </div>
  );
}