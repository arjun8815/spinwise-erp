
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from "recharts";

// Sample data for inventory analytics
const inventoryValueData = [
  { month: "Jan", raw: 450000, wip: 320000, finished: 580000 },
  { month: "Feb", raw: 470000, wip: 340000, finished: 600000 },
  { month: "Mar", raw: 520000, wip: 380000, finished: 650000 },
  { month: "Apr", raw: 490000, wip: 360000, finished: 630000 },
  { month: "May", raw: 510000, wip: 370000, finished: 640000 },
  { month: "Jun", raw: 530000, wip: 390000, finished: 660000 },
];

const inventoryDistributionData = [
  { name: "Raw Materials", value: 35 },
  { name: "Work-in-Progress", value: 25 },
  { name: "Finished Goods", value: 40 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const turnoverRateData = [
  { month: "Jan", rate: 3.2 },
  { month: "Feb", rate: 3.4 },
  { month: "Mar", rate: 3.8 },
  { month: "Apr", rate: 3.6 },
  { month: "May", rate: 3.7 },
  { month: "Jun", rate: 3.9 },
];

const InventoryAnalytics: React.FC = () => {
  const { t } = useLanguage();

  // Format number for tooltip to handle both string and number types
  const formatNumber = (value: any): string => {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return String(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("inventory_value_trends")}</CardTitle>
          <CardDescription>
            {t("inventory_value_description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryValueData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Bar dataKey="raw" name={t("raw_materials")} fill="#0088FE" />
                <Bar dataKey="wip" name={t("work_in_progress")} fill="#00C49F" />
                <Bar
                  dataKey="finished"
                  name={t("finished_goods")}
                  fill="#FFBB28"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("inventory_distribution")}</CardTitle>
            <CardDescription>
              {t("current_inventory_distribution")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {inventoryDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("inventory_turnover_rate")}</CardTitle>
            <CardDescription>
              {t("inventory_turnover_description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={turnoverRateData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Bar
                    dataKey="rate"
                    name={t("turnover_rate")}
                    fill="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryAnalytics;
