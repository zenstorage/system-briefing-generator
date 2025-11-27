import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("token_expiration");

  if (!token || !tokenExpiration) {
    return <Navigate to="/login" />;
  }

  const currentTime = Date.now();
  const expirationTime = Number(tokenExpiration);

  console.log("Current time:", currentTime);
  console.log("Expiration time:", expirationTime);

  if (isNaN(expirationTime) || currentTime > expirationTime) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiration");
    return <Navigate to="/login" />;
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
