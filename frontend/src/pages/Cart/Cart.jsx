import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItemRow from "../../components/cart/CartItemRow";
import CartTotals from "../../components/cart/CartTotals";
import "../../styles/layouts/cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, loading, updateCartItem, removeFromCart, clearCart, totalPrice, totalQuantity } = useCart();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 min-vh-50">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper container py-5">
      <h2 className="fw-bold text-dark mb-4">Giỏ Hàng Của Bạn</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-wrapper text-center py-5 bg-white rounded-4 shadow-sm border p-5">
          <div className="mb-3 text-muted">
            <i className="fa-solid fa-cart-flatbed fs-1"></i>
          </div>
          <h4 className="fw-bold text-dark mb-2">Giỏ hàng đang trống</h4>
          <p className="text-muted mb-4 fs-7">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
          <button
            type="button"
            className="btn btn-success px-4 py-2 fw-bold rounded-3"
            onClick={() => navigate("/shop")}
            style={{ backgroundColor: "#006837" }}
          >
            Khám Phá Sản Phẩm Ngay
          </button>
        </div>
      ) : (
        <div className="row g-4">
          <main className="col-lg-8">
            <div className="bg-white rounded-4 p-4 shadow-sm border">
              <div className="cart-header d-none d-md-flex row fw-bold text-muted border-bottom pb-3 fs-7">
                <div className="col-md-5">Sản phẩm</div>
                <div className="col-md-3 text-center">Số lượng</div>
                <div className="col-md-2 text-center">Thành tiền</div>
                <div className="col-md-2 text-end">Thao tác</div>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateCartItem}
                    onRemoveItem={removeFromCart}
                  />
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm rounded-2 px-3 fw-medium"
                  onClick={clearCart}
                >
                  <i className="fa-solid fa-trash-arrow-up me-1"></i> Xóa Tất Cả
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm rounded-2 px-3 fw-medium"
                  onClick={() => navigate("/shop")}
                >
                  <i className="fa-solid fa-arrow-left me-1"></i> Tiếp Tục Mua Sắm
                </button>
              </div>
            </div>
          </main>

          <aside className="col-lg-4">
            <CartTotals subtotal={totalPrice} itemsCount={totalQuantity} />
          </aside>
        </div>
      )}
    </div>
  );
}