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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            How satisfied are you with the library services?
          </DialogTitle>
        </DialogHeader>
        <RadioGroup
          onValueChange={(e) => {
            setSelected(e);
            feedbackMutation.mutate(e);
          }}
        >
          {options.map((op) => (
            <div className="flex items-center space-x-2" key={op}>
              <RadioGroupItem value={op} id={op} />
              <Label htmlFor={op}>{op}</Label>
            </div>
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};

export default RateService;
