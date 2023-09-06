import { Legend, PieChart, Pie, ResponsiveContainer } from "recharts";
import { useQuery } from "react-query";
import { getFaculties } from "@/api/admin";

const FacultyPieChart = () => {
  const { data } = useQuery("faculty", getFaculties);

  const dataPie = [
    {
      name: "Science",
      value: data?.science || 0,
    },
    {
      name: "Arts",
      value: data?.arts || 0,
    },
    {
      name: "Management",
      value: data?.management || 0,
    },
    {
      name: "Medicine",
      value: data?.medicine || 0,
    },
  ];

  return (
    <ResponsiveContainer height={350}>
      <PieChart width={500} height={350}>
        <Legend />
        <Pie
          data={dataPie}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FacultyPieChart;
