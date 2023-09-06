import { useQuery } from "react-query";
import { getUserByNic } from "../api/users";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const Thankyou = () => {
  const [input, setInput] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { setUser } = useGlobalContext();

  const { data, isLoading, isRefetching } = useQuery(
    ["user"],
    async () => await getUserByNic(input),
    {
      enabled: enabled,
      onSuccess: (data) => {
        setUser(data.nic_number);
      },
    }
  );

  const handleClick = () => {
    const validNIC = /\d{9,11}V/i.test(input);
    if (!validNIC) {
      setErrMsg("Not a valid nic number");
      return;
    }
    setEnabled(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('./src/assets/bg.png')] bg-cover bg-no-repeat">
      <div className="min-h-content w-screen items-center justify-center flex flex-row absolute top-10 bg-[#1B2028] ">
        <img src={logo} style={{ width: "80px", height: "80px" }} />

        <div className="min-h-content flex flex-col items-center justify-center">
          <h2 className="text-white">Uva Wellassa University Online Library Service  Live Recorder </h2>
          <p className="text-white">Library Service Live Recorder</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-10  bg-opacity-50 w-fit">
        <div className="flex items-center justify-center space-x-3 px-2 sm:px-32 w-full">
           <h1 className="text-white text-center text-3xl font-bold">Reading Makes Your Great<br/> Thank you for visiting the library</h1>
           
           
        </div>
         

        <p className="text-red-600 text-sm my-1 text-center">{errMsg}</p>
      </div>

       
    </div>
  );
};

export default Thankyou;
