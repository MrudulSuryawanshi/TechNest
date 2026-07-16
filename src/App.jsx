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
import AuthWrap from "./Auth/AuthWrap";
import Unauthorized from "./Pages/Unauthorized";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AuthWrap allowedRoles={["customer","admin"]}>
          <Home />
        </AuthWrap>
      } />
      <Route path="/login" element={
        <AuthWrap allowedRoles={["customer","admin"]}>
          <Login />
        </AuthWrap>
      } />
      <Route path="/cart" element={
        <AuthWrap allowedRoles={["customer"]}>
          <Cart />
        </AuthWrap>
      } />
      <Route path="/register" element={
        <AuthWrap allowedRoles={["customer","admin"]}>
          <Register />
        </AuthWrap>
      } />
      <Route path="/products" element={
        <AuthWrap allowedRoles={["customer","admin"]}>
          <Product />
        </AuthWrap>
      } />
      <Route path="/add-product" element={
        <AuthWrap allowedRoles={["admin"]}>
          <AddProduct />
        </AuthWrap>
      } />
      <Route path="/edit-product/:id" element={
        <AuthWrap allowedRoles={["admin"]}>
          <EditProduct />
        </AuthWrap>
      } />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default App;
