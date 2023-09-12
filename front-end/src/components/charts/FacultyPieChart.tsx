import { Legend, PieChart, Pie, ResponsiveContainer } from "recharts";
import { useQuery } from "react-query";
import { getFaculties } from "@/api/admin";
import { Skeleton } from "../../components/ui/skeleton";
import randomColor from "randomcolor";

const FacultyPieChart = () => {
  const { data, isLoading } = useQuery("faculty", getFaculties);

  const dataPie = [
    {
      name: "Animal Science & Export Agriculture",
      value: data?.animal_science || 0,
      fill: randomColor({hue:'blue', luminosity: 'light'}),
    },
    {
      name: "Applied Sciences",
      value: data?.applied_science || 0,
      fill: randomColor({hue:'blue', luminosity: 'light'}),
    },
    {
      name: "Management",
      value: data?.management || 0,
      fill: randomColor({hue:'blue', luminosity: 'light'}),
    },
    {
      name: "Technological Studies",
      value: data?.techno_studies || 0,
      fill: randomColor({hue:'blue', luminosity: 'light'}),
    },
    {
      name: "Medicine",
      value: data?.medicine || 0,
      fill: randomColor({hue:'blue', luminosity: 'light'}),
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
        <Skeleton className="lg:w-[350px] lg:h-[350px] w-[200px] h-[200px] rounded-full opacity-25    " />
      </div>
    </div>
  );
};
