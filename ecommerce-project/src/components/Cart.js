import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Cart = () => {
  const { cartElements, addToCart, removeFromCart, decreaseQuantity } =
    useContext(CartContext);

  const subtotal = cartElements.reduce(
    (acc, element) => acc + element.price * element.quantity,
    0
  );
  const shipping = subtotal === 0 ? 0 : subtotal < 500 ? 40 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                    <th className="text-left font-semibold">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartElements.map((element, index) => (
                    <tr key={index}>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            src={element.imageUrl}
                            alt="Product Image"
                            className="h-16 w-16 mr-4"
                          />
                          <span className="font-semibold">{element.title}</span>
                        </div>
                      </td>
                      <td className="py-4">₹{element.price}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="border rounded-md py-2 px-4 mr-2"
                            onClick={() => decreaseQuantity(index)}
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {element.quantity}
                          </span>
                          <button
                            className="border rounded-md py-2 px-4 ml-2"
                            onClick={() => addToCart(element)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        ₹{(element.price * element.quantity).toFixed(2)}
                      </td>
                      <td className="py-4">
                        <button
                          className="text-red-500 bg-transparent hover:bg-red-500 hover:text-white"
                          onClick={() => removeFromCart(index)}
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>

              {/* Subtotal */}
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping - You can replace this with actual calculation */}
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>

              {/* Total */}
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₹{total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
