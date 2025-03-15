
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for quality metrics over time
const data = [
  { day: "Mon", twist: 95.4, evenness: 93.8, tensile: 97.2, elongation: 91.5, hairiness: 88.2 },
  { day: "Tue", twist: 96.1, evenness: 94.2, tensile: 97.8, elongation: 92.1, hairiness: 89.0 },
  { day: "Wed", twist: 95.8, evenness: 94.5, tensile: 98.0, elongation: 92.3, hairiness: 88.7 },
  { day: "Thu", twist: 96.3, evenness: 94.8, tensile: 98.1, elongation: 92.4, hairiness: 88.5 },
  { day: "Fri", twist: 95.9, evenness: 94.6, tensile: 97.9, elongation: 92.2, hairiness: 87.8 },
  { day: "Sat", twist: 95.6, evenness: 94.0, tensile: 97.5, elongation: 91.8, hairiness: 87.3 },
  { day: "Sun", twist: 95.2, evenness: 93.5, tensile: 97.3, elongation: 91.6, hairiness: 87.5 },
];

const QualityMetricsChart: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={[85, 100]} />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="twist" 
          name={t("twist")}
          stroke="#8884d8" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="evenness" 
          name={t("evenness")}
          stroke="#82ca9d" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="tensile" 
          name={t("tensile_strength")}
          stroke="#ff7300" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="elongation" 
          name={t("elongation")}
          stroke="#0088fe" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="hairiness" 
          name={t("hairiness")}
          stroke="#ff5252" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default QualityMetricsChart;
