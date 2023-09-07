import { Legend, PieChart, Pie, ResponsiveContainer } from "recharts";
import { useQuery } from "react-query";
import { getServicesCount } from "@/api/admin";
import randomColor from "randomcolor";
import { Skeleton } from "../../components/ui/skeleton";

const ServicePieChart = () => {
  const { data, isLoading } = useQuery("services", getServicesCount);

  return (
    <div className="flex flex-auto justify-center ">
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <ResponsiveContainer height={550}  >
          <PieChart width={500} height={350} >
            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{fontSize: "20px"}} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="service"
              cx="65%"
              cy="60%"
              outerRadius={200}
              fill="#8884d8"
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ServicePieChart;

const SkeletonComp = () => {
  return (
    <div>
      <div className="flex flex-row lg:gap-x-6 items-end m-10 eas ">
        <Skeleton className="lg:w-[250px] lg:h-[250px] w-[50px] h-[50px] rounded-full opacity-25    " />
      </div>
    </div>
  );
};
