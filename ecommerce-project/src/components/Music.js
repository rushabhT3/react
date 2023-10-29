import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const productsArr = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Music = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Music
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <Products products={productsArr} />
      </div>
    </section>
  );
};

const Products = ({ products }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {products.map((product) => (
        <Product key={product.title} product={product} />
      ))}
    </div>
  );
};

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const openModal = () => {
    const modal = document.getElementById(`modal-${product.title}`);
    const overlay = document.getElementById(`overlay-${product.title}`);
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  return (
    <div className="xl:w-1/4 md:w-1/2 p-4 relative">
      <div className="bg-gray-100 p-6 rounded-lg">
        <img
          className="h-40 rounded w-full object-cover object-center mb-6 cursor-pointer"
          src={product.imageUrl}
          alt="content"
          onClick={openModal}
        />
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          Price: ₹{product.price}
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
          {product.title}
        </h2>
        <button
          onClick={() => addToCart(product)}
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add to Cart
          </span>
        </button>
      </div>
      <div
        id={`modal-${product.title}`}
        className="modal hidden fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-content max-w-full max-h-full p-4 bg-white rounded-lg">
          <span
            className="close absolute top-4 right-4 text-2xl cursor-pointer bg-red-500 text-white rounded-md p-2"
            onClick={closeModal}
          >
            &times;
          </span>
          <img
            className="w-full h-auto"
            src={product.imageUrl}
            alt="zoomed-content"
          />
        </div>
      </div>
      <div
        id={`overlay-${product.title}`}
        className="overlay hidden fixed inset-0 bg-black opacity-70 z-40"
        onClick={closeModal}
      ></div>
    </div>
  );
};

// Function to close the modal
const closeModal = () => {
  const modals = document.querySelectorAll(".modal");
  const overlays = document.querySelectorAll(".overlay");
  modals.forEach((modal) => modal.classList.add("hidden"));
  overlays.forEach((overlay) => overlay.classList.add("hidden"));
};

export default Music;
