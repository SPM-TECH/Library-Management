import { Button } from "../components/ui/button";
import {
  Airplay,
  BookOpenCheck,
  GanttChart,
  Microscope,
  Newspaper,
  Wifi,
  MoreHorizontal,
  BookMarked,
  School,
} from "lucide-react";
import Options from "../components/Options";
import { useMutation } from "react-query";
import { addOptions } from "@/api/users";
import { useGlobalContext } from "@/context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useRouteLoaderData } from "react-router-dom";
import { Service } from "@/api/service";
import { ModeToggle } from "@/components/ThemeToggle";

const options = [
  BookOpenCheck,
  BookMarked,
  Airplay,
  Microscope,
  Newspaper,
  Wifi,
  GanttChart,
  School,
  MoreHorizontal,
];

export default function Optionpannel() {
  const data = useRouteLoaderData("dashboard") as Service[];

  const { selectedServices, user } = useGlobalContext();
  const navigate = useNavigate();

  const optionMutation = useMutation({
    mutationFn: async () =>
      await addOptions(user!.nic_number, selectedServices),
    onSuccess: () => {
      navigate("/thankyou");
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className=" mt-3 mb-1">
          Welcome <span className="font-semibold">{user?.user_name}</span>
        </h4>
        <ModeToggle />
      </div>
      <div className="w-full px-4 flex flex-col items-center">
        <h5 className="text-2xl font-semibold">
          Your purpose of visiting the library
        </h5>
        <div className=" w-full   mt-8 grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data &&
            data.map((item, index) => {
              return (
                <Options
                  name={item.name}
                  Icon={options[index] ? options[index] : MoreHorizontal}
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
            className="w-[300px]"
            onClick={() => optionMutation.mutate()}
          >
            {optionMutation.isLoading && (
              <Loader2 className="animate-spin mr-2" />
            )}
            {optionMutation.isLoading ? "Submitting.." : "Submit Your Choices"}
          </Button>
        </div>
      </div>
    </div>
  );
}
