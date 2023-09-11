import { useNavigate } from "react-router-dom";
import logo from "/logo.png";

const Thankyou = () => {

  const navigate=useNavigate();

  setTimeout(()=>navigate('/'),2000)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-no-repeat">
      <div className="min-h-content w-screen items-center justify-center flex flex-row absolute top-10 bg-[#1B2028] ">
        <img src={logo} style={{ width: "80px", height: "80px" }} />

        <div className="min-h-content flex flex-col items-center justify-center">
          <h2 className="text-white">
            Uva Wellassa University Online Library Service Live Recorder{" "}
          </h2>
          <p className="text-white">Library Service Live Recorder</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-10  bg-opacity-50 w-fit">
        <div className="flex items-center justify-center space-x-3 px-2 sm:px-32 w-full">
          <h1 className="text-white text-center text-3xl font-bold">
            Reading Makes Your Great
            <br /> Thank you for visiting the library
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
