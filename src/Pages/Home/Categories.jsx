import React, { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";

import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaClock,
  FaDesktop,
  FaKeyboard,
} from "react-icons/fa";

const iconMap = {
  Mobiles: <FaMobileAlt />,
  Laptops: <FaLaptop />,
  Headphones: <FaHeadphones />,
  SmartWatches: <FaClock />,
  Mouse: <FaDesktop />,
  Accessories: <FaKeyboard />,
};

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="categories">
      <h5>Shop by Category</h5>

      <div className="category-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <div className="category-icon">
              {iconMap[category.name]}
            </div>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;