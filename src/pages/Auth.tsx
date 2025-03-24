
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { TabsContent } from "@/components/ui/tabs";
import AuthContainer from "@/components/auth/AuthContainer";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import VerificationForm from "@/components/auth/VerificationForm";

const Auth: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<"signin" | "signup" | "otp">("signin");
  const [verificationEmail, setVerificationEmail] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleSignUpSuccess = (email: string) => {
    setVerificationEmail(email);
    setActiveTab("otp");
  };

  const getAuthTitle = () => {
    switch (activeTab) {
      case "signin": return t("sign_in");
      case "signup": return t("sign_up");
      case "otp": return t("verification");
    }
  };

  return (
    <AuthContainer 
      activeTab={activeTab} 
      title={getAuthTitle()} 
      showTabs={activeTab !== "otp"}
      onTabChange={(value) => setActiveTab(value as "signin" | "signup")}
    >
      {activeTab !== "otp" ? (
        <>
          <TabsContent value="signin">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm onSuccess={handleSignUpSuccess} />
          </TabsContent>
        </>
      ) : (
        <VerificationForm 
          email={verificationEmail} 
          onBackToLogin={() => setActiveTab("signin")} 
        />
      )}
    </AuthContainer>
  );
};

export default Auth;
