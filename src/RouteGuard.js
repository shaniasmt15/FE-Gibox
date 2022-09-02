import { Navigate, Outlet } from "react-router-dom";

const CheckAuthentication = () => {
  const user = { alreadyEnter: false };

  const LoadToken = localStorage.getItem("token");
  if (LoadToken === "token_access") {
    user.alreadyEnter = true;
  }
  return user && user.alreadyEnter;
};

export function RouteGuard() {
  const checkAuth = CheckAuthentication();

  return checkAuth ? <Outlet /> : <Navigate to="/login" />;
}
