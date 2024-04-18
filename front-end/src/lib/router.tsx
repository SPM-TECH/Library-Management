import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import Thankyou from "../pages/Thankyou";
import DashboardPage from "../pages/DashboardPage";
import UsersAddpage from "../pages/UsersAddpage";
import { getServices } from "../api/service";
import AdminLogin from "../pages/AdminLoginPage";
import Feedbacks from "../pages/Feedbacks";
import Dashboard from "../pages/Dashboard";

const adminAccess = localStorage.getItem("lib-token") === "access_token";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "dashboard",
    loader: async () => {
      return await getServices();
    },
  },
  {
    path: "/dashboard",
    element: adminAccess ? <DashboardPage /> : <Navigate to="/admin" />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "users",
        element: <UsersAddpage />,
      },
      {
        path: "feedbacks",
        element: <Feedbacks />,
      },
    ],
  },
  {
    path: "/thankyou",
    element: <Thankyou />,
  },

  {
    path: "/admin",
    element: <AdminLogin />,
  },
]);
