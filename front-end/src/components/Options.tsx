import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useGlobalContext } from "../context/GlobalContext";
import { Card, CardContent } from "./ui/card";

type Props = {
  Icon: LucideIcon;
  name: string;
  id: number;
};

export default function Options({ Icon, name, id }: Props) {
  const [selected, setSelected] = useState(false);

  const { addService, removeService } = useGlobalContext();

  const onClick = () => {
    if (selected === false) {
      addService(id);
      setSelected(true);
    } else {
      removeService(id);
      setSelected(false);
    }
  };

  return (
    <Card
      className={cn(
        ` dark:hover:bg-zinc-800 py-4 cursor-pointer transition-colors  bg-white hover:bg-gray-300 ${
          selected ? " bg-gray-300 dark:bg-zinc-900" : "dark:bg-zinc-700 "
        }`
      )}
      onClick={() => onClick()}
    >
      <CardContent>
        <div>
          <div className="flex flex-col items-center justify-center">
            <Icon className="h-6 w-6  block mb-1" />

            <p className=" ">{name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
