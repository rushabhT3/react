import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import Cart from "./Cart";
import { CartContext } from "../contexts/CartContext";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartElements } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // const location = useLocation();
  // const isCartButtonHidden =
  //   location.pathname === "/home" || location.pathname === "/about";

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href="www.google.co.in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">The Generics</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "mr-5 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline"
                : "mr-5 flex items-center justify-center hover:text-gray-900"
            }
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "mr-5 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline"
                : "mr-5 flex items-center justify-center hover:text-gray-900"
            }
            to="/store"
          >
            Store
          </NavLink>
          <NavLink
            // className="mr-5 flex items-center justify-center hover:text-gray-900"
            className={({ isActive }) =>
              isActive
                ? "mr-5 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline"
                : "mr-5 flex items-center justify-center hover:text-gray-900"
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "mr-5 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline"
                : "mr-5 flex items-center justify-center hover:text-gray-900"
            }
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "mr-5 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline"
                : "mr-5 flex items-center justify-center hover:text-gray-900"
            }
            to="/contactus"
          >
            Contact Us
          </NavLink>
        </nav>
        {/* {!isCartButtonHidden && ( */}
        <button
          onClick={toggleCart}
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {/* Display the number of items in the cart */}
          Cart
          <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {cartElements.length}
          </span>
        </button>
        {/* )} */}
      </div>
      {isCartOpen && (
        <div className="fixed inset-0 overflow-y-auto bg-gray-800 bg-opacity-50 z-50 ">
          <button
            onClick={toggleCart}
            className="absolute top-0 right-0 p-4 text-red-500 bg-transparent hover:bg-red-500 hover:text-white"
          >
            ❌
          </button>
          {/* <div className="pointer-events-none"> */}
          <Cart className="pointer-events-auto" />
        </div>
        // </div>
      )}
    </header>
  );
};

export default Header;
