
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Globe, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="flex-1 md:flex-initial">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-lg text-textile-600 md:hidden"
        >
          SpinWise ERP
        </Link>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              <span>{t("language")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("english")}>
              English
              {language === "english" && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-textile-500" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("tamil")}>
              தமிழ் (Tamil)
              {language === "tamil" && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-textile-500" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("telugu")}>
              తెలుగు (Telugu)
              {language === "telugu" && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-textile-500" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("hindi")}>
              हिंदी (Hindi)
              {language === "hindi" && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-textile-500" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("kannada")}>
              ಕನ್ನಡ (Kannada)
              {language === "kannada" && (
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-textile-500" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">{t("logout")}</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
