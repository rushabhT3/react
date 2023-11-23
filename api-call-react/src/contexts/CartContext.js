import { createContext, useState, useEffect } from "react";
import axios from "axios";
const CartContext = createContext([]);

const crudCrudUrl = process.env.REACT_APP_CRUD_CRUD_URL;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await axios.get(`${crudCrudUrl}/cart`);
      setCartItems((prevState) => data || []);
    };
    fetchCart();
  }, []);

  const updateList = async () => {
    const getRes = await axios.get(`${crudCrudUrl}/name`);
    const names = getRes.data.map((item) => item);
    setList((prevList) => {
      console.log(prevList);
      return names;
    });
  };

  const QuantityHandler = async (item, value) => {
    const newQuantity = (item.quantity || 1) + value;

    await axios.put(`${crudCrudUrl}/name/${item._id}`, {
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: newQuantity,
    });

    updateList();
  };

  const AddToCartHandler = async (item) => {
    try {
      const { data: existingCart } = await axios.get(`${crudCrudUrl}/cart`);
      const existingCartItem = existingCart.find(
        (cartItem) => cartItem.id === item._id
      );
      if (existingCartItem) {
        await axios.put(`${crudCrudUrl}/cart/${existingCartItem._id}`, {
          id: item._id,
          name: item.name,
          price: item.price,
          description: item.description,
          quantity: existingCartItem.quantity + item.quantity,
        });
      } else {
        await axios.post(`${crudCrudUrl}/cart`, {
          id: item._id,
          name: item.name,
          price: item.price,
          description: item.description,
          quantity: item.quantity,
        });
      }
    } catch (error) {
      console.log("not found");
    }

    await axios.put(`${crudCrudUrl}/name/${item._id}`, {
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: 1,
    });

    updateList();
  };

  return (
    <CartContext.Provider
      value={{cartItems, updateList, AddToCartHandler, QuantityHandler, list}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
