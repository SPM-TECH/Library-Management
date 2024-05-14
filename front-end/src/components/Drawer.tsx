import {
  LayoutDashboard,
  LogOutIcon,
  User,
  TextQuote,
  Settings,
} from "lucide-react";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Drawer({ isOpen, setIsOpen }: Props) {
  const { setAccessToken } = useGlobalContext();
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("lib-token");
    setAccessToken(null);
    navigate("/admin");
  };

  return (
    <main
      className={
        " fixed overflow-hidden z-10  bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 -translate-x-full  ")
      }
    >
      <section
        className={
          " w-80 max-w-lg bg-slate-100 dark:bg-slate-900 absolute  h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " -translate-x-full ")
        }
      >
        <article className="relative w-80 max-w-lg pb-10 flex flex-col space-y-6  h-full">
          <div className=" flex flex-col  items-center py-4">
            <img src={logo} className="h-20" />
            <p className=" text">Library Management System</p>
          </div>
          <div className="px-4">
            <div className=" flex flex-row justify-start gap-2 py-2 border-b-[1px]">
              <LayoutDashboard />
              <Link
                to={"/dashboard"}
                className="text-md font-light"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </div>
            <div className=" flex flex-row justify-start gap-2 py-2 border-b-[1px]  ">
              <User />
              <Link
                to={"users"}
                className="text-md font-light"
                onClick={() => setIsOpen(false)}
              >
                {" "}
                Users
              </Link>
            </div>
            <div className=" flex flex-row justify-start gap-2 py-2 border-b-[1px]  ">
              <Settings />
              <Link
                to={"settings"}
                className="text-md font-light"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </div>
            <div className=" flex flex-row justify-start gap-2 py-2 border-b-[1px]  ">
              <TextQuote />
              <Link
                to={"feedbacks"}
                className="text-md font-light"
                onClick={() => setIsOpen(false)}
              >
                Feedbacks
              </Link>
            </div>
            <div className=" flex flex-row justify-start gap-2 py-2 ">
              <Button
                className="text-md font-light mt-6"
                onClick={() => signOut()}
              >
                <LogOutIcon className="mr-1" />
                Sign Out
              </Button>
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
