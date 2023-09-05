import React from "react";
import logo from '../assets/logo.png'

export default function Drawer({ }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out transition-opacity opacity-100 duration-500 translate-x-0 "
      }
    >
      <section
        className={
          " w-fit max-w-lg  absolute bg-[#1B2028] h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform translate-x-0 "  
         
        }
      >
        <article className="relative   max-w-lg pb-10 flex flex-col space-y-6   h-full">
        <div className=" flex flex-row  justify-center items-center">
          <img src={logo} className="w-20 h-20" />
          <p className="text-white text-xs">Library Management System</p>
        </div>
        </article>
      </section>
       
    </main>
  );
}
