
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  PauseCircle,
  RotateCw 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MachineProps {
  machine: {
    id: number;
    name: string;
    status: "running" | "warning" | "error" | "idle";
    efficiency: number;
    output?: string;
    alert?: string;
  };
}

const MachineStatusCard: React.FC<MachineProps> = ({ machine }) => {
  const { t } = useLanguage();

  const statusIcons = {
    running: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    idle: <PauseCircle className="h-5 w-5 text-gray-500" />
  };

  const statusColors = {
    running: "bg-green-100 border-green-200",
    warning: "bg-yellow-100 border-yellow-200",
    error: "bg-red-100 border-red-200",
    idle: "bg-gray-100 border-gray-200"
  };

  const statusText = {
    running: t("running"),
    warning: t("warning"),
    error: t("error"),
    idle: t("idle")
  };

  return (
    <Card className={`border-l-4 ${statusColors[machine.status]}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base">{machine.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              {statusIcons[machine.status]}
              <span className="text-sm">{statusText[machine.status]}</span>
            </div>
          </div>
          {machine.status === "running" && (
            <div className="flex items-center gap-1">
              <RotateCw className="h-3 w-3 text-blue-500 animate-spin" />
              <span className="text-sm font-medium">{machine.output}</span>
            </div>
          )}
        </div>
        
        {(machine.status === "running" || machine.status === "warning") && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span>{t("efficiency")}</span>
              <span>{machine.efficiency}%</span>
            </div>
            <Progress 
              value={machine.efficiency} 
              className="h-1.5" 
              indicatorClassName={
                machine.efficiency > 90 ? "bg-green-500" : 
                machine.efficiency > 75 ? "bg-yellow-500" : "bg-red-500"
              }
            />
          </div>
        )}
        
        {machine.alert && (
          <p className="text-xs mt-2 text-red-500">{machine.alert}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MachineStatusCard;
