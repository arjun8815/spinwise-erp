
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  AlertCircle, 
  Info,
  ArrowRightCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock alert data
const alerts = [
  {
    id: "ALT001",
    timestamp: "2023-07-15 14:32",
    type: "critical",
    title: "tensile_strength_deviation",
    description: "tensile_strength_critical_deviation_desc",
    machine: "Open-End Spinning 01",
    value: "82.7%",
    threshold: "85.0%",
    recommendation: "check_tension_settings"
  },
  {
    id: "ALT002",
    timestamp: "2023-07-15 13:45",
    type: "warning",
    title: "hairiness_increase",
    description: "hairiness_warning_desc",
    machine: "Ring Spinning 01",
    value: "85.2%",
    threshold: "86.0%",
    recommendation: "inspect_drafting_system"
  },
  {
    id: "ALT003",
    timestamp: "2023-07-15 10:18",
    type: "warning",
    title: "evenness_fluctuation",
    description: "evenness_warning_desc",
    machine: "Ring Spinning 03",
    value: "Moderate",
    threshold: "Low",
    recommendation: "check_drafting_zone"
  },
  {
    id: "ALT004",
    timestamp: "2023-07-15 08:56",
    type: "info",
    title: "scheduled_maintenance",
    description: "scheduled_maintenance_desc",
    machine: "Carding Machine 02",
    value: "N/A",
    threshold: "N/A",
    recommendation: "perform_routine_maintenance"
  }
];

const QualityAlerts: React.FC = () => {
  const { t } = useLanguage();

  const getAlertIcon = (type: string) => {
    switch(type) {
      case "critical":
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-8 w-8 text-amber-500" />;
      case "info":
        return <Info className="h-8 w-8 text-blue-500" />;
      default:
        return null;
    }
  };

  const getAlertBadge = (type: string) => {
    switch(type) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">{t("critical_alert")}</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">{t("warning_alert")}</Badge>;
      case "info":
        return <Badge className="bg-blue-100 text-blue-800">{t("info_alert")}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {alerts.map((alert) => (
        <Card key={alert.id} className={
          alert.type === "critical" ? "border-red-200" :
          alert.type === "warning" ? "border-amber-200" :
          "border-blue-200"
        }>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {t(alert.title)}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {t(alert.description)}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-col items-end">
                {getAlertBadge(alert.type)}
                <span className="text-xs text-muted-foreground mt-1">
                  {alert.timestamp}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">{t("machine")}</h4>
                <p className="text-sm">{alert.machine}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">{t("current_value")}</h4>
                <p className="text-sm">{alert.value}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">{t("threshold")}</h4>
                <p className="text-sm">{alert.threshold}</p>
              </div>
              <div className="md:col-span-3">
                <h4 className="text-sm font-medium mb-1">{t("recommended_action")}</h4>
                <div className="flex justify-between items-center">
                  <p className="text-sm">{t(alert.recommendation)}</p>
                  <Button variant="ghost" size="sm" className="text-sm">
                    <ArrowRightCircle className="mr-1 h-4 w-4" />
                    {t("take_action")}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QualityAlerts;
