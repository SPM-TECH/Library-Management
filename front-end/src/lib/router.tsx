import { createBrowserRouter } from "react-router-dom";
import Optionpannel from "../pages/Optionpannel";
import Login from "@/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Optionpannel />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
