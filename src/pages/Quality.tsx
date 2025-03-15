
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import QualityDashboard from "@/components/quality/QualityDashboard";
import QualityParameters from "@/components/quality/QualityParameters";
import QualityAlerts from "@/components/quality/QualityAlerts";
import AddTestDialog from "@/components/quality/AddTestDialog";

const Quality: React.FC = () => {
  const { t } = useLanguage();
  const [isAddTestOpen, setIsAddTestOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("quality_management")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("quality_overview_description")}
          </p>
        </div>
        <Button onClick={() => setIsAddTestOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("add_test")}
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="dashboard">{t("dashboard")}</TabsTrigger>
          <TabsTrigger value="parameters">{t("parameters")}</TabsTrigger>
          <TabsTrigger value="alerts">{t("quality_alerts")}</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
          <QualityDashboard />
        </TabsContent>
        <TabsContent value="parameters" className="mt-6">
          <QualityParameters />
        </TabsContent>
        <TabsContent value="alerts" className="mt-6">
          <QualityAlerts />
        </TabsContent>
      </Tabs>

      <AddTestDialog 
        open={isAddTestOpen} 
        onOpenChange={setIsAddTestOpen}
      />
    </div>
  );
};

export default Quality;
