// import React from "react";
// import ReactDOM from "react-dom/client";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home/Home";
import "./index.css";
import Admin from "./components/Admin/Admin";
import Employees from "./components/Employees/Employees";
import Products from "./components/Products/Products";
import Waiter from "./components/Waiter/Waiter";
import Chef from "./components/Chef/Chef";
import Orders from "./components/Orders/Orders";
import Footer from "./components/Footer/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
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
  {
    path: "/waiter",
    element: <Waiter />,
  },
  {
    path: "/waiter/orders",
    element: <Orders />,
  },
  {
    path: "/chef",
    element: <Chef />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Footer></Footer>
  </React.StrictMode>
);
