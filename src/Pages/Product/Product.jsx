import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { Link } from "react-router-dom";
import { useSearch } from "../../Context/SearchContext";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const { searchTerm } = useSearch();

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  return (
    <>
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

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-gray-500">
                  <h2 className="text-3xl font-semibold">No Products Found</h2>
                  <p className="mt-2 text-lg">
                    Try searching with a different name or category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
