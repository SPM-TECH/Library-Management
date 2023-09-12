import { useMutation } from "react-query";
import { addUser } from "../api/users";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Loader2 } from "lucide-react";

const UsersAddpage = () => {
  const [input, setInput] = useState({
    nic_number: "",
    faculty: "",
    index_number: "",
    user_name: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const add = useMutation({
    mutationFn: async () => await addUser(input),
    onSuccess: () => {
      setInput({
        nic_number: "",
        faculty: "",
        index_number: "",
        user_name: "",
      });
    },
  });

  const handleClick = () => {
    //console.log(input)
    const validNIC = /\d{9,11}V/i.test(input.nic_number);
    if (!validNIC) {
      setErrMsg("Not a valid nic number");
      return;
    }
    add.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center   bg-cover bg-no-repeat">
      <div className="   bg-opacity-50 w-full">
        <div className="flex flex-col  items-center justify-center w-full">
          <form className="flex flex-col space-y-4  items-center justify-center bg-[#374151] px-6 py-8 w-full sm:w-[500px] rounded">
            <h3 className="my-1 text-white text-xl">Add Student</h3>
            <Input
              name="nic_number"
              placeholder="NIC Number"
              value={input.nic_number}
              onChange={(e) =>
                setInput((input) => ({
                  ...input,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <Input
              name="user_name"
              placeholder="Enter The Name"
              value={input.user_name}
              onChange={(e) =>
                setInput((input) => ({
                  ...input,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <Select
              onValueChange={(val) =>
                setInput((input) => ({ ...input, faculty: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Faculty" />
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
                  value="Management
"
                >
                  Management
                </SelectItem>
                <SelectItem value="Technological Studies">
                  Technological Studies
                </SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
              </SelectContent>
            </Select>

            <Input
              name="index_number"
              placeholder="Index Number"
              value={input.index_number}
              onChange={(e) =>
                setInput((input) => ({
                  ...input,
                  [e.target.name]: e.target.value,
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
        </div>

        <p className="text-red-600 text-sm my-1 text-center">{errMsg}</p>
      </div>
    </div>
  );
};

export default UsersAddpage;
