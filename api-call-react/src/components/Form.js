import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import List from "./List";
import CartContext from "../contexts/CartContext";
const crudCrudUrl = process.env.REACT_APP_CRUD_CRUD_URL;

function Form() {
  const { updateList } = useContext(CartContext);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetch = async () => {
      updateList();
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

    updateList();
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
      <List/>
    </>
  );
}

export default Form;
