import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

export function UnprotectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Please wait..</h1>;

  if (user) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
}
