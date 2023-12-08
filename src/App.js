import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { PrivateRoute, PrivateRoutes } from "./components/PrivateRoute";

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
