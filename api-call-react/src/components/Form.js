import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import CartContext from "../contexts/CartContext";
import List from "./List";
const crudCrudUrl = process.env.REACT_APP_CRUD_CRUD_URL;

function Form() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const getRes = await axios.get(`${crudCrudUrl}/name`);
      const names = getRes.data.map((item) => item);
      setList((prevList) => {
        console.log(prevList);
        return names;
      });
      console.log(list);
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await axios.post(`${crudCrudUrl}/name`, {
      name,
      price,
      description,
      quantity: 1,
    });
    console.log(response);
    setName("");
    setPrice(0);
    setDescription("");

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

    const getRes = await axios.get(`${crudCrudUrl}/name`);
    const names = getRes.data.map((item) => item);
    setList((prevList) => {
      console.log(prevList);
      return names;
    });
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

    const getRes = await axios.get(`${crudCrudUrl}/name`);
    const names = getRes.data.map((item) => item);
    setList((prevList) => {
      console.log(prevList);
      return names;
    });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          id="Name"
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          id="Description"
          type="text"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <input
          id="Price"
          type="number"
          placeholder="Price"
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <List
        list={list}
        QuantityHandler={QuantityHandler}
        AddToCartHandler={AddToCartHandler}
      />
    </>
  );
}

export default Form;
