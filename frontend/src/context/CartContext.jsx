import { createContext, useState, useEffect, useContext } from "react";
import { cartApi } from "../api/cartApi";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await cartApi.getCart();
      setCartItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const addToCart = async (variantId, quantity) => {
    try {
      await cartApi.addToCart(variantId, quantity);
      await fetchCart();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateCartItem = async (id, quantity) => {
    try {
      await cartApi.updateCartItem(id, quantity);
      await fetchCart();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const removeFromCart = async (id) => {
    try {
      await cartApi.removeFromCart(id);
      await fetchCart();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCartItems([]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
