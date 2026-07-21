import React from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import "./Navbar.css";
import { AuthContext } from "../Auth/AuthProvider";
import { Menu, MenuItem, Typography, Divider } from "@mui/material";
import { useState, useContext } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <>
              <FiUser
                id={buttonId}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />

              <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": buttonId,
                  },
                }}
              >
                <MenuItem disabled>Hi, {user.fullname}</MenuItem>
                
                <MenuItem
                  onClick={() => {
                    logOut();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
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
