import React from "react";
import "./Hero.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Shop the Latest Electronics</h1>
        <p>
          Upgrade your lifestyle with top gadgets at unbeatable prices.
        </p>

        <div className="hero-buttons">
          <NavLink to="/products" className="btn primary">
            Shop Now
          </NavLink>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80"
          alt="Electronics"
        />
      </div>
    </section>
  );
};

export default Hero;

