
import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data - would be replaced with real-time data
const data = [
  { time: "00:00", production: 210, quality: 96, efficiency: 88 },
  { time: "03:00", production: 180, quality: 95, efficiency: 85 },
  { time: "06:00", production: 200, quality: 97, efficiency: 89 },
  { time: "09:00", production: 240, quality: 98, efficiency: 92 },
  { time: "12:00", production: 250, quality: 96, efficiency: 91 },
  { time: "15:00", production: 230, quality: 95, efficiency: 88 },
  { time: "18:00", production: 220, quality: 97, efficiency: 90 },
  { time: "21:00", production: 200, quality: 98, efficiency: 92 },
];

const ProductionMetricsChart: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="production" 
          name={t("production_kg")}
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#colorProduction)" 
        />
        <Area 
          type="monotone" 
          dataKey="quality" 
          name={t("quality_percent")}
          stroke="#82ca9d" 
          fillOpacity={1} 
          fill="url(#colorQuality)" 
        />
        <Area 
          type="monotone" 
          dataKey="efficiency" 
          name={t("efficiency_percent")}
          stroke="#ffc658" 
          fillOpacity={1} 
          fill="url(#colorEfficiency)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProductionMetricsChart;
