import React from "react";
import logo from "../assets/logo.png";
import overview from "../assets/overview.png";
import borrowbook from "../assets/borrowbook.png";
import Reference from "../assets/Reference.png";
import Vr from "../assets/Vr.png";
import { Button } from "@/components/ui/button";
import { Airplay, BookOpen, BookOpenCheck, GanttChart, Globe, Info, Microscope, MoreHorizontal, Newspaper, Wifi } from "lucide-react";
import Options from "@/components/options";

const options = [
    {
        icon:<BookOpenCheck size={48}/>,
        name:'Borrow Books',
        color:'bg-gray-600'
    },
    {
        icon:<BookOpen />,
        name:'Reference & Read',
        color:'bg-gray-600'
    },
    {
        icon:<Airplay />,
        name:'V/R Studio',
        color:'bg-gray-600'
    },
    {
        icon:<Newspaper />,
        name:'News paper Reading',
        color:'bg-gray-600'
    },
    {
        icon:<Microscope />,
        name:'Research Work /Support',
        color:'bg-gray-600'
    },
    {
        icon:<GanttChart />,
        name:'Periodics/Thesis',
        color:'bg-gray-600'
    },
    {
        icon:<Globe />,
        name:'E-Book&ICT',
        color:'bg-gray-600'
    },
    {
        icon:<Info />,
        name:'Information Commons',
        color:'bg-gray-600'
    },
    {
        icon:<Wifi />,
        name:'Wifi/Entertainment',
        color:'bg-gray-600'
    },
    {
        icon:<MoreHorizontal />,
        name:'Other Services',
        color:'bg-gray-600'
    },
    {
        icon:'',
        name:'Others Services',
        color:'bg-gray-600'
    },
    {
        icon:'',
        name:'Submit',
        color:'bg-indigo-700'
    },


]

export default function Optionpannel() {
  return (
    <div className="min-h-screen bg-[#31353F] flex flex-row space-x-3">
        <Drawer/>
      <div className=" " id="selectionpannel">
        <p className="text-white    text-2xl">DashBoard</p>
        <div className="    m-20  grid grid-cols-2 md:grid-cols-3 gap-4 " id="Buttons">
          {options.map((item)=>{
            return (<Options name={item.name} color={item.color} icon={item.icon} />)
          })}
        </div>
      </div>
    </div>
  );
}
