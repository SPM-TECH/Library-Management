import { createBrowserRouter } from "react-router-dom";
import Optionpannel from "../pages/Optionpannel";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Optionpannel />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
]);
