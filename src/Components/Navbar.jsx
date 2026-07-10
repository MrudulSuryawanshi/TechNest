import React from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";


const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <h2>TechNest</h2>
      </NavLink>

      <div className="search-box">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search for products..." />
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/products">Products</NavLink>
        </li>

        <li>
          <NavLink to="/cart">
            <FiShoppingCart />
          </NavLink>
        </li>

        <li>
          {user ? (
            <span className="user-name">Hi, {user.fullname}</span>
          ) : (
            <NavLink to="/login">
              <FiUser />
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
