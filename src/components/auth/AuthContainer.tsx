
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactSupportButton from "./ContactSupportButton";

interface AuthContainerProps {
  activeTab: string;
  title: string;
  children: React.ReactNode;
  showTabs?: boolean;
  onTabChange?: (value: string) => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  activeTab,
  title,
  children,
  showTabs = false,
  onTabChange
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-8 flex items-center gap-2">
        <Factory className="h-8 w-8 text-textile-500" />
        <h1 className="text-3xl font-bold text-textile-500">NSN SpinTech</h1>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {showTabs ? (
            <Tabs 
              defaultValue="signin" 
              value={activeTab} 
              onValueChange={onTabChange}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">{t("sign_in")}</TabsTrigger>
                <TabsTrigger value="signup">{t("sign_up")}</TabsTrigger>
              </TabsList>
              
              {children}
            </Tabs>
          ) : (
            children
          )}
          
          {/* Add the ContactSupportButton component */}
          <ContactSupportButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthContainer;
