
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Sample data
const inventoryItems = [
  { name: "Raw Cotton", current: 75, max: 100, unit: "tons" },
  { name: "Polyester Fiber", current: 30, max: 50, unit: "tons" },
  { name: "Viscose Fiber", current: 15, max: 40, unit: "tons" },
  { name: "Yarn Packages", current: 8500, max: 10000, unit: "units" },
];

const InventoryStatus: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>{t("stockStatus")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryItems.map((item) => {
            const percentage = Math.round((item.current / item.max) * 100);
            let statusColor = "text-green-500";
            
            if (percentage < 25) {
              statusColor = "text-red-500";
            } else if (percentage < 50) {
              statusColor = "text-yellow-500";
            }
            
            return (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className={statusColor}>
                    {item.current} / {item.max} {item.unit}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
