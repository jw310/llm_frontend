import { createBrowserRouter } from "react-router";

import DemoPage from "@/pages/DemoPage.jsx";
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
    element: <h1>Login Page</h1>,
  },
  {
    path: "/unauthorized",
    Component: <ErrorPage />,
  },
]);

export default router;
