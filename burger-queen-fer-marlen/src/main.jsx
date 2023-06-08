import App from './components/home/App'
import Employees from './components/Employees/Employess';
import Admin from './components/Admin/Admin'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },{
    path: "*",
    element: <Navigate to='/' replace />
  },
  {
    path: "/admin",
    element: <Admin />,
    },{
      path: "/admin/employees",
      element: <Employees />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);