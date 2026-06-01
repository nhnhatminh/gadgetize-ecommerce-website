import React, { useState } from "react";
import CartItemRow from "../../components/cart/CartItemRow";
import CartTotals from "../../components/cart/CartTotals";
import "../../styles/layouts/cart.css";

export default function Cart({ navigate }) {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "iPad Standard Plus",
      color: "Đen",
      price: 2450000,
      oldPrice: 2475000,
      image: "/images/pr-4.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "iPad Standard Plus",
      color: "Đen",
      price: 2450000,
      oldPrice: 2475000,
      image: "/images/pr-4.png",
      quantity: 1,
    },
    {
      id: 3,
      name: "iPad Standard Plus",
      color: "Đen",
      price: 2450000,
      oldPrice: 2475000,
      image: "/images/pr-4.png",
      quantity: 1,
    },
  ]);
  const [note, setNote] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [shipping, setShipping] = useState({
    province: "",
    district: "",
    ward: "",
    address: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const handleQuantityChange = (id, type) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQty =
            type === "increase" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const savings = items.length > 0 ? 75000 : 0;
  const shippingFee = 0;
  const finalTotal = subtotal - savings + shippingFee;

  return (
    <div className="cart-page-wrapper py-5">
      <section
        className="page-banner position-relative py-5 overflow-hidden mb-5"
        style={{ backgroundColor: "var(--light-grey)" }}
      >
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{ minHeight: "180px" }}
          >
            <div className="col-12 text-center z-2">
              <h1 className="fw-bold text-dark mb-0">Giỏ Hàng</h1>
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

      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="cart-items-wrapper bg-white rounded-4 p-4 p-lg-5 shadow-sm mb-4">
              <div className="cart-header d-none d-md-flex align-items-center pb-3 border-bottom mb-4">
                <div className="col-5 fw-bold text-dark fs-6">Sản Phẩm</div>
                <div className="col-3 fw-bold text-dark fs-6 text-center">
                  Số Lượng
                </div>
                <div className="col-2 fw-bold text-dark fs-6 text-center">
                  Tạm Tính
                </div>
                <div className="col-2 fw-bold text-dark fs-6 text-end">Xóa</div>
              </div>

              <div className="cart-item-list">
                {items.length > 0 ? (
                  items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))
                ) : (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0 fs-6">
                      Giỏ hàng của bạn đang trống.
                    </p>
                  </div>
                )}
              </div>

              <div className="cart-actions d-flex flex-wrap justify-content-between mt-4 pt-2 gap-3">
                <button
                  className="btn btn-cart-action fw-bold px-4 py-2 rounded-3 text-white"
                  onClick={() => navigate("products")}
                >
                  Tiếp Tục Mua Sắm
                </button>
                <button
                  className="btn btn-cart-action fw-bold px-4 py-2 rounded-3 text-white"
                  disabled={items.length === 0}
                >
                  Cập Nhật Giỏ Hàng
                </button>
              </div>
            </div>

            <div className="cart-note-wrapper mt-4">
              <h5 className="fw-bold mb-3 text-dark">
                Thêm Ghi Chú Cho Đơn Hàng
              </h5>
              <textarea
                className="form-control bg-white border-0 rounded-4 p-4 shadow-sm"
                rows="5"
                placeholder="Chúng tôi có thể hỗ trợ gì cho bạn?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="col-lg-4">
            <CartTotals
              subtotal={subtotal}
              savings={savings}
              finalTotal={finalTotal}
              shipping={shipping}
              setShipping={setShipping}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              isAgreed={isAgreed}
              setIsAgreed={setIsAgreed}
              itemsLength={items.length}
              navigate={navigate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
