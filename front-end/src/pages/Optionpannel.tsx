import logo from "../assets/logo.png";
import overview from "../assets/overview.png";

import { Button } from "@/components/ui/button";
import {
  Airplay,
  BookOpen,
  BookOpenCheck,
  GanttChart,
  Globe,
  Info,
  Microscope,
  MoreHorizontal,
  Newspaper,
  Wifi,
} from "lucide-react";
import Options from "../components/Options";

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
 
export default function Optionpannel() {
    
  return (
    <div className="min-h-screen bg-[#31353F] flex flex-row space-x-3">
      <div className="w-56  h-screen bg-[#1B2028]  ">
        <div className="relative flex flex-row top-11 justify-center items-center">
          <img src={logo} className="w-20 h-20" />
          <p className="text-white text-xs">Library Management System</p>
        </div>
        <div className="flex relative top-20 flex-row   p-5">
          <Button className="text-white bg-blue-600 w-44 gap-2" variant="ghost">
            <img src={overview} />
            Overview
          </Button>
        </div>
      </div>
      <div className="w-full px-4">
        <div className=" w-full   mt-20  grid grid-cols-2 md:grid-cols-3 gap-4">
          {options.map((item) => {
            return <Options name={item.name} Icon={item.icon}  key={item.name}/>;
          })}
        </div>
      </div>
    </div>
  );
}
