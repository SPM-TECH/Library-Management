import { Legend, PieChart, Pie, ResponsiveContainer } from "recharts";

const datapie = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

const FacultyPieChart = () => {
  return (
    <ResponsiveContainer height={350}>
      <PieChart width={500} height={350}>
        <Legend />
        <Pie
          data={datapie}
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
