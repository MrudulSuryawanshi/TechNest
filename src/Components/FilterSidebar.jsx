import React from "react";

const categories = [
  "All",
  "Laptops",
  "Mobiles",
  "Headphones",
  "Smartwatches",
  "Keyboards",
  "Mouse",
  "Accessories",
];

const FilterSidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 h-[80vh] sticky top-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>

      <div className="space-y-5">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
          >
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
              className="w-4 h-4 accent-blue-600"
            />

            <span className="text-lg">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
