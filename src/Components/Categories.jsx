import React from "react";
import "./Categories.css";
import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaClock,
  FaDesktop,
  FaKeyboard,
} from "react-icons/fa";

const categories = [
  { id: 1, name: "Mobiles", icon: <FaMobileAlt /> },
  { id: 2, name: "Laptops", icon: <FaLaptop /> },
  { id: 3, name: "Audio", icon: <FaHeadphones /> },
  { id: 4, name: "Smart Watches", icon: <FaClock /> },
  { id: 5, name: "Monitors", icon: <FaDesktop /> },
  { id: 6, name: "Accessories", icon: <FaKeyboard /> },
];

function Categories() {
  return (
    <section className="categories">
      <h5>Shop by Category</h5>

      <div className="category-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;