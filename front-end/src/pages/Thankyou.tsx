import { useNavigate } from "react-router-dom";
import logo from "/logo.png";
import RateService from "@/components/feedback/RateService";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const Thankyou = () => {
  const [open, setOpen] = useState(true);

  const { setUser, user } = useGlobalContext();
  const navigate = useNavigate();

  const close = () => {
    setOpen(false);
    setUser(null);
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-books.jpg')] bg-cover bg-no-repeat">
      {user && <RateService open={open} close={close} />}

      <div className="min-h-content w-screen items-center justify-center py-4 flex flex-row gap-6 absolute top-10 bg-white dark:bg-black ">
        <img
          src={logo}
          style={{ width: "80px", height: "80px", borderRadius: "40px" }}
        />

        <div className="min-h-content flex flex-col items-center justify-center">
          <h2>Uva Wellassa University Online Library Service Live Recorder </h2>
          <p>Library Service Live Recorder</p>
        </div>
      </div>

      <div className=" bg-slate-50 dark:bg-slate-900 rounded-2xl p-10 dark:bg-opacity-50 bg-opacity-50 w-fit">
        <div className="flex items-center justify-center space-x-3 px-2 sm:px-32 w-full">
          <h1 className=" text-center text-3xl font-bold">
            Reading Makes Your Great
            <br /> Thank you for visiting the library
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
