
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductionDashboard from "@/components/production/ProductionDashboard";
import MachineryList from "@/components/production/MachineryList";
import ProcessFlow from "@/components/production/ProcessFlow";
import AddMachineDialog from "@/components/production/AddMachineDialog";

const Production: React.FC = () => {
  const { t } = useLanguage();
  const [isAddMachineOpen, setIsAddMachineOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("production_management")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("production_overview_description")}
          </p>
        </div>
        <Button onClick={() => setIsAddMachineOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("add_machine")}
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="dashboard">{t("dashboard")}</TabsTrigger>
          <TabsTrigger value="machines">{t("machines")}</TabsTrigger>
          <TabsTrigger value="process">{t("process_flow")}</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
          <ProductionDashboard />
        </TabsContent>
        <TabsContent value="machines" className="mt-6">
          <MachineryList />
        </TabsContent>
        <TabsContent value="process" className="mt-6">
          <ProcessFlow />
        </TabsContent>
      </Tabs>

      <AddMachineDialog 
        open={isAddMachineOpen} 
        onOpenChange={setIsAddMachineOpen}
      />
    </div>
  );
};

export default Production;
