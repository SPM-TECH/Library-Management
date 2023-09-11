import { Button } from "../components/ui/button";
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
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Textarea } from "../components/ui/textarea"


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
  const { selectedServices, user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const optionMutation = useMutation({
    mutationFn: async () => await addOptions(user, selectedServices),
    onSuccess: () => {
      setUser("");
      navigate("/thankyou");
    },
  });


  const handleCommentSubmit=()=>{
    
  }

  return (
    <div>
      <div className="w-full px-4 flex flex-col items-center gap-y-5">
        <h4 className="text-white my-2">
          Welcome {user}, Please select your options
        </h4>
        <div className=" w-full   mt-8 grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-4">
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
            className="w-[300px]"
            onClick={() => optionMutation.mutate()}
          >
            {optionMutation.isLoading && (
              <Loader2 className="animate-spin mr-2" />
            )}
            {optionMutation.isLoading ? "Submitting.." : "Submit Your Choices"}
          </Button>

         
        </div>
        <form onSubmit={()=>handleCommentSubmit()} className=" gap-3 items-center flex flex-col">
          <Textarea placeholder="Enter your Feedback About Our Service" className="w-[700px]"/>
          <Button type="submit">Submit</Button>

          </form>
      </div>
    </div>
  );
}
