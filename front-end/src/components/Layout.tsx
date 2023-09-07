import React from "react";
import Drawer from "./Drawer";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setIsOpen] = React.useState(false);
  return (
    <div className="px-4 bg-[#31353F] min-h-screen">
      <div className="flex items-center justify-between">
        <Button className="m-2" onClick={() => setIsOpen(true)}>
          <AlignJustify />
        </Button>
        <Link to="/dashboard" className="text-white">
          Dashboard
        </Link>
      </div>
      <Drawer isOpen={open} setIsOpen={setIsOpen} />
      {children}
    </div>
  );
};

export default Layout;
