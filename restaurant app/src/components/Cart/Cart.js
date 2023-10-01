import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartCntxt from "../../store/cart-context";
import { useContext } from "react";

const Cart = (props) => {
  const cartcntx = useContext(CartCntxt);

  const totalAmount = cartcntx.items.reduce((currentTotal, item) => {
    return currentTotal + item.price * item.quantity;
  }, 0);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartcntx.items.map((item) => (
        <li key={item.id}>
          <div className={classes.itemContainer}>
            <span className={classes.name}>{item.name}</span>
            <span className={classes.price}>Price: {item.price}</span>
            <div className={classes.quantityContainer}>
              <button
                className={classes.quantityButton}
                onClick={() => cartcntx.addItem({ ...item, quantity: 1 })}
              >
                +
              </button>
              <span className={classes.quantity}>
                Quantity: {item.quantity}
              </span>
              <button
                className={classes.quantityButton}
                onClick={() => cartcntx.removeItem(item.id)}
              >
                -
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

// import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";
// import CartCntxt from "../../store/cart-context";
// import { useContext } from "react";

// const Cart = (props) => {
//   const cartcntx = useContext(CartCntxt);

//   const totalAmount = cartcntx.items.reduce((currentTotal, item) => {
//     return currentTotal + item.price * item.quantity;
//   }, 0);

//   const cartItems = (
//     // <ul className={classes["cart-items"]}>
//     //   {cartcntx.items.map((item) => (
//     //     <li>
//     //       Name: {item.name} Price: {item.price} Quantity: {item.quantity}
//     //     </li>
//     //   ))}
//     // </ul>
//     <ul className={classes["cart-items"]}>
//       {cartcntx.items.map((item) => (
//         <li key={item.id}>
//           <span className={classes.name}>{item.name}</span>
//           <span className={classes.price}>Price: {item.price}</span>
//           <span className={classes.quantity}>Quantity: {item.quantity}</span>
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <Modal onClose={props.onClose}>
//       {cartItems}
//       <div className={classes.total}>
//         <span>Total Amount</span>
//         <span>{totalAmount.toFixed(2)}</span>
//       </div>
//       <div className={classes.actions}>
//         <button className={classes["button--alt"]} onClick={props.onClose}>
//           Close
//         </button>
//         <button className={classes.button}>Order</button>
//       </div>
//     </Modal>
//   );
// };

// export default Cart;
