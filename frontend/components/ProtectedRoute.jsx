import { useContext } from "react";
import { Navigate } from "react-router";
import CurrentUserContext from "../src/contexts/CurrentUserContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}
