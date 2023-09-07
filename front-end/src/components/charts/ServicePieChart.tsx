import { Legend, PieChart, Pie, ResponsiveContainer } from "recharts";
import { useQuery } from "react-query";
import { getServicesCount } from "@/api/admin";
 

const ServicePieChart = () => {
  const { data } = useQuery("services", getServicesCount);
  
  // const dataPie = [
  //   {
  //     name: "Science",
  //     value: data[0].count  || 0,
  //     fill: '#F4BE37'
  //   },
  //   {
  //     name: "Arts",
  //     value: data[1].count || 0,
  //     fill:'#FF9F40'
  //   },
  //   {
  //     name: "Management",
  //     value: data?.count || 0,
  //     fill:'#5388D8'
  //   },
  //   {
  //     name: "Medicine",
  //     value: data?.count || 0,
  //     fill:'#0962B4'
  //   },
  // ];

  return (
    <>
      {data && (
        <ResponsiveContainer height={350}>
          <PieChart width={500} height={350}>
            <Legend />
            <Pie
              data={data}
              dataKey="count"
              nameKey="service"
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

export default ServicePieChart;
