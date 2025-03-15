
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Barcode } from "lucide-react";
import InventoryDashboard from "@/components/inventory/InventoryDashboard";
import RawMaterials from "@/components/inventory/RawMaterials";
import WorkInProgress from "@/components/inventory/WorkInProgress";
import FinishedGoods from "@/components/inventory/FinishedGoods";
import InventoryAnalytics from "@/components/inventory/InventoryAnalytics";
import AddItemDialog from "@/components/inventory/AddItemDialog";
import BarcodeScanDialog from "@/components/inventory/BarcodeScanDialog";

const Inventory: React.FC = () => {
  const { t } = useLanguage();
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("inventory_management")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("inventory_overview_description")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsScannerOpen(true)}>
            <Barcode className="mr-2 h-4 w-4" />
            {t("scan_barcode")}
          </Button>
          <Button onClick={() => setIsAddItemOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("add_item")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-auto">
          <TabsTrigger value="dashboard">{t("dashboard")}</TabsTrigger>
          <TabsTrigger value="raw-materials">{t("raw_materials")}</TabsTrigger>
          <TabsTrigger value="wip">{t("work_in_progress")}</TabsTrigger>
          <TabsTrigger value="finished-goods">{t("finished_goods")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
          <InventoryDashboard />
        </TabsContent>
        <TabsContent value="raw-materials" className="mt-6">
          <RawMaterials />
        </TabsContent>
        <TabsContent value="wip" className="mt-6">
          <WorkInProgress />
        </TabsContent>
        <TabsContent value="finished-goods" className="mt-6">
          <FinishedGoods />
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <InventoryAnalytics />
        </TabsContent>
      </Tabs>

      <AddItemDialog 
        open={isAddItemOpen} 
        onOpenChange={setIsAddItemOpen}
      />

      <BarcodeScanDialog
        open={isScannerOpen}
        onOpenChange={setIsScannerOpen}
      />
    </div>
  );
};

export default Inventory;
