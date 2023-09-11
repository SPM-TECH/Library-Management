import { useQuery } from "react-query";
import { addUser } from "../api/users";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import Layout from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const UsersAddpage = () => {
  const [input, setInput] = useState({
    nic_number: "",
    faculty: "",
    index_number: "",
    user_name: "",
  });
  const [enabled, setEnabled] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { setUser } = useGlobalContext();

  const { data, isLoading, isRefetching } = useQuery(
    ["user"],
    async () => await addUser(input),
    {
      enabled: enabled,
      onSuccess: (data) => {
        setUser(data.nic_number);
      },
    }
  );

  const handleClick = () => {
    //console.log(input)
    const validNIC = /\d{9,11}V/i.test(input.nic_number);
    if (!validNIC) {
      setErrMsg("Not a valid nic number");
      return;
    }
    setEnabled(true);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center   bg-cover bg-no-repeat">
        <div className=" rounded p-10  bg-opacity-50 w-full">
          <div className="flex flex-col p-6 space-y-4 items-center justify-center    sm:px-32 w-full">
            <Input
              name="nic_number"
              className="sm:w-[500px]"
              placeholder="Enter the NIC number"
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
              className="sm:w-[500px]"
              placeholder="Enter The Name"
              value={input.user_name}
              onChange={(e) =>
                setInput((input) => ({
                  ...input,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <Select onValueChange={(val)=>setInput((input)=>({...input,'faculty':val}))}>
              <SelectTrigger className="sm:w-[500px]">
                <SelectValue placeholder="Faculty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Faculty of Animal Science & Export Agriculture">
                  Faculty of Animal Science & Export Agriculture
                </SelectItem>
                <SelectItem
                  value="Faculty of Applied Sciences
"
                >
                  Faculty of Applied Sciences
                </SelectItem>
                <SelectItem
                  value="Faculty of Management
"
                >
                  Faculty of Management
                </SelectItem>
                <SelectItem value="Faculty of Technological Studies">
                  Faculty of Technological Studies
                </SelectItem>
                <SelectItem
                  value="Faculty of Medicine
"
                >
                  Faculty of Medicine
                </SelectItem>
              </SelectContent>
            </Select>

            <Input
              className="sm:w-[500px]"
              name="index_number"
              placeholder="Enter The Indexnumber"
              value={input.index_number}
              onChange={(e) =>
                setInput((input) => ({
                  ...input,
                  [e.target.name]: e.target.value,
                }))
              }
            />

            <Button
              disabled={
                input.nic_number.length === 0 || isRefetching || isLoading
              }
              onClick={handleClick}
            >
              {isLoading ? "Loading" : "Add"}
            </Button>
          </div>
          {enabled && !isLoading && !data && input.nic_number.length > 0 && (
            <p className="text-red-600 text-sm my-1 text-center">
              User Already exist!
            </p>
          )}

          <p className="text-red-600 text-sm my-1 text-center">{errMsg}</p>
        </div>
      </div>
    </Layout>
  );
};

export default UsersAddpage;
