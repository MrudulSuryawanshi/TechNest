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
            `${import.meta.env.VITE_API_URL}/users/${user.id}`
          );

          const cartItems = response.data.cart || [];

          const productsResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/products`
          );

          const products = productsResponse.data;

          const fullCart = cartItems
            .map((item) => {
              const product = products.find(
                (p) => p.id === item.productId
              );

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
        const guestCart =
          JSON.parse(localStorage.getItem("guestCart")) || [];

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

                await axios.patch(
                  `${import.meta.env.VITE_API_URL}/users/${user.id}`,
                  {
                    cart: cartToSave,
                  }
                );
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  const addToCart = async (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const increaseQuantity = async (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const decreaseQuantity = async (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);