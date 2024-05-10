import React from "react";
import Drawer from "./Drawer";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import DeleteConfirmDialog from "./users/DeleteConfirmDialog";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setIsOpen] = React.useState(false);
  return (
    <div className=" px-8 md:px-16 min-h-screen">
      <div className="flex items-center justify-between py-4">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <AlignJustify />
        </Button>
        <ModeToggle />
      </div>
      <DeleteConfirmDialog />
      <Drawer isOpen={open} setIsOpen={setIsOpen} />
      {children}
    </div>
  );
};

export default Layout;
