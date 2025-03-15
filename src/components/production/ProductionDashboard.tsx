
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Activity,
  Gauge
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ProductionMetricsChart from "./ProductionMetricsChart";
import MachineStatusCard from "./MachineStatusCard";

// Mock data - would be replaced with real data in production
const machineStatuses = [
  { id: 1, name: "Bale Opener", status: "running", efficiency: 92, output: "450 kg/h" },
  { id: 2, name: "Carding Machine", status: "idle", efficiency: 0, alert: "Maintenance required" },
  { id: 3, name: "Drawing Frame", status: "running", efficiency: 87, output: "420 kg/h" },
  { id: 4, name: "Roving Frame", status: "warning", efficiency: 78, alert: "Low efficiency" },
  { id: 5, name: "Ring Spinning", status: "running", efficiency: 95, output: "85 kg/h" },
  { id: 6, name: "Open-End Spinning", status: "running", efficiency: 91, output: "120 kg/h" },
  { id: 7, name: "Winding Machine", status: "error", efficiency: 0, alert: "Motor failure" },
  { id: 8, name: "Quality Control", status: "running", efficiency: 89, output: "280 tests/h" }
];

const ProductionDashboard: React.FC = () => {
  const { t } = useLanguage();

  // Calculate summary statistics
  const runningMachines = machineStatuses.filter(m => m.status === "running").length;
  const warningMachines = machineStatuses.filter(m => m.status === "warning").length;
  const errorMachines = machineStatuses.filter(m => m.status === "error").length;
  const idleMachines = machineStatuses.filter(m => m.status === "idle").length;
  
  const averageEfficiency = machineStatuses
    .filter(m => m.status === "running" || m.status === "warning")
    .reduce((sum, machine) => sum + machine.efficiency, 0) / 
    (runningMachines + warningMachines) || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("running_machines")}
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runningMachines}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((runningMachines / machineStatuses.length) * 100)}% {t("of_total")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("issues")}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warningMachines + errorMachines}</div>
            <p className="text-xs text-muted-foreground">
              {warningMachines} {t("warnings")}, {errorMachines} {t("errors")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("avg_efficiency")}
            </CardTitle>
            <Gauge className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageEfficiency)}%</div>
            <Progress 
              value={averageEfficiency} 
              className="h-2 mt-2" 
              indicatorClassName={averageEfficiency > 90 ? "bg-green-500" : 
                                 averageEfficiency > 75 ? "bg-yellow-500" : "bg-red-500"} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("daily_production")}
            </CardTitle>
            <Activity className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450 kg</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 8%</span> {t("from_yesterday")}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("production_metrics")}</CardTitle>
            <CardDescription>{t("last_24_hours")}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ProductionMetricsChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("quality_indicators")}</CardTitle>
            <CardDescription>{t("current_shift")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("yarn_strength")}</span>
              <div className="flex items-center">
                <span className="mr-2 font-medium">98.5%</span>
                <Badge className="bg-green-100 text-green-800">
                  {t("good")}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("yarn_evenness")}</span>
              <div className="flex items-center">
                <span className="mr-2 font-medium">95.2%</span>
                <Badge className="bg-green-100 text-green-800">
                  {t("good")}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("imperfections")}</span>
              <div className="flex items-center">
                <span className="mr-2 font-medium">2.8%</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {t("average")}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("waste_percentage")}</span>
              <div className="flex items-center">
                <span className="mr-2 font-medium">3.2%</span>
                <Badge className="bg-green-100 text-green-800">
                  {t("good")}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("machine_status")}</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {machineStatuses.map(machine => (
            <MachineStatusCard key={machine.id} machine={machine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductionDashboard;
