import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import "./Navbar.css";
import { AuthContext } from "../../Auth/AuthProvider";
import { Menu, MenuItem } from "@mui/material";
import { useSearch } from "../../Context/SearchContext";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const categoryOptions = categories.map((category) => category.name);

  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <h2>TechNest</h2>
      </NavLink>

      {/* Search Box */}
      <div className="search-box">
        <Autocomplete
          freeSolo
          options={categoryOptions}
          inputValue={searchTerm}
          openOnFocus={false}
          
          filterOptions={(options, state) =>
            state.inputValue.length > 0
              ? options.filter((option) =>
                  option.toLowerCase().includes(state.inputValue.toLowerCase()),
                )
              : []
          }
          onInputChange={(event, value) => {
            setSearchTerm(value);

            if (value.trim() !== "") {
              navigate("/products");
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search categories..."
              size="small"
            />
          )}
        />
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
