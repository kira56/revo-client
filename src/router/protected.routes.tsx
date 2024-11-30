import { useGlobalStore } from "@store/global.store";
import { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useGlobalStore((state) => state.token);

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return <>{children}</>;
};
