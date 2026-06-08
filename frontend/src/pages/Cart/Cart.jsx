import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../../styles/layouts/cart.css";

export default function Cart({ navigate }) {
  const { cartItems, loading, updateCartItem, removeFromCart, clearCart } =
    useContext(CartContext);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.final_unit_price) * item.quantity,
      0,
    );
  };

  if (loading) {
    return (
      <div className="cart-loading-container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted mt-2">Loading your shopping cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper container py-5">
      <h1 className="fw-bold text-dark mb-4">Giỏ Hàng Của Bạn</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-wrapper text-center py-5">
          <p className="text-muted fs-5">Giỏ hàng của bạn đang trống.</p>
          <button
            className="btn btn-primary px-4 py-2 mt-2"
            onClick={() => navigate("shop")}
          >
            Tiếp Tục Mua Sắm
          </button>
        </div>
      ) : (
        <div className="row g-4">
          <main className="col-lg-8">
            <div className="table-responsive">
              <table className="table cart-table align-middle">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.image_url || "/images/no-image.png"}
                            alt={item.name}
                            className="cart-item-imgimg"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <h5 className="mb-1 text-dark fw-semibold">
                              {item.name}
                            </h5>
                            <p className="mb-0 text-muted small">
                              Color: {item.color_name} | SKU: {item.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">
                          {parseFloat(item.final_unit_price).toLocaleString()}{" "}
                          VND
                        </span>
                      </td>
                      <td>
                        <div
                          className="input-group input-group-sm cart-qty-selector"
                          style={{ width: "100px" }}
                        >
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              updateCartItem(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              updateCartItem(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <span className="text-primary fw-bold">
                          {(
                            parseFloat(item.final_unit_price) * item.quantity
                          ).toLocaleString()}{" "}
                          VND
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Xóa Toàn Bộ Giỏ Hàng
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("shop")}
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          </main>

          <aside className="col-lg-4">
            <div className="cart-summary-box p-4 border rounded bg-light">
              <h3 className="fw-bold mb-4">Tóm tắt đơn hàng</h3>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                <span className="text-muted">Tạm tính:</span>
                <span className="text-dark fw-semibold">
                  {calculateSubtotal().toLocaleString()} VND
                </span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Vận chuyển:</span>
                <span className="text-success fw-medium">Miễn phí</span>
              </div>
              <div className="d-flex justify-content-between mb-4 pt-2 border-top">
                <span className="fs-5 fw-bold">Tổng cộng:</span>
                <span className="fs-5 fw-bold text-primary">
                  {calculateSubtotal().toLocaleString()} VND
                </span>
              </div>
              <button
                className="btn btn-primary w-100 py-3 fw-bold"
                onClick={() => navigate("checkout")}
              >
                Tiến Hành Thanh Toán
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
