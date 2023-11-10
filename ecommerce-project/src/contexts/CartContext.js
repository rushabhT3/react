import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();
const crudCrudUrl = "https://crudcrud.com/api/573c89d7191c4c73977ee4f14fd51b73";

export const CartProvider = ({ children }) => {
  const [cartElements, setCartElements] = useState([]);

  const extractEmailFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64UrlEncodedPayload = token.split(".")[1];
      const base64DecodedPayload = atob(base64UrlEncodedPayload);
      const payloadJson = JSON.parse(base64DecodedPayload);
      return payloadJson.email.replace(/[.@]/g, "");
    }
    return null;
  };
  const tokenEmail = extractEmailFromToken();

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await axios.get(`${crudCrudUrl}/cart${tokenEmail}`);
      console.log(data[0]);
      setCartElements(data[0].newCart);
    };
    fetchCart();
  }, []);

  const updateCart = async (newCart) => {
    try {
      const getCart = await axios.get(`${crudCrudUrl}/cart${tokenEmail}`);
      // console.log({ getCart });
      const cartId = localStorage.getItem("newCartId");
      const response = await axios.put(
        `${crudCrudUrl}/cart${tokenEmail}/${cartId}`,
        { newCart }
      );
      // console.log({ response });
    } catch (error) {
      // if (error.response && error.response.status === 404) {
      const { data } = await axios.post(`${crudCrudUrl}/cart${tokenEmail}`, {
        newCart,
      });
      // console.log({ data });
      localStorage.setItem("newCartId", data._id);
      // } else {
      //   console.error(error);
      // }
    }
    setCartElements(newCart);
  };

  const addToCart = async (item) => {
    const newCart = [...cartElements];
    const itemIndex = newCart.findIndex(
      (cartItem) => cartItem.title === item.title
    );
    if (itemIndex !== -1) {
      newCart[itemIndex] = {
        ...newCart[itemIndex],
        quantity: newCart[itemIndex].quantity + 1,
      };
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    await updateCart(newCart);
  };

  const removeFromCart = async (index) => {
    const newCart = [...cartElements];
    newCart.splice(index, 1);
    await updateCart(newCart);
  };

  const decreaseQuantity = async (index) => {
    const newCart = [...cartElements];
    const item = newCart[index];
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      newCart.splice(index, 1);
    }
    await updateCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{ cartElements, addToCart, removeFromCart, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
