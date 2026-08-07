import { createContext, useState, useEffect, useContext } from "react";
import { cartApi } from "../api/cartApi";
import { useAuth } from "./useAuth";

// Không export trực tiếp để tránh lỗi Fast Refresh
const CartContext = createContext();

// Custom hook truy cập CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Hiển thị Toast
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Tải giỏ hàng
  const fetchCart = async () => {
    if (!user) return;
    try {
      const data = await cartApi.getCart();
      setCartItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Đồng bộ giỏ hàng theo trạng thái đăng nhập
  useEffect(() => {
    let isMounted = true;

    const loadUserCart = async () => {
      if (!user) {
        setCartItems([]);
        return;
      }
      try {
        setLoading(true);
        const data = await cartApi.getCart();
        if (isMounted) {
          setCartItems(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching initial cart:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUserCart();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Thêm sản phẩm vào giỏ
  const addToCart = async (variantId, quantity = 1) => {
    if (!user) {
      showToast("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!", "warning");
      return { success: false, requireAuth: true };
    }

    try {
      await cartApi.addToCart(variantId, quantity);
      await fetchCart();
      showToast("Đã thêm sản phẩm vào giỏ hàng thành công!", "success");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Không thể thêm sản phẩm vào giỏ hàng.";
      showToast(message, "error");
      return { success: false, message };
    }
  };

  // Cập nhật số lượng
  const updateCartItem = async (id, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(id);
    }

    try {
      await cartApi.updateCartItem(id, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Không thể cập nhật số lượng.";
      showToast(message, "error");
      return { success: false, message };
    }
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = async (id) => {
    try {
      await cartApi.removeFromCart(id);
      await fetchCart();
      showToast("Đã xóa sản phẩm khỏi giỏ hàng.", "info");
      return { success: true };
    } catch (error) {
      console.error("Error removing cart item:", error);
      showToast("Không thể xóa sản phẩm.", "error");
      return { success: false };
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCartItems([]);
      return { success: true };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false };
    }
  };

  // Tính tổng số lượng và tổng tiền
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce((sum, item) => {
    const base = parseFloat(item.base_price || 0);
    const modifier = parseFloat(item.price_modifier || 0);
    const discount = parseFloat(item.discount_percent || 0);
    const itemUnitPrice = (base + modifier) * (1 - discount / 100);
    return sum + itemUnitPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        totalQuantity,
        totalPrice,
        toast,
        showToast,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}

      {toast.show && (
        <div
          className="position-fixed bottom-0 end-0 p-3 z-3"
          style={{ maxWidth: "380px" }}
        >
          <div
            className={`toast show align-items-center text-white border-0 p-2 rounded-3 shadow ${
              toast.type === "success"
                ? "bg-success"
                : toast.type === "warning"
                  ? "bg-warning text-dark"
                  : toast.type === "info"
                    ? "bg-info text-dark"
                    : "bg-danger"
            }`}
            role="alert"
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="toast-body fw-medium fs-7">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast({ ...toast, show: false })}
              ></button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};