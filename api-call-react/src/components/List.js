import React from "react";

function List({ list, QuantityHandler, AddToCartHandler }) {
  return (
    <div>
      {list.map((item) => (
        <ul key={item._id}>
          <li>{`Name: ${item.name}, Description: ${item.description}, Price: ${item.price}, Quantity: ❎${item.quantity}`}</li>
          <button onClick={() => QuantityHandler(item, 1)}>+1</button>
          <button onClick={() => QuantityHandler(item, 2)}>+2</button>
          <button onClick={() => QuantityHandler(item, 3)}>+3</button>
          <button onClick={() => AddToCartHandler(item)}>Add to Cart</button>
        </ul>
      ))}
    </div>
  );
}

export default List;
