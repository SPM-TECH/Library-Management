import { Legend, PieChart, Pie, ResponsiveContainer } from "recharts";
import { useQuery } from "react-query";
import { getFaculties } from "@/api/admin";
import { Skeleton } from "../../components/ui/skeleton";

const FacultyPieChart = () => {
  const { data, isLoading } = useQuery("faculty", getFaculties);

  const dataPie = [
    {
      name: "Animal Science & Export Agriculture",
      value: data?.animal_science || 0,
      fill: "#F4BE37",
    },
    {
      name: "Applied Sciences",
      value: data?.applied_science || 0,
      fill: "#FF9F40",
    },
    {
      name: "Management",
      value: data?.management || 0,
      fill: "#5388D8",
    },
    {
      name: "Medicine",
      value: data?.medicine || 0,
      fill: "#0962B4",
    },
    {
      name: "Technological Studies",
      value: data?.techno_studies || 0,
      fill: "#096211",
    },
  ];

  return (
    <>
      {isLoading ? (
        <SkeletonComp />
      ) : (
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
      )}
    </>
  );
};

export default FacultyPieChart;

const SkeletonComp = () => {
  return (
    <div>
      <div className="flex flex-row lg:gap-x-6 items-end m-10 eas ">
        <Skeleton className="lg:w-[250px] lg:h-[250px] w-[50px] h-[50px] rounded-full opacity-25    " />
      </div>
    </div>
  );
};
