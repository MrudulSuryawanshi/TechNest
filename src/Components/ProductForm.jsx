import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const productSchema = yup.object({
  name: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive()
    .required("Price is required"),
  image: yup.string().required("Image path is required"),
});

const ProductForm = ({ defaultValues, onSubmit, buttonText }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {buttonText}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label className="font-semibold">Product Name</label>

          <input
            {...register("name")}
            className="w-full border rounded p-2 mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.name?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Category</label>

          <select
            {...register("category")}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select</option>
            <option>Laptops</option>
            <option>Mobiles</option>
            <option>Headphones</option>
            <option>Smartwatches</option>
            <option>Keyboards</option>
            <option>Mouse</option>
          </select>

          <p className="text-red-500 text-sm">
            {errors.category?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Price</label>

          <input
            type="number"
            {...register("price")}
            className="w-full border rounded p-2 mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.price?.message}
          </p>
        </div>

        <div className="mb-6">
          <label className="font-semibold">Image Path</label>

          <input
            {...register("image")}
            placeholder="/Images/product.jpg"
            className="w-full border rounded p-2 mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.image?.message}
          </p>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          {buttonText}
        </button>

      </form>
    </div>
  );
};

export default ProductForm;