import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useMutation, useQueryClient } from "react-query";
import { addFeedback } from "@/api/feedback";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from "react";

type Props = {
  open: boolean;
  close: () => void;
};

const options = [
  "Excellent",
  "Very Good",
  "Good",
  "Satisfactory",
  "Unsatisfactory",
];

const RateService = ({ open, close }: Props) => {
  const { user } = useGlobalContext();

  const [selected, setSelected] = useState("");

  const qc = useQueryClient();

  const feedbackMutation = useMutation({
    mutationFn: async (rating: string) =>
      await addFeedback({ content: rating }, user!.nic_number),
    onSuccess: () => {
      qc.setQueryData("feedback", (old: unknown) => {
        if (Array.isArray(old)) {
          return old.map((e) =>
            e.text === selected ? { ...e, count: e.count + 1 } : e
          );
        }
      });
      close();
    },
  });

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="bg-[#1B2028] text-slate-300">
        <DialogHeader>
          <DialogTitle className="text-slate-300 font-normal text-md">
            How satisfied are you with the library services?
          </DialogTitle>
        </DialogHeader>
        <RadioGroup
          defaultValue={options[1]}
          onValueChange={(e) => {
            setSelected(e);
            feedbackMutation.mutate(e);
          }}
        >
          {options.map((op) => (
            <div className="flex items-center space-x-2" key={op}>
              <RadioGroupItem
                value={op}
                id={op}
                className="border-slate-100 bg-slate-300"
              />
              <Label htmlFor={op} className="text-slate-200">
                {op}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};

export default RateService;
