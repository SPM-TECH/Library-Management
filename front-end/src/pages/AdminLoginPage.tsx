import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import logo from "/logo.png";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Loader2 } from "lucide-react";

import { login } from "@/api/admin";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const { setAccessToken } = useGlobalContext();

  const loginMutation = useMutation({
    mutationFn: async () => await login(username.trim(), password.trim()),
    onSuccess: (data) => {
      localStorage.setItem("lib-token", data.access_token);
      setAccessToken(data.access_token);
      navigate("/dashboard");
    },
    onError: () => setErrMsg("an error occurred"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-no-repeat">
      <div className="min-h-content w-screen items-center justify-center flex flex-row absolute top-10 bg-[#1B2028] ">
        <img src={logo} style={{ width: "80px", height: "80px" }} />

        <div className="min-h-content flex flex-col items-center justify-center">
          <h2 className="text-white ">Welcome To The Library of UWU</h2>
          <p className="text-white">Library Service Live Recorder</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded p-10  bg-opacity-50 w-full">
        <form className="flex flex-col items-center justify-center  gap-3 sm:px-32 w-full">
          <Input
            className="sm:w-[500px]"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            className="sm:w-[500px]"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            disabled={username.length === 0 || password.length === 0}
            onClick={(e) => {
              e.preventDefault();
              loginMutation.mutate();
            }}
            className="w-[200px]"
          >
            {loginMutation.isLoading && (
              <Loader2 className="animate-spin mr-2" />
            )}
            {loginMutation.isLoading ? "Loading" : "Login"}
          </Button>
        </form>

        <p className="text-red-600 text-sm my-1 text-center">{errMsg}</p>
      </div>

      <div className="h-12 w-screen  absolute bottom-12 bg-[#1B2028] flex items-center justify-center ">
        <h2 className="text-white text-center">Information Is Power</h2>
      </div>
    </div>
  );
};

export default AdminLogin;
