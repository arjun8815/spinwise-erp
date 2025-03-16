
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menu,
  Globe,
  LogOut,
  User,
  Settings,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { t, setLanguage, language } = useLanguage();
  const { user, profile, signOut, isAdmin } = useAuth();

  const getInitials = () => {
    if (!profile) return "U";
    
    const first = profile.first_name ? profile.first_name[0] : "";
    const last = profile.last_name ? profile.last_name[0] : "";
    
    return (first + last).toUpperCase();
  };

  const getUserFullName = () => {
    if (!profile) return "User";
    return `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "User";
  };

  const languages = [
    { code: "english", label: "English" },
    { code: "tamil", label: "தமிழ்" },
    { code: "telugu", label: "తెలుగు" },
    { code: "hindi", label: "हिंदी" },
    { code: "kannada", label: "ಕನ್ನಡ" },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t("language")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("select_language")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={
                  language === lang.code
                    ? "bg-accent text-accent-foreground"
                    : ""
                }
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-textile-100 text-textile-600">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {getUserFullName()}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                  {profile && (
                    <Badge className="mt-1 w-fit capitalize">
                      {profile.role}
                    </Badge>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("settings")}</span>
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link to="/users">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{t("user_management")}</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("sign_out")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="default" size="sm" asChild>
            <Link to="/auth">
              <User className="mr-2 h-4 w-4" />
              {t("sign_in")}
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
