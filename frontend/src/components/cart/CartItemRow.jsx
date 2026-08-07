import "../../styles/layouts/cart.css";

export default function CartItemRow({ item, onUpdateQuantity, onRemoveItem }) {
  const unitPrice = parseFloat(item.final_unit_price || 0);
  const oldPrice = parseFloat(item.base_price || 0);
  const isMaxStock = item.quantity >= (item.stock_quantity || 99);

  return (
    <div className="row align-items-center g-3 py-3 border-bottom">
      <div className="col-12 col-md-5 d-flex align-items-center gap-3">
        <div
          className="cart-item-img bg-light rounded-3 p-2 d-flex align-items-center justify-content-center border"
          style={{ width: "90px", height: "90px" }}
        >
          <img
            src={item.image_url || "/images/no-image.png"}
            alt={item.name}
            className="img-fluid object-fit-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/no-image.png";
            }}
          />
        </div>

        <div>
          <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
          <p className="text-muted small mb-1">
            Màu: {item.color_name || "Mặc định"} | SKU: {item.sku}
          </p>

          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold text-success">
              {unitPrice.toLocaleString("vi-VN")}₫
            </span>

            {oldPrice > unitPrice && (
              <span className="text-muted text-decoration-line-through small">
                {oldPrice.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="col-6 col-md-3 d-flex justify-content-md-center">
        <div className="quantity-selector d-flex align-items-center border border-light-subtle rounded-3 overflow-hidden bg-light">
          <button
            type="button"
            className="btn btn-light border-0 rounded-0 px-3 py-1"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <i className="fa-solid fa-minus fs-8"></i>
          </button>
          <input
            type="text"
            className="form-control border-0 text-center fw-bold p-0 bg-transparent text-dark"
            value={item.quantity}
            readOnly
            style={{ width: "40px", fontSize: "0.9rem" }}
          />
          <button
            type="button"
            className="btn btn-light border-0 rounded-0 px-3 py-1"
            disabled={isMaxStock}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            title={isMaxStock ? "Đã đạt số lượng tồn kho tối đa" : ""}
          >
            <i className="fa-solid fa-plus fs-8"></i>
          </button>
        </div>
      </div>

      <div className="col-6 col-md-2 text-md-center text-end fw-bold text-dark fs-6">
        {(unitPrice * item.quantity).toLocaleString("vi-VN")}₫
      </div>

      <div className="col-12 col-md-2 text-end remove-btn-container">
        <button
          type="button"
          className="btn btn-outline-danger btn-sm rounded-2 px-3"
          onClick={() => onRemoveItem(item.id)}
        >
          <i className="fa-solid fa-trash-can me-1"></i> Xóa
        </button>
      </div>
    </div>
  );
}