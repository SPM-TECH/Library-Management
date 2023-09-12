import Layout from "../components/Layout";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "@/context/GlobalContext";

const DashboardPage = () => {
  const { accessToken } = useGlobalContext();

  if (accessToken === null) {
    return <Navigate to="/admin" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default DashboardPage;
