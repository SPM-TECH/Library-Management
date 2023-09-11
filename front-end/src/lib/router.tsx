import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Thankyou from "@/pages/Thankyou";
import DashboardPage from "@/pages/DashboardPage";
import UsersAddpage from "@/pages/UsersAddpage";
import Feedbacks from "@/pages/Feedbacks";
import AdminLogin from "@/pages/AdminLoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/thankyou",
    element: <Thankyou />,
  },

  {
    path: "/Users",
    element: <UsersAddpage />,
  },
  {
    path: "/Feedbacks",
    element: <Feedbacks />,
  },
  {
    path: "/Admin",
    element: <AdminLogin />,
  },
]);
