
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthContainer from "@/components/auth/AuthContainer";
import { Button } from "@/components/ui/button";

const Auth: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <AuthContainer 
      activeTab="" 
      title={t("contact_support")} 
      showTabs={false}
    >
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground">
          {t("contact_support_message")}
        </p>
        
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => navigate("/")}
        >
          {t("back_to_home")}
        </Button>
      </div>
    </AuthContainer>
  );
};

export default Auth;
