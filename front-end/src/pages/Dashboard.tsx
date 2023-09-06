import logo from "../assets/logo.png";
import { Legend, PieChart, Pie } from "recharts";
import { Button } from "@/components/ui/button";
import AttendanceBarchart from "@/components/charts/AttendanceBarchart";

import { LayoutDashboard, LogOut, User } from "lucide-react";
import { TableDemo } from "@/components/Table";
import FacultyPieChart from "@/components/charts/FacultyPieChart";

export default function Dashboard() {
  return (
    <div className=" px-4 bg-[#31353F] ">
      {/* <div className="  bg-[#1B2028]  ">
        <div className="relative flex flex-row top-11 justify-center items-center p-2">
          <img src={logo} className="w-20 h-20" />
          <p className="text-white text-lg">
            Library Management <br />
            System
          </p>
        </div>
        <div className=" top-20 relative flex-col flex items-center gap-y-3">
          <Button
            className="text-white bg-blue-600 w-44 fex flex-row justify-start gap-2"
            variant="ghost"
          >
            <LayoutDashboard />
            Overview
          </Button>
          <Button
            className="text-white  w-44 flex flex-row justify-start gap-2"
            variant="ghost"
          >
            <User />
            Users
          </Button>
          <Button
            className="text-white  w-44 flex flex-row justify-start gap-2"
            variant="ghost"
          >
            <LogOut />
            Sign Out
          </Button>
        </div>
      </div> */}
      <div className="flex flex-col">
        <h1 className="text-white text-3xl p-10 font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  w-full">
          <div className="bg-slate-800 rounded-xl">
            <h1 className="text-white p-5">Attendance Graph </h1>
            <div className=" flex items-center justify-center w-full px-4">
              <AttendanceBarchart />
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl">
            <h1 className="text-white p-5">Faculty </h1>
            <div className=" flex items-center justify-center w-full px-4">
              <FacultyPieChart />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl">
            <h1 className="text-white p-5">Attendance </h1>
            <div className=" flex items-center justify-center w-full px-4">
              <TableDemo />
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl">
            <h1 className="text-white p-5">User </h1>
            <div className=" flex items-center justify-center w-full">
              <FacultyPieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
