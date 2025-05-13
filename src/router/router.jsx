import { createBrowserRouter, Navigate } from "react-router";

import ProtectedRoute from '@/router/ProtectedRoute.jsx';
import DemoPage from "@/pages/DemoPage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import ErrorPage from "@/pages/ErrorPage.jsx";
import Layout from "@/pages/Layout.jsx";


const router = createBrowserRouter([
  {
    path: "/demo",
    // element: <DemoPage />,
    Component: DemoPage,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/unauthorized",
    Component: <ErrorPage />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        children: [
          {
            index: true,
            // element: <Navigate to='product' replace />,
          },
          // {
          //   path: 'product',
          //   element: (
          //     // <ProtectedRoute>
          //       <ProductInfoPage />
          //     // </ProtectedRoute>
          //   ),
          // },
        ],
      },
    ]
  }
]);

export default router;
