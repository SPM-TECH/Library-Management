import { LayoutDashboard, LogOut, User } from "lucide-react";
import logo from "/logo.png";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Drawer({ isOpen, setIsOpen }: Props) {
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
          <div className=" flex flex-col  items-center py-4">
            <img src={logo} className="h-20" />
            <p className="text-white text">Library Management System</p>
          </div>
          <div className="px-4">
            <div className="text-white flex flex-row justify-start gap-2 py-2 border-b-[1px]  border-slate-400">
              <LayoutDashboard />
              <p className="text-md font-light">Overview</p>
            </div>
            <div className="text-white flex flex-row justify-start gap-2 py-2 border-b-[1px]  border-slate-400">
              <User />
              <p className="text-md font-light">Users</p>
            </div>
            <div className="text-white flex flex-row justify-start gap-2 py-2 border-b-[1px]  border-slate-400">
              <LogOut />
              <p className="text-md font-light">Sign Out</p>
            </div>
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
