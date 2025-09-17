
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function PrivateRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
}

export function PublicOnlyRoutes() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : <Outlet />;
}