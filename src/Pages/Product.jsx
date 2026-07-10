import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import FilterSidebar from "../Components/FilterSidebar";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import { useEffect } from "react";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

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
            {/* Sidebar */}
            <div className="w-52 flex-shrink-0">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            {/* Products */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6">Products</h1>

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
