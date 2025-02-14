import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, isProtected = true }) {
  const token = localStorage.getItem("token");

  if (isProtected && !token) {
    return <Navigate to="/login" />;
  }

  if (!isProtected && token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoutes;
