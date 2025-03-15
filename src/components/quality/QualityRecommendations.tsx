
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";

// Mock recommendation data
const recommendations = [
  {
    id: "REC001",
    title: "adjust_drafting_settings",
    description: "adjust_drafting_settings_desc",
    impact: "high",
    machine: "Ring Spinning 01"
  },
  {
    id: "REC002",
    title: "replace_traveller",
    description: "replace_traveller_desc",
    impact: "medium",
    machine: "Ring Spinning 03"
  },
  {
    id: "REC003",
    title: "optimize_humidity",
    description: "optimize_humidity_desc",
    impact: "medium",
    machine: "Production Floor"
  }
];

const QualityRecommendations: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2 h-5 w-5 text-blue-500" />
          {t("corrective_actions")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="font-medium">{t(rec.title)}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t(rec.description)}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs font-medium mr-2">{t("machine")}:</span>
                  <span className="text-xs">{rec.machine}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-xs font-medium mr-2">{t("impact")}:</span>
                  <span className={`text-xs font-medium ${
                    rec.impact === "high" ? "text-red-600" : 
                    rec.impact === "medium" ? "text-amber-600" : "text-blue-600"
                  }`}>
                    {t(rec.impact)}
                  </span>
                </div>
              </div>
              <Button size="sm" className="whitespace-nowrap">
                <Check className="mr-2 h-4 w-4" />
                {t("apply")}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityRecommendations;
