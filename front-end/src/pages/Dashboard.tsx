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
          <div className="bg-slate-800 rounded-xl  shadow-md shadow-slate-900 ">
            <AttendanceBarchart />
          </div>
          <div className="bg-slate-800 rounded-xl shadow-md shadow-slate-900 ">
            <h1 className="text-white p-5">Faculty of users </h1>
            <div className=" flex items-center justify-center w-full px-4">
              <FacultyPieChart />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-md shadow-slate-900 ">
            <h1 className="text-white p-5">Recent users </h1>
            <div className=" flex items-center justify-center w-full px-4">
              <TableDemo />
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl shadow-md shadow-slate-900 ">
            <h1 className="text-white p-5">Services subscribe to </h1>
            <div className=" flex items-center justify-center w-full">
              <ServicePieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
