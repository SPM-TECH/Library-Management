import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import logo from "../assets/logo.png";

type Props = {
  
  isOpen: boolean;
  setIsOpen:Function
};

export default function Drawer({  isOpen, setIsOpen }:Props) {
console.log(isOpen)
  
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 -translate-x-full  ")
      }
    >
      <section
        className={
          " w-80 max-w-lg   absolute bg-gray-700 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " -translate-x-full ")
        }
      >
        <article className="relative w-80 max-w-lg pb-10 flex flex-col space-y-6  h-full">
         
          <div className="relative flex flex-row top-11  items-center p-2">
          <img src={logo} className="w-20 h-20" />
          <p className="text-white text-lg">
            Library Management <br />
            System
          </p>
        </div>
        <div className=" top-20 relative flex-col flex  gap-y-3">
          <Button
            className="text-white bg-blue-600 w-44 fex flex-row justify-start gap-2"
            variant="ghost"
          >
            <LayoutDashboard />
            Overview
          </Button>
          <Button
            className="text-white  w-44 flex flex-row justify-start gap-2"
            variant="ghost"
          >
            <User />
            Users
          </Button>
          <Button
            className="text-white  w-44 flex flex-row justify-start gap-2"
            variant="ghost"
          >
            <LogOut />
            Sign Out
          </Button>
        </div>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
