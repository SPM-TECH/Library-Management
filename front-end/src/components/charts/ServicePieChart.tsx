import { Legend, PieChart, Pie, ResponsiveContainer } from "recharts";
import { useQuery } from "react-query";
import { getServicesCount } from "@/api/admin";
import randomColor from "randomcolor";
import { Skeleton } from "../../components/ui/skeleton";

const ServicePieChart = () => {
  const { data, isLoading } = useQuery("services", getServicesCount);
  let datapie;

  if (data) {
    datapie = data?.map((item) => {
      return { name: item?.service, value: item?.count, fill: randomColor({hue:'blue', luminosity: 'light'}) };
    });
  }

  return (
    <div className="flex flex-auto justify-center ">
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <ResponsiveContainer height={550}>
          <PieChart width={500} height={350}>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "15px",
                marginTop: 50,
                columnCount: 4,
                columnGap: 20,
                display: "flex",
                flexDirection: "row",
                columnSpan: "revert",
              }}
            />
            <Pie
              data={datapie}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={190}
              fill="#8884"
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
        <Skeleton className="lg:w-[350px] lg:h-[350px] w-[200px] h-[200px] rounded-full opacity-25    " />
      </div>
    </div>
  );
};
