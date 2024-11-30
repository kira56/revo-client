import { useGlobalStore } from "@store/global.store";
import { ReactNode } from "react";
import { Navigate } from "react-router";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = useGlobalStore((state) => state.token);

  if (token) {
    return <Navigate to={"/recommendation"} replace />;
  }

  return <>{children}</>;
};
