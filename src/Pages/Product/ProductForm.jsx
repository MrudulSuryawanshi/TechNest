import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const productSchema = yup.object({
  name: yup.string().required("Product name is required"),

  brand: yup.string().required("Brand is required"),

  category: yup.string().required("Category is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .positive()
    .required("Price is required"),

  stock: yup
    .number()
    .typeError("Stock must be a number")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),

  image: yup.string().required("Image path is required"),

  description: yup.string().required("Description is required"),

  specifications: yup.string().required("Specifications are required"),
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          {buttonText}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold text-gray-700">
                Product Name
              </label>

              <input
                {...register("name")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Brand</label>

              <input
                {...register("brand")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.brand?.message}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Category</label>

              <select
                {...register("category")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1
                           bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <p className="text-red-500 text-sm mt-1">
                {errors.category?.message}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Price</label>

              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.price?.message}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Stock</label>

              <input
                type="number"
                {...register("stock", { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.stock?.message}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Image Path</label>

              <input
                {...register("image")}
                placeholder="/Images/product.jpg"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.image?.message}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700">Description</label>

              <textarea
                {...register("description")}
                rows="4"
                placeholder="Enter product description"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1
                           resize-none focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:border-blue-500 transition"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.description?.message}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700">
                Specifications
              </label>

              <textarea
                {...register("specifications")}
                rows="6"
                placeholder={`Processor: Intel Core i5
RAM: 16 GB
Storage: 512 GB SSD
Display: 15.6-inch Full HD`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1
                           resize-none focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:border-blue-500 transition"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.specifications?.message}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700
                       text-white font-semibold py-3 rounded-lg
                       mt-7 transition duration-200
                       shadow-md hover:shadow-lg"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
