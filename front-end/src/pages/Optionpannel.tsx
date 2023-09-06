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
import { useQuery } from "react-query";
import { getServices } from "@/api/service";

const options = [
  BookOpenCheck,
  BookOpen,
  Airplay,
  Newspaper,
  Microscope,
  GanttChart,
  Globe,
  Info,
  Wifi,
];

export default function Optionpannel() {
  const { data } = useQuery("services", getServices);

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
          {data &&
            data.map((item, index) => {
              return (
                <Options
                  name={item.name}
                  Icon={options[index]}
                  key={item.name}
                />
              );
            })}
          <Options name="Other" Icon={MoreHorizontal} />
        </div>
      </div>
    </div>
  );
}
