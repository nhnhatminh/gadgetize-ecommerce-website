import React, { useState } from "react";
import "../styles/layouts/cart.css";

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
                    <div
                      className="cart-item d-flex flex-wrap align-items-center py-4 border-bottom position-relative"
                      key={item.id}
                    >
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
                          <h6 className="fw-bold mb-1 text-dark">
                            {item.name}
                          </h6>
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
                            onClick={() =>
                              handleQuantityChange(item.id, "decrease")
                            }
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
                            onClick={() =>
                              handleQuantityChange(item.id, "increase")
                            }
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
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
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
            <div className="cart-totals-wrapper bg-white rounded-4 p-4 p-lg-5 shadow-sm">
              <div
                className="free-shipping-notice border-top border-2 pt-3 position-relative mb-4"
                style={{ borderTopColor: "var(--primary-color)" }}
              >
                <div
                  className="shipping-icon position-absolute top-0 end-0 translate-middle-y text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    width: "24px",
                    height: "24px",
                    fontSize: "10px",
                  }}
                >
                  <i className="fa-solid fa-truck"></i>
                </div>
                <p className="mb-0 fw-medium">
                  Chúc mừng! Bạn Đã Được{" "}
                  <span
                    class="fw-bold"
                    style={{ color: "var(--primary-color)" }}
                  >
                    Miễn Phí Vận Chuyển!
                  </span>
                </p>
              </div>

              <h4 className="fw-bold mb-4">Tổng Giỏ Hàng</h4>

              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                <span className="text-dark">Tạm Tính</span>
                <span className="fw-bold text-dark fs-5">
                  {subtotal.toLocaleString("vi-VN")}₫
                </span>
              </div>

              <h5 className="fw-semibold mb-3 fs-6">
                Ước Tính Phí Vận Chuyển:
              </h5>
              <form className="shipping-calculator-form mb-4 border-bottom pb-4">
                <div className="mb-3">
                  <label className="form-label text-dark mb-1 fs-7">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    className="form-select text-muted fs-7 py-2"
                    value={shipping.province}
                    onChange={(e) =>
                      setShipping({ ...shipping, province: e.target.value })
                    }
                  >
                    <option value="">Chọn Thành phố, Tỉnh</option>
                    <option value="hcm">Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-dark mb-1 fs-7">
                    Quận / Huyện
                  </label>
                  <select
                    className="form-select text-muted fs-7 py-2"
                    value={shipping.district}
                    onChange={(e) =>
                      setShipping({ ...shipping, district: e.target.value })
                    }
                  >
                    <option value="">Chọn Quận, Huyện</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-dark mb-1 fs-7">
                    Phường / Xã
                  </label>
                  <select
                    className="form-select text-muted fs-7 py-2"
                    value={shipping.ward}
                    onChange={(e) =>
                      setShipping({ ...shipping, ward: e.target.value })
                    }
                  >
                    <option value="">Chọn Phường, Xã</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label text-dark mb-1 fs-7">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    className="form-control fs-7 py-2"
                    placeholder="Nhập địa chỉ"
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary-custom w-100 py-2 rounded-3 fw-medium text-white"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    borderColor: "var(--primary-color)",
                  }}
                >
                  Tính Phí Vận Chuyển
                </button>
              </form>

              <div className="discount-code-block mb-4 border-bottom pb-4">
                <h5 className="fw-semibold mb-1 fs-6">Mã Giảm Giá</h5>
                <p
                  className="text-des text-muted mb-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  Mã giảm giá sẽ được áp dụng ở trang thanh toán.
                </p>
                <input
                  type="text"
                  className="form-control fs-7 py-2 mb-3"
                  placeholder="Nhập mã giảm giá"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />

                <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
                  <span className="text-dark">Bạn tiết kiệm tổng cộng</span>
                  <span className="fw-bold text-dark">
                    {savings.toLocaleString("vi-VN")}₫
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="text-dark">Tổng Đơn Hàng</span>
                  <span className="fw-bold text-dark fs-5">
                    {finalTotal.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>

              <div className="checkout-block">
                <p
                  className="text-des text-muted mb-3"
                  style={{ fontSize: "0.75rem" }}
                >
                  Thuế và phí vận chuyển sẽ được tính tại trang thanh toán
                </p>
                <div className="form-check mb-3 d-flex align-items-center gap-2">
                  <input
                    className="form-check-input rounded-1 m-0"
                    type="checkbox"
                    id="termsCheck"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                  />
                  <label
                    className="form-check-label text-muted mt-1"
                    htmlFor="termsCheck"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Tôi đồng ý với{" "}
                    <a
                      href="#"
                      className="text-dark fw-medium text-decoration-none"
                    >
                      Các Điều Khoản & Điều Kiện
                    </a>
                  </label>
                </div>
                <button
                  type="button"
                  className={`btn w-100 py-2 rounded-3 fw-medium transition ${isAgreed && items.length > 0 ? "btn-success text-white" : "btn-outline-secondary text-dark"}`}
                  disabled={!isAgreed || items.length === 0}
                  onClick={() => navigate("checkout")}
                >
                  Thanh Toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
