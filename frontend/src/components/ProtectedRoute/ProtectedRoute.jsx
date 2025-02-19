import { Navigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import Firebase auth

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; // Check if the user is logged in

  if (!user) {
    // Redirect to the home page if the user is not logged in
    return <Navigate to="/" replace />;
  }

  return children; // Render the protected component if the user is logged in
};

export default ProtectedRoute;