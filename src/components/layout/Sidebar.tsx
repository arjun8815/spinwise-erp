
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  Factory, 
  Package, 
  BarChart2, 
  Users, 
  Phone, 
  Settings,
  Home,
  FileCheck
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active 
          ? "bg-textile-100 text-textile-500 font-medium" 
          : "text-gray-600 hover:bg-textile-50 hover:text-textile-500"
      )}
    >
      <div className="h-5 w-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Factory className="h-6 w-6 text-textile-500" />
          <span className="font-semibold text-xl text-textile-500">
            SpinWise ERP
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarItem 
            icon={<Home className="h-5 w-5" />} 
            label={t("dashboard")} 
            to="/" 
            active={isActive("/")} 
          />
          <SidebarItem 
            icon={<Factory className="h-5 w-5" />} 
            label={t("production")} 
            to="/production" 
            active={isActive("/production")} 
          />
          <SidebarItem 
            icon={<Package className="h-5 w-5" />} 
            label={t("inventory")} 
            to="/inventory" 
            active={isActive("/inventory")} 
          />
          <SidebarItem 
            icon={<FileCheck className="h-5 w-5" />} 
            label={t("quality")} 
            to="/quality" 
            active={isActive("/quality")} 
          />
          <SidebarItem 
            icon={<BarChart2 className="h-5 w-5" />} 
            label={t("finance")} 
            to="/finance" 
            active={isActive("/finance")} 
          />
          <SidebarItem 
            icon={<Users className="h-5 w-5" />} 
            label={t("hr")} 
            to="/hr" 
            active={isActive("/hr")} 
          />
          <SidebarItem 
            icon={<Phone className="h-5 w-5" />} 
            label={t("crm")} 
            to="/crm" 
            active={isActive("/crm")} 
          />
          <SidebarItem 
            icon={<Settings className="h-5 w-5" />} 
            label={t("settings")} 
            to="/settings" 
            active={isActive("/settings")} 
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
