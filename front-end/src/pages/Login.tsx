import { useQuery } from "react-query";
import { getUserByNic } from "../api/users";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import logo from "/logo.png";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Loader2 } from "lucide-react";
import useScanDetection from "use-scan-detection";

const Login = () => {
  const [input, setInput] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { setUser } = useGlobalContext();

  const { data, isLoading, isRefetching } = useQuery(
    ["user"],
    async () => await getUserByNic(input.toLowerCase()),
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

  useScanDetection({
    onComplete: (val: unknown) => {
      setInput(val as string);
      setEnabled(true);
      return;
    },
    minLength: 3,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-no-repeat">
      <div className="min-h-content w-screen items-center justify-center flex flex-row absolute top-10 bg-[#1B2028] ">
        <img src={logo} style={{ width: "80px", height: "80px" }} />

        <div className="min-h-content flex flex-col items-center justify-center">
          <h2 className="text-white text-2xl font-semibold">
            Welcome To The Library of UWU
          </h2>
          <p className="text-slate-100 text-xl">
            Library Service Live Recorder (LSLR)
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded p-10  bg-opacity-50 w-full">
        <form className="flex items-center justify-center space-x-3 px-2 sm:px-32 w-full">
          <Input
            className="sm:w-[500px]"
            placeholder="Scan or Enter your ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            disabled={input.length === 0 || isRefetching || isLoading}
            onClick={handleClick}
            className="w-[200px]"
          >
            {isLoading && <Loader2 className="animate-spin mr-2" />}
            {isLoading ? "Loading" : "Login"}
          </Button>
        </form>

        {enabled && !isLoading && !data && input.length > 0 && (
          <p className="text-red-600 text-sm my-1 text-center">
            nic does not exist
          </p>
        )}

        <p className="text-red-600 text-sm my-1 text-center">{errMsg}</p>
      </div>

      <div className="h-12 w-screen  absolute bottom-12 bg-[#1B2028] flex items-center justify-center ">
        <h2 className="text-white text-center">Information Is Power</h2>
      </div>
    </div>
  );
};

export default Login;
