import { useState } from "react";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "react-query";
import { addUser } from "@/api/users";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type AddInput = {
  nic_number: string;
  faculty: string;
  index_number: string;
  user_name: string;
};

const AddStudentForm = () => {
  const [input, setInput] = useState<AddInput>({
    nic_number: "",
    faculty: "",
    index_number: "",
    user_name: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const qc = useQueryClient();

  const add = useMutation({
    mutationFn: async () => await addUser(input),
    onSuccess: (data) => {
      qc.setQueryData("student_list", (old: unknown) => {
        if (Array.isArray(old)) {
          return [data, ...old];
        }
      });
      qc.setQueryData("faculty", (old: unknown) => {
        if (Array.isArray(old)) {
          return old.map((d) =>
            d.name === input.faculty ? { ...d, value: d.value + 1 } : d
          );
        }
      });
      setInput({
        nic_number: "",
        faculty: "",
        index_number: "",
        user_name: "",
      });
    },
  });

  const handleClick = () => {
    const validNIC = /\d{9,11}V/i.test(input.nic_number);
    if (!validNIC) {
      setErrMsg("Not a valid nic number");
      return;
    }
    add.mutate();
  };

  return (
    <Card className="w-full md:w-[400px] ">
      <CardHeader>
        <CardTitle>Add User</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4  items-center justify-center   w-full  rounded">
          <h3 className="my-1  text-xl"></h3>
          <Input
            name="nic_number"
            placeholder="NIC Number"
            value={input.nic_number}
            onChange={(e) =>
              setInput((input) => ({
                ...input,
                [e.target.name]: e.target.value.trim(),
              }))
            }
          />
          <Input
            name="user_name"
            placeholder="Name"
            value={input.user_name}
            onChange={(e) =>
              setInput((input) => ({
                ...input,
                [e.target.name]: e.target.value.trim(),
              }))
            }
          />
          <Select
            onValueChange={(val) =>
              setInput((input) => ({ ...input, faculty: val.trim() }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="User Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Animal Science & Export Agriculture">
                Animal Science & Export Agriculture
              </SelectItem>
              <SelectItem
                value="Applied Sciences
"
              >
                Applied Sciences
              </SelectItem>
              <SelectItem
                value="Management Studies
"
              >
                Management Studies
              </SelectItem>
              <SelectItem value="Technological Studies">
                Technological Studies
              </SelectItem>
              <SelectItem value="Medicine">Medicine</SelectItem>
              <SelectItem value="Post Graduates">Post Graduates</SelectItem>
              <SelectItem value="Academic Staff">Academic Staff</SelectItem>
              <SelectItem value="Administrative Staff">
                Administrative Staff
              </SelectItem>
              <SelectItem value="Non Academic Staff">
                Non Academic Staff
              </SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>

          <Input
            name="index_number"
            placeholder="Registration Number"
            value={input.index_number}
            onChange={(e) =>
              setInput((input) => ({
                ...input,
                [e.target.name]: e.target.value.trim(),
              }))
            }
          />

          <Button
            disabled={input.nic_number.length === 0 || add.isLoading}
            onClick={handleClick}
            className="w-[150px] mt-4"
          >
            {add.isLoading && <Loader2 className="animate-spin mr-2" />}
            {add.isLoading ? "Loading" : "Add"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>{errMsg}</CardFooter>
    </Card>
  );
};

export default AddStudentForm;
