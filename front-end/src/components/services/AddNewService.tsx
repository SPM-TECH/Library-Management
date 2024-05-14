import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "react-query";
import { createService } from "@/api/service";
import { Loader2 } from "lucide-react";

const AddNewService = () => {
  const [input, setInput] = useState("");

  const qc = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => createService(input),
    onSuccess: (data) => {
      qc.setQueryData("settings", (old: unknown) => {
        if (Array.isArray(old)) {
          return [...old, data];
        }
      });
      setInput("");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new option</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Option Name"
        />
        <div className="flex items-end justify-end mt-2">
          <Button onClick={() => mutate()}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddNewService;
