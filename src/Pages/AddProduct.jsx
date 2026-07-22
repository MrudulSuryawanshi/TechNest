import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../Components/ProductForm";
import { useContext } from "react";
import { SnackbarContext } from "../Context/SnackbarContext";


const AddProduct = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);

  const handleAddProduct = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        data
      );

      showSnackbar("Product added successfully!","success");

      navigate("/");
    } catch (error) {
      console.log(error);
      showSnackbar("Failed to add product.", "error");
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