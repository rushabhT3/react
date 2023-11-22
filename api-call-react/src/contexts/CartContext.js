import { createContext, useState, useEffect } from "react";
import axios from "axios";
const CartContext = createContext([]);

const crudCrudUrl = process.env.REACT_APP_CRUD_CRUD_URL;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await axios.get(`${crudCrudUrl}/cart`);
      setCartItems((prevState) => data || []);
    };
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={cartItems}>{children}</CartContext.Provider>
  );
};

export default CartContext;
