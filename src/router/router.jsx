import { createBrowserRouter, Navigate } from 'react-router';
import I18nWrapper from '@/components/I18nWrapper';

import ProtectedRoute from '@/router/ProtectedRoute.jsx';
import DemoPage from '@/pages/DemoPage.jsx';
import SvgPage from '@/pages/SvgPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import ErrorPage from '@/pages/ErrorPage.jsx';
import Layout from '@/pages/Layout.jsx';
import HomePage from '@/pages/HomePage.jsx';
import CalendarPage from '@/pages/CalendarPage.jsx';
import CreateUserPage from '@/pages/admin/CreateUserPage.jsx';
import ChatPage from '@/pages/chat/ChatPage.jsx';
import RecentPage from '@/pages/chat/RecentPage.jsx';
import PdfViewerPage from '@/pages/PdfPage';

// const router = createBrowserRouter([
//   {
//     path: "/demo",
//     // element: <DemoPage />,
//     Component: DemoPage,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/login",
//     Component: LoginPage,
//     errorElement: <ErrorPage />,
//   },
//   // {
//   //   path: "/svg",
//   //   Component: SvgPage,
//   // },
//   {
//     path: "/unauthorized",
//     Component: <ErrorPage />,
//   },
//   {
//     path: '/',
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true, // index:true 用以取代 { path: ''}，那麼這個路由，就會是上層路由的預設渲染路由頁面
//         element: (
//           <ProtectedRoute allowedRoles={['admin', 'user']}>
//             <CalendarPage />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: '/create',
//         children: [
//           {
//             index: true,
//             element: <Navigate to='user' replace />, // 輸入 /create 的話，重新導向顯示 user 頁面
//           },
//           {
//             path: 'user',
//             element: (
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <CreateUserPage />
//               </ProtectedRoute>
//             ),
//           },
//           {
//             path: 'pdf',
//             element: (
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <PdfViewerPage />
//               </ProtectedRoute>
//             ),
//           },
//         ],
//       },
//       {
//         path: '/chat',
//         children: [
//           {
//             index: true,
//             element: <Navigate to='new' replace />,
//           },
//           {
//             path: 'new',
//             element: (
//               <ProtectedRoute>
//                 <ChatPage />
//               </ProtectedRoute>
//             ),
//           },
//           {
//             path: 'recents',
//             element: (
//               <ProtectedRoute>
//                 <RecentPage />
//               </ProtectedRoute>
//             ),
//           },
//           {
//             path: ':id',
//             element: (
//               <ProtectedRoute>
//                 <ChatPage />
//               </ProtectedRoute>
//             ),
//           },
//         ],
//       },
//     ]
//   }
// ]);

// 將路由設定包裝在 I18nWrapper 中，以便於處理 url 的語系參數
const router = createBrowserRouter([
  {
    path: '/:locale',
    Component: I18nWrapper,
    children: [
      {
        path: 'demo',
        // element: <DemoPage />,
        Component: DemoPage,
        errorElement: <ErrorPage />,
      },
      {
        path: 'login',
        Component: LoginPage,
        errorElement: <ErrorPage />,
      },
      {
        path: 'svg',
        Component: SvgPage,
        errorElement: <ErrorPage />,
      },
      {
        path: 'unauthorized',
        Component: <ErrorPage />,
      },
      {
        path: '',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: 'true',
            element: (
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <HomePage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'calendar',
            element: (
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <CalendarPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'admin',
            children: [
              {
                index: true, // index:true 用以取代 { path: ''}，那麼這個路由，就會是上層路由的預設渲染路由頁面
                element: <Navigate to='create-user' replace />, // 輸入 /create 的話，重新導向顯示 create-user 頁面
              },
              {
                path: 'create-user',
                element: (
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CreateUserPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'pdf',
                element: (
                  <ProtectedRoute>
                    <PdfViewerPage />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          {
            path: 'chat',
            children: [
              {
                index: true,
                element: <Navigate to='new' replace />,
              },
              {
                path: 'new',
                element: (
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'recents',
                element: (
                  <ProtectedRoute>
                    <RecentPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: ':id',
                element: (
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*', // 匹配所有未定義的路由，跳轉錯誤處理
    // element: <Navigate to="/zh-TW" replace />,
    element: <ErrorPage />,
  },
]);

export default router;
