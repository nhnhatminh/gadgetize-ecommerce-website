import { createContext, useState, useEffect, useContext } from "react";
import { cartApi } from "../api/cartApi";
import { useAuth } from "./useAuth";
import "../styles/layouts/cart.css";

const CartContext = createContext();

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

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const fetchCart = async () => {
    if (!user) return;
    try {
      const data = await cartApi.getCart();
      setCartItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

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
        <div className="app-toast-container">
          <div className={`app-toast app-toast--${toast.type}`}>
            <div className="app-toast-content">
              <div className="app-toast-body">{toast.message}</div>
              <button
                type="button"
                className="app-toast-close"
                onClick={() => setToast({ ...toast, show: false })}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};