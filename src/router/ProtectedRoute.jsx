import { useContext } from "react";
import { Navigate } from "react-router";
import { useTranslation } from "react-i18next";

import { AuthContext } from '../context/auth';

// function ProtectedRoute({ children, allowedRoles = [] }) {
//   const { isLoggedIn, currentUser } = useContext(AuthContext);

//   if (!isLoggedIn) {
//       return <Navigate to='/login' replace />;
//     }
//   if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
//       return <Navigate to='/login' replace />;
//     }
//   return children;
// }

// 處理 i18n URL
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { i18n } = useTranslation();
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  const path = `/${i18n.language}/login`;

  if (!isLoggedIn) {
      return <Navigate to={path} replace />;
    }
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
      return <Navigate to={path} replace />;
    }
  return children;
}

export default ProtectedRoute;
