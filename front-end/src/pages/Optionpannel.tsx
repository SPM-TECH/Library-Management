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
  Newspaper,
  Wifi,
  MoreHorizontal,
} from "lucide-react";
import Options from "../components/Options";
import { useQuery, useMutation } from "react-query";
import { getServices } from "@/api/service";
import { addOptions } from "@/api/users";
import { useGlobalContext } from "@/context/GlobalContext";
 

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
  MoreHorizontal,
];
 
export default function Optionpannel() {
  const { data } = useQuery("services", getServices);
  const { selectedServices, user } = useGlobalContext();

  const optionMutation = useMutation({
    mutationFn: async () => await addOptions(user, selectedServices),
    onSuccess: (data) => {
      console.log(data);
    },
  });

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
        <h4 className="text-white my-2">
          Welcome {user}, Please select your options
        </h4>
        <div className=" w-full   mt-20  grid grid-cols-2 md:grid-cols-3 gap-4">
          {data &&
            data.map((item, index) => {
              return (
                <Options
                  name={item.name}
                  Icon={options[index]}
                  key={item.name}
                  id={item.id}
                />
              );
            })}
        </div>
        <div className="flex items-center justify-center py-3 mt-4">
          <Button
            size="lg"
            disabled={selectedServices.length === 0}
            className="bg-blue-800"
            onClick={() => optionMutation.mutate()}
          >
            Submit Your Choices
          </Button>
        </div>
      </div>
    </div>
  );
}
