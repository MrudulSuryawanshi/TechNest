import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { createContext } from "react";
import { AuthContext } from "./AuthProvider";

const AuthWrap = ({ allowedRoles, children }) => {
  const { loading, authenticated, user } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default AuthWrap;
