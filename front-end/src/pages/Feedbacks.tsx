import { useQuery } from "react-query";
import { getFeedbacks } from "@/api/feedback";
import { Skeleton } from "../components/ui/skeleton";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Feedbacks() {
  const { data, isLoading } = useQuery("feedback", getFeedbacks);

  return (
    <div>
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <div className="flex flex-col">
          <h1 className="text-white text-2xl m-5 font-bold">Feedbacks</h1>
          {data && (
            <div className="flex items-center justify-center max-w-[600px]">
              <ResponsiveContainer height={450}>
                <BarChart width={600} height={450} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="text" name="level" />
                  <YAxis name="user count" label="user count" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SkeletonComp = () => {
  return (
    <Skeleton className="lg:h-[60px] h-[30px] w-full rounded opacity-25" />
  );
};
