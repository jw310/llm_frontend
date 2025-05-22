import { useContext } from "react";
import { AuthContext } from '../context/auth';
import { Navigate } from "react-router";

function ProtectedRoute({ children, allowedRoles = [] }) {
  // const navigate = useNavigate();

  // navigate("/login");
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
      return <Navigate to="/login" replace />;
    }
  return children;
}

export default ProtectedRoute;
