import logo from "../assets/logo.png";
import overview from "../assets/overview.png";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  PieChart,
  Pie,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Airplay,
  BookOpen,
  BookOpenCheck,
  GanttChart,
  Globe,
  Info,
  LayoutDashboard,
  LogOut,
  Microscope,
  MoreHorizontal,
  Newspaper,
  User,
  Wifi,
} from "lucide-react";
import Options from "../components/Options";
import { TableDemo } from "@/components/Table";

const options = [
  {
    icon: BookOpenCheck,
    name: "Borrow Books",
    color: "bg-gray-600",
  },
  {
    icon: BookOpen,
    name: "Reference & Read",
    color: "bg-gray-600",
  },
  {
    icon: Airplay,
    name: "V/R Studio",
    color: "bg-gray-600",
  },
  {
    icon: Newspaper,
    name: "News paper Reading",
    color: "bg-gray-600",
  },
  {
    icon: Microscope,
    name: "Research Work /Support",
    color: "bg-gray-600",
  },
  {
    icon: GanttChart,
    name: "Periodics/Thesis",
    color: "bg-gray-600",
  },
  {
    icon: Globe,
    name: "E-Book&ICT",
    color: "bg-gray-600",
  },
  {
    icon: Info,
    name: "Information Commons",
    color: "bg-gray-600",
  },
  {
    icon: Wifi,
    name: "Wifi/Entertainment",
    color: "bg-gray-600",
  },
  {
    icon: MoreHorizontal,
    name: "Other Services",
    color: "bg-gray-600",
  },
  // {
  //   icon: "",
  //   name: "Others Services",
  //   color: "bg-gray-600",
  // },
  // {
  //   icon: "",
  //   name: "Submit",
  //   color: "bg-indigo-700",
  // },
];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];
const datapie = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#31353F] flex flex-row space-x-3 overflow-hidden">
      <div className="  bg-[#1B2028]  ">
        <div className="relative flex flex-row top-11 justify-center items-center p-2">
          <img src={logo} className="w-20 h-20" />
          <p className="text-white text-lg">Library Management <br/>System</p>
        </div>
        <div className=" top-20 relative flex-col flex items-center gap-y-3">
          <Button className="text-white bg-blue-600 w-44 fex flex-row justify-start gap-2" variant="ghost">
          <LayoutDashboard />
          Overview
            
          </Button>
          <Button className="text-white  w-44 flex flex-row justify-start gap-2" variant="ghost">
          <User />
          Users
          </Button>
          <Button className="text-white  w-44 flex flex-row justify-start gap-2" variant="ghost">
            <LogOut />
                Sign Out
            </Button>
          
        </div>
         
        
      </div>
      <div className="grid lg:grid-cols-2 gap-11 m-10 md:grid-cols-1">
         
          <div className="bg-slate-800    container   rounded-xl flex justify-center items-end ">
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </div>
          <div className="bg-slate-800  container   rounded-xl flex justify-center items-end ">
            <PieChart width={330} height={350}>
              <Legend />
              <Pie
                data={datapie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              />
            </PieChart>
          </div>
        
         
          <div className="bg-slate-800  container   rounded-xl flex flex-col justify-center   ">
            <h1 className="text-white p-5">Attendance </h1>
            <TableDemo/>
          </div>
          <div className="bg-slate-800   container   rounded-xl flex justify-center  items-center ">
            <PieChart width={330} height={350}>
              <Legend />
              <Pie
                data={datapie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              />
            </PieChart>
          </div>
         
      </div>
    </div>
  );
}
