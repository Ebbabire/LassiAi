import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout";
import Cases from "./pages/case/Cases";

// route config
export const router = createBrowserRouter([
  {
    path: "/cases",
    element: <Layout />,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [
      {
        index: true,
        element: <Cases />,
      },
    ],
  },
  {
    // Catch-all 404
    path: "*",
    element: <Navigate to="/cases" replace />,
  },
]);
