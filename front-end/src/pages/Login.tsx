import { useQuery } from "react-query";
import { getUsers } from "../api/users";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import bg  from '../assets/bg.png'
import logo from '../assets/logo.png'

const Login = () => {
  const { data } = useQuery("users", getUsers);

  return (
     
    <div className="min-h-screen flex items-center justify-center bg-[url('./src/assets/bg.png')] bg-cover bg-no-repeat">
    <div className="min-h-content w-screen items-center justify-center flex flex-row absolute top-10 bg-[#1B2028] ">
    <img src={logo} style={{width:'80px',height:'80px'}}/>

    
    <div className="min-h-content flex flex-col items-center justify-center">
      <h2 className="text-white">Welcom To The Library of UWU</h2>
      <p className="text-white">Library Service Live Recorder</p>

    </div>
    </div>
    
    <div className="bg-slate-900 rounded p-10  bg-opacity-50">
     <form onSubmit={()=>{console.log('hello')}} className="flex items-center justify-center space-x-3"> 
     <Input className="w-[500px] " placeholder="Enter Your ID or Enter Your NIC Number"/>
     <Button>Login </Button>
     </form>
     </div>

     <div className="h-12 w-screen items-center justify-center flex flex-row absolute bottom-12 bg-[#1B2028] ">
    

    
     
      <h2 className="text-white">"Information Is Power</h2>
      

   
    </div>
     
    </div>
   
  );
};

export default Login;
