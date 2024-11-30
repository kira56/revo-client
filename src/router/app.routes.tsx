import { Route, Routes } from "react-router";
import App from "../App";
import { Recommendation } from "../pages/recommendation";
import { Login } from "@pages/auth/login/login";
import { Register } from "@pages/auth/register";
import { ProtectedRoute } from "./protected.routes";
import { PublicRoute } from "./public.routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/recommendation"
        element={
          <ProtectedRoute>
            <Recommendation />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
