import { Legend, PieChart, Pie, ResponsiveContainer } from "recharts";
import { useQuery } from "react-query";
import { getServicesCount } from "@/api/admin";

const ServicePieChart = () => {
  const { data } = useQuery("services", getServicesCount);

  return (
    <>
      {data && (
        <ResponsiveContainer height={350}>
          <PieChart width={500} height={350}>
            <Legend />
            <Pie
              data={data}
              dataKey="count"
              nameKey="service"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default ServicePieChart;
