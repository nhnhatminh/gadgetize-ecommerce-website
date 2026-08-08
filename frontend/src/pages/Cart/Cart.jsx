import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItemRow from "../../components/cart/CartItemRow";
import CartTotals from "../../components/cart/CartTotals";
import ShippingCalculator from "../../components/cart/ShippingCalculator";
import OrderNote from "../../components/cart/OrderNote";
import "../../styles/layouts/cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, loading, updateCartItem, removeFromCart, clearCart, totalPrice, totalQuantity } = useCart();

  if (loading) {
    return (
      <div className="cart-loading-screen">
        <div className="cart-loading-spinner" role="status">
          <span className="cart-loading-text">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="container cart-page-container">
        <h2 className="cart-page-heading">Giỏ Hàng Của Bạn</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart-card">
            <div className="empty-cart-icon">
              <i className="fa-solid fa-cart-flatbed"></i>
            </div>
            <h4 className="empty-cart-title">Giỏ hàng đang trống</h4>
            <p className="empty-cart-subtitle">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
            <button
              type="button"
              className="empty-cart-explore-btn"
              onClick={() => navigate("/shop")}
            >
              Khám Phá Sản Phẩm Ngay
            </button>
          </div>
        ) : (
          <div className="row g-4">
            <main className="col-lg-8">
              <div className="cart-items-card">
                <div className="cart-table-header d-none d-md-flex row">
                  <div className="col-md-5">Sản phẩm</div>
                  <div className="col-md-3 header-center">Số lượng</div>
                  <div className="col-md-2 header-center">Thành tiền</div>
                  <div className="col-md-2 header-end">Thao tác</div>
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

                <div className="cart-actions-toolbar">
                  <button
                    type="button"
                    className="cart-clear-all-btn"
                    onClick={clearCart}
                  >
                    <i className="fa-solid fa-trash-arrow-up"></i> Xóa Tất Cả
                  </button>
                  <button
                    type="button"
                    className="cart-continue-shopping-btn"
                    onClick={() => navigate("/shop")}
                  >
                    <i className="fa-solid fa-arrow-left"></i> Tiếp Tục Mua Sắm
                  </button>
                </div>
              </div>

              <div className="row g-4 cart-extra-tools-row">
                <div className="col-md-6">
                  <OrderNote />
                </div>
                <div className="col-md-6">
                  <ShippingCalculator />
                </div>
              </div>
            </main>

            <aside className="col-lg-4">
              <CartTotals subtotal={totalPrice} itemsCount={totalQuantity} />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}