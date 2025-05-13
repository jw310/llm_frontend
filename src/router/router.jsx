import { createBrowserRouter } from "react-router";

import DemoPage from "@/pages/DemoPage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import ErrorPage from "@/pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
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
]);

export default router;
