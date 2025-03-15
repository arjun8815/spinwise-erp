
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sigma, 
  Microscope, 
  BarChart2, 
  AlertTriangle,
  Brain,
  Camera
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import QualityMetricsChart from "./QualityMetricsChart";
import QualityRecommendations from "./QualityRecommendations";

// Mock quality data
const qualityParameters = [
  { name: "twist", value: 96.3, status: "good", trend: "up" },
  { name: "evenness", value: 94.8, status: "good", trend: "stable" },
  { name: "tensile_strength", value: 98.1, status: "good", trend: "up" },
  { name: "elongation", value: 92.4, status: "good", trend: "stable" },
  { name: "hairiness", value: 87.5, status: "average", trend: "down" },
];

const QualityDashboard: React.FC = () => {
  const { t } = useLanguage();

  // Calculate overall quality score
  const overallQuality = qualityParameters.reduce((sum, param) => sum + param.value, 0) / qualityParameters.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("overall_quality")}
            </CardTitle>
            <Sigma className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(overallQuality * 10) / 10}%</div>
            <Progress 
              value={overallQuality} 
              className="h-2 mt-2" 
              indicatorClassName={overallQuality > 95 ? "bg-green-500" : 
                                overallQuality > 85 ? "bg-yellow-500" : "bg-red-500"} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("tests_today")}
            </CardTitle>
            <Microscope className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">138</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 12%</span> {t("from_yesterday")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("active_alerts")}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 {t("critical_alert")}, 2 {t("warning_alert")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("compliance_rate")}
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 0.5%</span> {t("from_last_week")}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("quality_trends")}</CardTitle>
            <CardDescription>{t("last_7_days")}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <QualityMetricsChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("yarn_parameters")}</CardTitle>
            <CardDescription>{t("current_shift")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {qualityParameters.map((param) => (
              <div key={param.name} className="flex justify-between items-center">
                <span className="text-sm">{t(param.name)}</span>
                <div className="flex items-center">
                  <span className="mr-2 font-medium">{param.value}%</span>
                  <Badge className={
                    param.status === "good" ? "bg-green-100 text-green-800" :
                    param.status === "average" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {t(param.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t("ai_predictions")}</CardTitle>
              <CardDescription>{t("machine_learning")}</CardDescription>
            </div>
            <Brain className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">{t("predicted_issues")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("potential_hairiness_increase_in_next_12_hours")}
                </p>
                <Progress value={62} className="h-2 mt-2" indicatorClassName="bg-amber-500" />
                <p className="text-xs text-muted-foreground mt-1">62% {t("probability")}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">{t("quality_forecast")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("stable_quality_expected_for_next_24_hours")}
                </p>
                <Progress value={89} className="h-2 mt-2" indicatorClassName="bg-green-500" />
                <p className="text-xs text-muted-foreground mt-1">89% {t("confidence")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t("vision_systems")}</CardTitle>
              <CardDescription>{t("image_analysis")}</CardDescription>
            </div>
            <Camera className="h-5 w-5 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-md overflow-hidden aspect-square bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-xs">
                  {t("yarn_structure_image")}
                </div>
              </div>
              <div className="relative rounded-md overflow-hidden aspect-square bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-xs">
                  {t("evenness_scan")}
                </div>
              </div>
              <div className="col-span-2">
                <h4 className="text-sm font-medium mb-1">{t("vision_analysis")}</h4>
                <p className="text-xs text-muted-foreground">
                  {t("no_visible_defects_detected_in_current_batch")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <QualityRecommendations />
    </div>
  );
};

export default QualityDashboard;
