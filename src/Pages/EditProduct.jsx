import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductForm from "../Components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        data
      );

      alert("Product updated successfully!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to update product.");
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