import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import AuthRoute from "./Auth/AuthRoute";
import Home from "./Pages/Home";
import AuthWrap from "./Auth/AuthWrap";
import Cart from "./Pages/Cart";
import Register from "./Pages/Register";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import ProductDetails from "./Pages/ProductDetails";
import Unauthorized from "./Pages/Unauthorized";
import Product from "./Pages/Product";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <AuthWrap allowedRoles={["customer"]}>
            <Cart />
          </AuthWrap>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />
      <Route path="/products" element={<Product />} />
      <Route
        path="/add-product"
        element={
          <AuthWrap allowedRoles={["admin"]}>
            <AddProduct />
          </AuthWrap>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <AuthWrap allowedRoles={["admin"]}>
            <EditProduct />
          </AuthWrap>
        }
      />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
