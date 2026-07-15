import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Register from "./Pages/Register";
import AuthProvider from "./Auth/AuthProvider";
import Product from "./Pages/Product";
import "./index.css";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Product />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default App;
