import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductForm from "../Components/ProductForm";
import { useContext } from "react";
import { SnackbarContext } from "../Context/SnackbarContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, data);

      showSnackbar("Product updated successfully!", "success");

      navigate("/");
    } catch (error) {
      console.log(error);
      showSnackbar("Failed to update product.", "error");
    }
  };

  if (!product) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <ProductForm
      defaultValues={product}
      onSubmit={handleUpdateProduct}
      buttonText="Update Product"
    />
  );
};

export default EditProduct;
