
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Package, 
  Factory, 
  FileCheck, 
  BarChart2, 
  Users, 
  Truck
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import OrdersTable from "@/components/dashboard/OrdersTable";
import InventoryStatus from "@/components/dashboard/InventoryStatus";
import ChatAssistant from "@/components/ChatAssistant";

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("welcome")}</h1>
        <p className="text-muted-foreground">
          {t("overview")}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Daily Production"
          value="2,450 kg"
          icon={<Factory className="h-5 w-5" />}
          trend={{ value: "8%", positive: true }}
        />
        <StatsCard
          title="Raw Materials"
          value="72.5 tons"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: "5%", positive: false }}
        />
        <StatsCard
          title="Quality Rating"
          value="97.3%"
          icon={<FileCheck className="h-5 w-5" />}
          trend={{ value: "2.1%", positive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value="₹3,542,800"
          icon={<BarChart2 className="h-5 w-5" />}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard
          title="Active Staff"
          value="128"
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Pending Deliveries"
          value="8"
          icon={<Truck className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InventoryStatus />
        <ChatAssistant />
      </div>

      <OrdersTable />
    </div>
  );
};

export default Dashboard;
