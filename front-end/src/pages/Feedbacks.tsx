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
import { Card, CardContent } from "@/components/ui/card";

export default function Feedbacks() {
  const { data, isLoading } = useQuery("feedback", getFeedbacks);

  return (
    <div>
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <div className="flex flex-col">
          <h1 className=" text-2xl m-5 font-bold">Feedbacks</h1>
          {data && (
            <Card className="w-full md:w-1/2">
              <CardContent>
                <ResponsiveContainer height={500}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="text" name="level" />
                    <YAxis name="user count" label="user count" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

const SkeletonComp = () => {
  return <Skeleton className="lg:h-[100px] h-[50px] w-1/2 rounded " />;
};
