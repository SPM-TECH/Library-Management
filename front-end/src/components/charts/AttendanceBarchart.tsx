import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

import { useQuery } from "react-query";
import { loginCount } from "../../api/admin";

const AttendanceBarchart = () => {
  const { data } = useQuery("loginCount", loginCount);

  return (
    <ResponsiveContainer height={350}>
      <BarChart width={500} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" name="date" />
        <YAxis name="count" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceBarchart;
