import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartElements, setCartElements] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // uef snippet
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartElements));
  }, [cartElements]);

  const updateCart = (newCart) => {
    setCartElements(newCart);
  };

  const addToCart = (item) => {
    const updatedCart = [...cartElements];
    // Check if the item is already in the cart
    const itemIndex = updatedCart.findIndex((el) => el.title === item.title);
    if (itemIndex !== -1) {
      // If the item exists, update its quantity
      updatedCart[itemIndex].quantity++;
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      updatedCart.push({ ...item, quantity: 1 });
    }
    setCartElements(updatedCart);
  };

  const removeFromCart = (index) => {
    // Create a new array without the item to remove
    const updatedCart = [...cartElements];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartElements];
    const item = updatedCart[index];
    if (item.quantity > 1) {
      item.quantity--; // Decrease the quantity by one
    } else {
      // If the quantity is 1, remove the entire element
      updatedCart.splice(index, 1);
    }
    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cartElements, addToCart, removeFromCart, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
