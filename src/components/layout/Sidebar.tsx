
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
  FileCheck,
  Wind,
  RotateCw,
  Cog,
  Gauge,
  ScanBarcode
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
  children?: SidebarItemProps[];
  expanded?: boolean;
  onToggle?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  active,
  children,
  expanded,
  onToggle
}) => {
  if (children) {
    return (
      <div className="space-y-1">
        <button
          onClick={onToggle}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            active 
              ? "bg-textile-100 text-textile-500 font-medium" 
              : "text-gray-600 hover:bg-textile-50 hover:text-textile-500"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="h-5 w-5">{icon}</div>
            <span>{label}</span>
          </div>
          <svg
            className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded && (
          <div className="pl-10 space-y-1">
            {children.map((child, index) => (
              <Link
                key={index}
                to={child.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  child.active 
                    ? "bg-textile-100 text-textile-500 font-medium" 
                    : "text-gray-600 hover:bg-textile-50 hover:text-textile-500"
                )}
              >
                <div className="h-4 w-4">{child.icon}</div>
                <span>{child.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  
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
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({
    production: location.pathname.startsWith("/production")
  });
  
  const isActive = (path: string) => location.pathname === path;
  const isActiveGroup = (prefix: string) => location.pathname.startsWith(prefix);

  const toggleExpand = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Factory className="h-6 w-6 text-textile-500" />
          <span className="font-semibold text-xl text-textile-500">
            NSN SpinTech
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
            active={isActiveGroup("/production")}
            expanded={expandedItems.production}
            onToggle={() => toggleExpand("production")}
            children={[
              {
                icon: <Gauge className="h-4 w-4" />,
                label: t("performance"),
                to: "/production/performance",
                active: isActive("/production/performance")
              },
              {
                icon: <RotateCw className="h-4 w-4" />,
                label: t("machinery"),
                to: "/production/machinery",
                active: isActive("/production/machinery")
              },
              {
                icon: <Wind className="h-4 w-4" />,
                label: t("processes"),
                to: "/production/processes",
                active: isActive("/production/processes")
              },
              {
                icon: <Cog className="h-4 w-4" />,
                label: t("maintenance"),
                to: "/production/maintenance",
                active: isActive("/production/maintenance")
              },
              {
                icon: <ScanBarcode className="h-4 w-4" />,
                label: t("tracking"),
                to: "/production/tracking",
                active: isActive("/production/tracking")
              }
            ]}
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
