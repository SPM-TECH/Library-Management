import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Thankyou from "@/pages/Thankyou";
import DashboardPage from "@/pages/DashboardPage";

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
]);
