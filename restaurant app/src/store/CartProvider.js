import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, updateItems] = useState([]);
  // const addItemToCartHandler = (item) => {
  //   updateItems([...items, item]);
  //   console.log("inside addItemToCartHandler", cartContext);
  // };

  const addItemToCartHandler = (item) => {
    updateItems((prevItems) => {
      let updatedItems = [...prevItems];
      const existingItem = updatedItems.find((i) => i.id === item.id);

      if (existingItem) {
        // Item already exists in cart
        existingItem.quantity =
          Number(existingItem.quantity) + Number(item.quantity);
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // Item is new to the cart
        item.quantity = Number(item.quantity);
        item.totalPrice = item.price * item.quantity;
        updatedItems = [...updatedItems, item];
      }

      return updatedItems;
    });
  };

  const removeItemFromCartHandler = (id) => {
    updateItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItem = updatedItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          // Remove item from cart if quantity is zero
          return updatedItems.filter((item) => item.id !== id);
        } else {
          // Update total price for the item
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
      }
      return updatedItems;
    });
  };

  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    message: "😎",
  };

  return (
    <CartContext.Provider value={cartContext}>
      {console.log("Inside cartContext.provider", cartContext)}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
