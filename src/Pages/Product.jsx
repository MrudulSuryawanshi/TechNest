import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import FilterSidebar from "../Components/FilterSidebar";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import { useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      console.log("Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 py-8">
        <div className="max-w-[1500px] mx-auto px-16 py-8">
          <div className="flex gap-8">
            <div className="w-52 flex-shrink-0">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6">Products</h1>

              {user?.role === "admin" && (
                <Link
                  to="/add-product"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Product
                </Link>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
