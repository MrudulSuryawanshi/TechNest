import React, { useEffect, useState } from "react";
import axios from "axios";

const FilterSidebar = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 h-[80vh] sticky top-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>

      <div className="space-y-5">
        <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
          <input
            type="radio"
            name="category"
            value="All"
            checked={selectedCategory === "All"}
            onChange={() => setSelectedCategory("All")}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-lg">All</span>
        </label>

        {categories.map((category) => (
          <label
            key={category.id}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
          >
            <input
              type="radio"
              name="category"
              value={category.name}
              checked={selectedCategory === category.name}
              onChange={() => setSelectedCategory(category.name)}
              className="w-4 h-4 accent-blue-600"
            />

            <span className="text-lg">{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;