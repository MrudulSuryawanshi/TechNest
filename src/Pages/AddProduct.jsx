import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../Components/ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleAddProduct = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        data
      );

      alert("Product added successfully!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to add product.");
    }
  };

  return (
    <ProductForm
      defaultValues={{
        name: "",
        category: "",
        price: "",
        image: "",
      }}
      onSubmit={handleAddProduct}
      buttonText="Add Product"
    />
  );
};

export default AddProduct;