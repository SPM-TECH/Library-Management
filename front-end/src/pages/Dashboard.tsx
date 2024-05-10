import AttendanceBarchart from "../components/charts/AttendanceBarchart";
import { TableDemo } from "../components/Table";
import FacultyPieChart from "../components/charts/FacultyPieChart";
import ServicePieChart from "../components/charts/ServicePieChart";

export default function Dashboard() {
  return (
    <div className="  ">
      <div className="flex flex-col">
        <h1 className="text-white text-2xl my-4 font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 w-full">
          <div>
            <AttendanceBarchart />
          </div>
          <div>
            <FacultyPieChart />
          </div>

          <div>
            <TableDemo />
          </div>
          <div>
            <ServicePieChart />
          </div>
        </div>
      </div>
    </div>
  );
}
