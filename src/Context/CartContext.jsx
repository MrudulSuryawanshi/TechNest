import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Auth/AuthProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${user.id}`,
          );

          const cartItems = response.data.cart || [];

          const productsResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/products`,
          );

          const products = productsResponse.data;

          const fullCart = cartItems
            .map((item) => {
              const product = products.find((p) => p.id === item.productId);

              if (!product) return null;

              return {
                ...product,
                quantity: item.quantity,
              };
            })
            .filter(Boolean);

          setCart(fullCart);
        } catch (error) {
          console.log(error);
        }
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

        setCart(guestCart);
      }
    };

    loadCart();
  }, [user]);

  const saveCart = async (updatedCart) => {
    if (user) {
      try {
        const cartToSave = updatedCart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        }));

        await axios.patch(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
          cart: cartToSave,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        if (existingProduct.quantity >= product.stock) {
          // Show snackbar here
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity < item.stock ? item.quantity + 1 : item.quantity,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = async (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const clearCart = async () => {
    setCart([]);
    await saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
