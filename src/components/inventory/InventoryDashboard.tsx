
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const InventoryDashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("raw_materials")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87.5 {t("tons")}</div>
          <p className="text-xs text-muted-foreground">
            {t("current_stock_level")}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("work_in_progress")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45.2 {t("tons")}</div>
          <p className="text-xs text-muted-foreground">
            {t("in_processing_stages")}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("finished_goods")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">152.8 {t("tons")}</div>
          <p className="text-xs text-muted-foreground">
            {t("ready_for_shipment")}
          </p>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{t("stock_alerts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {t("cotton_raw")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("below_threshold")}
                </p>
              </div>
              <div className="rounded-full bg-amber-500 px-3 py-1 text-xs text-white">
                {t("reorder_soon")}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {t("polyester_blend")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("critical_level")}
                </p>
              </div>
              <div className="rounded-full bg-red-500 px-3 py-1 text-xs text-white">
                {t("urgent_reorder")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("recent_transactions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {t("inbound_cotton")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("today")} 10:45 AM
                </p>
              </div>
              <div className="text-sm font-medium">+25 {t("tons")}</div>
            </div>
            
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {t("outbound_yarn")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("today")} 08:15 AM
                </p>
              </div>
              <div className="text-sm font-medium">-18 {t("tons")}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryDashboard;
