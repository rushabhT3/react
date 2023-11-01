import React, { useContext } from "react";
import { useParams, useLocation } from "react-router-dom";

import { CartContext } from "../contexts/CartContext";

const ProductDetailPage = () => {
  const params = useParams();
  const { state } = useLocation();
  const { addToCart } = useContext(CartContext);
  
  console.log(state);
  const product = state.product;

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-semibold leading-7 text-gray-900">
          {product.title}
        </h1>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            class="w-100 h-100 rounded-md"
          />
          <div class="mt-6">
            <h2 class="text-lg font-semibold leading-7 text-gray-900">
              Price: ${product.price}
            </h2>
          </div>
        </div>
        <div>
          <p class="text-base leading-7 text-gray-700">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-6"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
