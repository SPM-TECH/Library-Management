import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Thankyou from "@/pages/Thankyou";
import DashboardPage from "@/pages/DashboardPage";
import UsersAddpage from "@/pages/UsersAddpage";
import { getServices } from "@/api/service";

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
]);
