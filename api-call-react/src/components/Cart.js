import React, { useState, useEffect } from "react";
import axios from "axios";

const crudCrudUrl = process.env.REACT_APP_CRUD_CRUD_URL;

const Cart = () => {
  const [cartShow, setCartShow] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data: existingCart } = await axios.get(`${crudCrudUrl}/cart`);
      setCart((prevState) => existingCart);
    };
    fetch();
  }, []);

  const ClickHandler = () => {
    setCartShow((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={ClickHandler}>Cart 🛒</button>
      {cartShow && (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              Name: {item.name}, Description: {item.description}, Price:{" "}
              {item.price}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
