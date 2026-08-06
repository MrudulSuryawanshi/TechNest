import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { useCart } from "../../Context/CartContext";
import { SnackbarContext } from "../../Context/SnackbarContext";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  // const { showSnackbar } = useSnackbar();
  const { showSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);

    showSnackbar(`${product.name} added to cart`, "success");
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
    >
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

        <p className="text-xl font-bold text-blue-600 mt-3">₹{product.price}</p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 mt-5 font-semibold flex items-center justify-center gap-2 transition"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
        {user?.role === "admin" && (
          <Link
            to={`/edit-product/${product.id}`}
            className="text-blue-600 hover:text-blue-800 mt-3 block text-center"
          >
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
