import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = sessionStorage.getItem("access_token");
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/" />}</>;
};

export const PrivateRoutes = () => {
  const isAuthenticated = sessionStorage.getItem("access_token");
  return <>{isAuthenticated ? <Navigate to="dashboard" /> : <Outlet />}</>;
};
