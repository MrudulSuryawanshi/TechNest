import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../Style/Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import Register from "./Register";
import InputField from "../Components/InputField";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { SnackbarContext } from "../Context/SnackbarContext";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters"),
});

function Login() {
  const navigate = useNavigate();
  const { savedCredential } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const customerLogin = async (email, password) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(email)}`,
      );

      if (response.data.length === 0) {
        throw new Error("User not found.");
      }
      const user = response.data[0];

      if (user.password !== password) {
        throw new Error("Invalid password.");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const user = await customerLogin(data.email, data.password);
      const savedUser = {
        fullname: user.fullname,
        email: user.email,
        role: user.role
      };
      savedCredential(savedUser);
      showSnackbar("Login Successful!", "success");
      navigate("/");
      console.log(user);
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h1>Welcome Back</h1>
          <p>Login to continue shopping</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="Enter Email"
              register={register}
              error={errors.email}
            />

            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Enter Password"
              register={register}
              error={errors.password}
            />

            <button type="submit" className="auth-btn">
              Login
            </button>

            <p className="auth-footer">
              Don't have an account? <NavLink to="/register">Register</NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
