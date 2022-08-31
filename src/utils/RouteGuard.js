import { Navigate, Outlet } from "react-router-dom";

const Authentication = () => {
  const token = localStorage.getItem("token");
  const user = { loggedIn: false };
  if (token === "token_access") {
    user.loggedIn = true;
  }
  return user && user.loggedIn;
};

export function RouteGuard() {
  const Auth = Authentication();

  return Auth ? <Outlet /> : <Navigate to="/login" />;
}
