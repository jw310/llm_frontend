import { createBrowserRouter, Navigate } from "react-router";

import ProtectedRoute from '@/router/ProtectedRoute.jsx';
import DemoPage from "@/pages/DemoPage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import ErrorPage from "@/pages/ErrorPage.jsx";
import Layout from "@/pages/Layout.jsx";
import CalendarPage from "@/pages/CalendarPage.jsx";
import CreateUserPage from "@/pages/admin/CreateUserPage.jsx";
import ChatPage from "@/pages/Chat.jsx";


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
        index: true,
        element: (
          // <ProtectedRoute allowedRoles={['admin', 'user']}>
            <CalendarPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/create',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateUserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/chat',
        element: (
          // <ProtectedRoute>
            <ChatPage />
          // </ProtectedRoute>
        ),
      }
      // {
      //   path: '/',
      //   children: [
      //     {`
      //       index: true,
      //       // element: <Navigate to='product' replace />, //輸入 / 的話，重新導向顯示 product 頁面
      //     },
      //     // {
      //     //   path: 'product',
      //     //   element: (
      //     //     // <ProtectedRoute>
      //     //       <ProductInfoPage />
      //     //     // </ProtectedRoute>
      //     //   ),
      //     // },
      //   ],
      // },
    ]
  }
]);

export default router;
