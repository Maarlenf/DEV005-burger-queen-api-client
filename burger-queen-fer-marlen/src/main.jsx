// import React from "react";
// import ReactDOM from "react-dom/client";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/home/App";
import "./index.css";
import Admin from "./components/Admin/Admin";
import Employees from "./components/Employees/Employees";
import Products from "./components/Products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //   pat: "*",
  //   element:
  // },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/employees",
    element: <Employees />,
  },
  {
    path: "/admin/products",
    element: <Products />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
