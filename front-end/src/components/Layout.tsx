import React from "react";
import Drawer from "./Drawer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2">
      <Drawer />
      {children}
    </div>
  );
};

export default Layout;
