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
import { useMutation } from "react-query";
import { addOptions } from "@/api/users";
import { useGlobalContext } from "@/context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";
import { addFeedback } from "@/api/feedback";
import { useRouteLoaderData } from "react-router-dom";
import { Service } from "@/api/service";

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
  const [feedback, setFeedback] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const data = useRouteLoaderData("dashboard") as Service[];

  const { selectedServices, user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const optionMutation = useMutation({
    mutationFn: async () => await addOptions(user, selectedServices),
    onSuccess: () => {
      setUser("");
      navigate("/thankyou");
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async () => await addFeedback({ content: feedback }, user),
    onSuccess: () => {
      setFeedback("");
      setSuccessMsg("Successfully posted your feedback");
    },
  });

  return (
    <div>
      <div className="w-full px-4 flex flex-col items-center">
        <h4 className="text-white mt-3 mb-1">Welcome {user},</h4>
        <h5 className="text-slate-200 ">Please select your options</h5>
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

        <div className="py-1 px-4 mb-6">
          <h5 className="text-white text-lg">Give us a feedback</h5>
          <form className=" gap-3 items-center flex flex-col">
            <Textarea
              placeholder="Enter your Feedback About Our Services"
              className="w-full sm:w-[600px]"
              rows={6}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button
              onClick={() => feedbackMutation.mutate()}
              className="w-[250px]"
              disabled={feedback.length === 0 || feedbackMutation.isLoading}
            >
              {feedbackMutation.isLoading && (
                <Loader2 className="animate-spin mr-1" />
              )}
              {feedbackMutation.isLoading ? "Submitting.." : "Submit"}
            </Button>
          </form>
          <p className="text-lime-400 my-1 text-sm">{successMsg}</p>
        </div>
      </div>
    </div>
  );
}
