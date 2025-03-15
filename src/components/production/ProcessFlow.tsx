
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProcessFlow: React.FC = () => {
  const { t } = useLanguage();

  // Process steps in a spinning mill
  const processSteps = [
    {
      id: 1,
      name: "Bale Opening",
      description: "Opens cotton bales and removes large impurities",
      machines: ["Bale Opener", "Bale Feeder", "Blower"],
      status: "active",
      current: 450, // kg/h
      target: 500, // kg/h
    },
    {
      id: 2,
      name: "Carding",
      description: "Separates, cleans, and intermixes fibers to create continuous sliver",
      machines: ["Carding Machine 1", "Carding Machine 2"],
      status: "active",
      current: 420, // kg/h
      target: 450, // kg/h
    },
    {
      id: 3,
      name: "Drawing",
      description: "Combines several carded slivers and aligns fibers for uniformity",
      machines: ["Drawing Frame 1", "Drawing Frame 2"],
      status: "active",
      current: 410, // kg/h
      target: 430, // kg/h
    },
    {
      id: 4,
      name: "Combing",
      description: "Removes short fibers for higher quality yarn (premium products only)",
      machines: ["Combing Machine"],
      status: "active",
      current: 300, // kg/h
      target: 320, // kg/h
    },
    {
      id: 5,
      name: "Roving",
      description: "Converts sliver into roving by adding a slight twist",
      machines: ["Roving Frame 1", "Roving Frame 2"],
      status: "warning",
      current: 380, // kg/h
      target: 430, // kg/h
    },
    {
      id: 6,
      name: "Spinning",
      description: "Converts roving into yarn through spinning processes",
      machines: ["Ring Spinning 1", "Ring Spinning 2", "Open-End Spinning"],
      status: "active",
      current: 290, // kg/h
      target: 300, // kg/h
    },
    {
      id: 7,
      name: "Winding",
      description: "Winds yarn into packages for storage or further processing",
      machines: ["Winding Machine 1", "Winding Machine 2"],
      status: "error",
      current: 0, // kg/h
      target: 280, // kg/h
    },
    {
      id: 8,
      name: "Quality Control",
      description: "Tests yarn quality, records data, and prepares for shipping",
      machines: ["Quality Control Unit", "Testing Lab"],
      status: "active",
      current: 270, // kg/h
      target: 280, // kg/h
    }
  ];

  const statusColors = {
    active: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    pending: "bg-blue-100 text-blue-800"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{t("production_flow")}</h2>
        <p className="text-muted-foreground">{t("production_flow_description")}</p>
      </div>

      <div className="grid gap-6">
        {processSteps.map((step, index) => (
          <div key={step.id} className="relative">
            {index < processSteps.length - 1 && (
              <div className="absolute top-[4.5rem] bottom-[-4.5rem] left-8 w-0.5 bg-gray-200 z-0" />
            )}
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-textile-100 text-textile-800 font-bold text-sm">
                      {step.id}
                    </div>
                    <CardTitle>{t(step.name.toLowerCase().replace(' ', '_'))}</CardTitle>
                  </div>
                  <Badge className={statusColors[step.status]}>
                    {t(step.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{t(step.description.toLowerCase().replace(/ /g, '_'))}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {step.machines.map((machine, idx) => (
                    <Badge key={idx} variant="outline" className="bg-gray-50">
                      {machine}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">{t("current_throughput")}</p>
                    <p className={`text-sm font-medium ${step.current < step.target * 0.9 ? "text-red-500" : ""}`}>
                      {step.current} kg/h
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("target_throughput")}</p>
                    <p className="text-sm font-medium">{step.target} kg/h</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("efficiency")}</p>
                    <p className={`text-sm font-medium ${step.current / step.target < 0.9 ? "text-red-500" : "text-green-500"}`}>
                      {step.current === 0 ? "-" : Math.round((step.current / step.target) * 100)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;
