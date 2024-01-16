import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { PrivateRoute, PrivateRoutes } from "./components/PrivateRoute";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "./query/mutation";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
