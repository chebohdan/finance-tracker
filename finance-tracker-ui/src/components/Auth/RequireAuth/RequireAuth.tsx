import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import type { Role } from "../../../types/auth";

function RequireAuth({ allowedRoles }: { allowedRoles: Role[] }) {
  const { accessToken, roles } = useAuth();
  const location = useLocation();
  return allowedRoles.find((role) => {
    return roles?.includes(role);
  }) ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to={"/unauthorized"} state={{ location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ location }} replace />
  );
}

export default RequireAuth;
