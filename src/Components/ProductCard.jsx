import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="bg-gray-100 h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-28 object-contain"
        />
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-gray-500 text-sm mt-2">{product.category}</p>

        <p className="text-xl font-bold text-blue-600 mt-3">
          ₹{product.price}
        </p>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 mt-5 font-semibold flex items-center justify-center gap-2 transition">
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
