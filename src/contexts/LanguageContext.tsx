
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "english" | "tamil" | "telugu" | "hindi" | "kannada";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations: Record<Language, Record<string, string>> = {
  english: {
    dashboard: "Dashboard",
    production: "Production",
    inventory: "Inventory",
    quality: "Quality",
    finance: "Finance",
    hr: "Human Resources",
    crm: "Customer Relations",
    settings: "Settings",
    language: "Language",
    welcome: "Welcome to SpinWise ERP",
    overview: "System Overview",
    pendingOrders: "Pending Orders",
    stockStatus: "Stock Status",
    qualityMetrics: "Quality Metrics",
    recentTransactions: "Recent Transactions",
    employeePerformance: "Employee Performance",
    customerOrders: "Customer Orders",
    rawMaterials: "Raw Materials",
    workInProgress: "Work in Progress",
    finishedGoods: "Finished Goods",
    chat: "Chat with Assistant",
    chatPlaceholder: "Ask about yarn, machines, or procedures...",
    logout: "Logout",
  },
  tamil: {
    dashboard: "டாஷ்போர்டு",
    production: "உற்பத்தி",
    inventory: "சரக்கு",
    quality: "தரம்",
    finance: "நிதி",
    hr: "மனித வளம்",
    crm: "வாடிக்கையாளர் உறவுகள்",
    settings: "அமைப்புகள்",
    language: "மொழி",
    welcome: "ஸ்பின்வைஸ் ERP க்கு வரவேற்கிறோம்",
    overview: "அமைப்பு கண்ணோட்டம்",
    pendingOrders: "நிலுவையில் உள்ள ஆர்டர்கள்",
    stockStatus: "சரக்கு நிலை",
    qualityMetrics: "தர அளவீடுகள்",
    recentTransactions: "சமீபத்திய பரிவர்த்தனைகள்",
    employeePerformance: "ஊழியர் செயல்திறன்",
    customerOrders: "வாடிக்கையாளர் ஆர்டர்கள்",
    rawMaterials: "மூலப்பொருட்கள்",
    workInProgress: "முன்னேற்றத்தில் உள்ள வேலை",
    finishedGoods: "முடிக்கப்பட்ட பொருட்கள்",
    chat: "உதவியாளருடன் அரட்டை",
    chatPlaceholder: "நூல், இயந்திரங்கள் அல்லது நடைமுறைகள் பற்றி கேளுங்கள்...",
    logout: "வெளியேறு",
  },
  telugu: {
    dashboard: "డాష్‌బోర్డ్",
    production: "ఉత్పత్తి",
    inventory: "జాబితా",
    quality: "నాణ్యత",
    finance: "ఆర్థిక",
    hr: "మానవ వనరులు",
    crm: "వినియోగదారు సంబంధాలు",
    settings: "సెట్టింగ్‌లు",
    language: "భాష",
    welcome: "SpinWise ERP కు స్వాగతం",
    overview: "సిస్టమ్ అవలోకనం",
    pendingOrders: "పెండింగ్ ఆర్డర్‌లు",
    stockStatus: "స్టాక్ స్థితి",
    qualityMetrics: "నాణ్యత మెట్రిక్స్",
    recentTransactions: "ఇటీవలి లావాదేవీలు",
    employeePerformance: "ఉద్యోగి పనితీరు",
    customerOrders: "కస్టమర్ ఆర్డర్‌లు",
    rawMaterials: "ముడి పదార్థాలు",
    workInProgress: "పని జరుగుతోంది",
    finishedGoods: "పూర్తయిన వస్తువులు",
    chat: "సహాయకుడితో చాట్ చేయండి",
    chatPlaceholder: "దారం, యంత్రాలు లేదా విధానాల గురించి అడగండి...",
    logout: "లాగ్అవుట్",
  },
  hindi: {
    dashboard: "डैशबोर्ड",
    production: "उत्पादन",
    inventory: "इन्वेंटरी",
    quality: "गुणवत्ता",
    finance: "वित्त",
    hr: "मानव संसाधन",
    crm: "ग्राहक संबंध",
    settings: "सेटिंग्स",
    language: "भाषा",
    welcome: "SpinWise ERP में आपका स्वागत है",
    overview: "सिस्टम अवलोकन",
    pendingOrders: "अपूर्ण आदेश",
    stockStatus: "स्टॉक स्थिति",
    qualityMetrics: "गुणवत्ता मेट्रिक्स",
    recentTransactions: "हाल के लेनदेन",
    employeePerformance: "कर्मचारी प्रदर्शन",
    customerOrders: "ग्राहक आदेश",
    rawMaterials: "कच्चा माल",
    workInProgress: "कार्य प्रगति पर है",
    finishedGoods: "तैयार माल",
    chat: "सहायक के साथ चैट करें",
    chatPlaceholder: "यार्न, मशीनों या प्रक्रियाओं के बारे में पूछें...",
    logout: "लॉगआउट",
  },
  kannada: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    production: "ಉತ್ಪಾದನೆ",
    inventory: "ಸರಕುಪಟ್ಟಿ",
    quality: "ಗುಣಮಟ್ಟ",
    finance: "ಹಣಕಾಸು",
    hr: "ಮಾನವ ಸಂಪನ್ಮೂಲಗಳು",
    crm: "ಗ್ರಾಹಕ ಸಂಬಂಧಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    language: "ಭಾಷೆ",
    welcome: "SpinWise ERP ಗೆ ಸುಸ್ವಾಗತ",
    overview: "ಸಿಸ್ಟಮ್ ಅವಲೋಕನ",
    pendingOrders: "ಬಾಕಿ ಇರುವ ಆರ್ಡರ್‌ಗಳು",
    stockStatus: "ಸ್ಟಾಕ್ ಸ್ಥಿತಿ",
    qualityMetrics: "ಗುಣಮಟ್ಟದ ಮೆಟ್ರಿಕ್ಸ್",
    recentTransactions: "ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು",
    employeePerformance: "ನೌಕರರ ಕಾರ್ಯಕ್ಷಮತೆ",
    customerOrders: "ಗ್ರಾಹಕರ ಆರ್ಡರ್‌ಗಳು",
    rawMaterials: "ಕಚ್ಚಾ ವಸ್ತುಗಳು",
    workInProgress: "ಕಾರ್ಯ ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    finishedGoods: "ಪೂರ್ಣಗೊಂಡ ಸರಕುಗಳು",
    chat: "ಸಹಾಯಕರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
    chatPlaceholder: "ನೂಲು, ಯಂತ್ರಗಳು ಅಥವಾ ಕಾರ್ಯವಿಧಾನಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
    logout: "ಲಾಗ್ ಔಟ್",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("spinwise-language");
    return (savedLanguage as Language) || "english";
  });

  useEffect(() => {
    localStorage.setItem("spinwise-language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
