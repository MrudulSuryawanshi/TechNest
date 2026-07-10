import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../Style/Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Login from "./Login";
import InputField from "../Components/InputField";
import axios from "axios";

const registerSchema = yup.object({
  fullname: yup.string().required("Enter the fullname"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters"),
  copassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  mobileno: yup
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const customerValidation = async (email) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(email)}`);
        return response.data.length > 0;
    } catch(error) {
        throw new Error("Error validating customer: " + error.message);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const payload = {
        ...data,
        role: "customer",
      };

      const output = await customerValidation(data.email);

      if (output) {
        throw new Error("Email already exists. Please use different credentials.");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        payload,
      );

      if (response.status === 201 && response.data && response.data.id) {
        alert("Registration successful! Please login.");
        reset();
        navigate("/login");
        return;
      }

      throw new Error("Registration failed. Please try again.");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h1>Register</h1>
          <p>Create your TechNest Account</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Full Name"
              type="text"
              id="fullname"
              placeholder="Enter Full Name"
              register={register}
              error={errors.fullname}
            />

            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="Enter Email"
              register={register}
              error={errors.email}
            />

            <InputField
              label="Mobile Number"
              type="tel"
              id="mobileno"
              placeholder="Enter Mobile Number"
              register={register}
              error={errors.mobileno}
            />

            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Enter Password"
              register={register}
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              id="copassword"
              placeholder="Confirm Password"
              register={register}
              error={errors.copassword}
            />

            <button className="auth-btn">Register</button>

            <p className="auth-footer">
              Already have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
