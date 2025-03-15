
import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, onClose }) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
