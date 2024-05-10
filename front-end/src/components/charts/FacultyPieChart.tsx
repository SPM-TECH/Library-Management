import { Legend, PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "react-query";
import { getFaculties } from "@/api/admin";
import { Skeleton } from "../../components/ui/skeleton";
import randomColor from "randomcolor";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useCallback } from "react";

const FacultyPieChart = () => {
  const { data, isLoading } = useQuery("faculty", getFaculties);

  const getPieData = useCallback(() => {
    if (!data) {
      return [];
    }
    return data.map((d) => ({
      ...d,
      fill: randomColor({ hue: "blue", luminosity: "light" }),
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category of users</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonComp />
        ) : (
          <ResponsiveContainer height={350}>
            <PieChart height={350}>
              <Legend />
              <Tooltip />
              <Pie
                data={getPieData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default FacultyPieChart;

const SkeletonComp = () => {
  return (
    <div>
      <div className="flex flex-row lg:gap-x-6 items-end m-10 eas ">
        <Skeleton className="lg:w-[350px] lg:h-[350px] w-[200px] h-[200px] rounded-full opacity-25    " />
      </div>
    </div>
  );
};
