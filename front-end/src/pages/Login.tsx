import { useQuery } from "react-query";
import { getUserByNic } from "../api/users";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import logo from "/logo.png";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { LayoutDashboard, Loader2 } from "lucide-react";
import useScanDetection from "use-scan-detection";
import { ModeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

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
        setUser(data);
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

  //bg-[url('/bg-books.jpg')] bg-cover bg-no-repeat

  return (
    <div className="min-h-screen   ">
      <div className="py-2 absolute top-2 w-full flex items-center justify-between px-2">
        <ModeToggle />
        <Link to="dashboard">
          <Button>
            <LayoutDashboard className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center  h-screen">
        <div className=" rounded p-10 bg-white  dark:bg-black dark:bg-opacity-50  bg-opacity-50 w-full">
          <div className=" flex flex-col items-center  my-10">
            <div className="p-8 rounded-full mb-6 bg-slate-50 dark:bg-gray-700">
              <img src={logo} style={{ width: "120px", height: "120px" }} />
            </div>
            <h2 className=" text-2xl font-semibold">
              Welcome To The UWU Library
            </h2>
            <p className="text-xl">Library Service Live Recorder (LSLR)</p>
          </div>
          <form className="flex items-center justify-center space-x-3 px-2 sm:px-32 w-full">
            <Input
              className="sm:w-[500px]"
              placeholder="Scan or Enter your ID"
              type="text"
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
    </div>
  );
};

export default Login;
