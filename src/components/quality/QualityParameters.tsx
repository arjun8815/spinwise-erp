
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileDown } from "lucide-react";

// Mock test data
const tests = [
  { 
    id: "TST001", 
    date: "2023-07-15 09:45", 
    batch: "B2023-0715-01", 
    machine: "Ring Spinning 03",
    twist: 96.3, 
    evenness: 94.8, 
    tensile: 98.1, 
    elongation: 92.4, 
    hairiness: 87.5,
    status: "pass"
  },
  { 
    id: "TST002", 
    date: "2023-07-15 11:30", 
    batch: "B2023-0715-02", 
    machine: "Ring Spinning 04",
    twist: 95.7, 
    evenness: 93.9, 
    tensile: 97.8, 
    elongation: 91.9, 
    hairiness: 86.9,
    status: "pass"
  },
  { 
    id: "TST003", 
    date: "2023-07-15 13:15", 
    batch: "B2023-0715-03", 
    machine: "Ring Spinning 01",
    twist: 94.8, 
    evenness: 92.7, 
    tensile: 96.5, 
    elongation: 90.8, 
    hairiness: 85.2,
    status: "warning"
  },
  { 
    id: "TST004", 
    date: "2023-07-15 15:00", 
    batch: "B2023-0715-04", 
    machine: "Ring Spinning 02",
    twist: 96.1, 
    evenness: 94.2, 
    tensile: 97.9, 
    elongation: 92.1, 
    hairiness: 87.1,
    status: "pass"
  },
  { 
    id: "TST005", 
    date: "2023-07-15 16:45", 
    batch: "B2023-0715-05", 
    machine: "Open-End Spinning 01",
    twist: 92.4, 
    evenness: 91.3, 
    tensile: 94.8, 
    elongation: 89.5, 
    hairiness: 82.7,
    status: "fail"
  },
];

const QualityParameters: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = tests.filter(test => 
    test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.machine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pass":
        return <Badge className="bg-green-100 text-green-800">{t("pass")}</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">{t("warning")}</Badge>;
      case "fail":
        return <Badge className="bg-red-100 text-red-800">{t("fail")}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`${t("search")} ${t("test_results")}...`}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="hidden md:flex">
          <FileDown className="mr-2 h-4 w-4" />
          {t("export")}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("test_id")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead>{t("batch")}</TableHead>
              <TableHead>{t("machine")}</TableHead>
              <TableHead className="text-right">{t("twist")}</TableHead>
              <TableHead className="text-right">{t("evenness")}</TableHead>
              <TableHead className="text-right">{t("tensile_strength")}</TableHead>
              <TableHead className="text-right">{t("elongation")}</TableHead>
              <TableHead className="text-right">{t("hairiness")}</TableHead>
              <TableHead>{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium">{test.id}</TableCell>
                <TableCell>{test.date}</TableCell>
                <TableCell>{test.batch}</TableCell>
                <TableCell>{test.machine}</TableCell>
                <TableCell className="text-right">{test.twist}%</TableCell>
                <TableCell className="text-right">{test.evenness}%</TableCell>
                <TableCell className="text-right">{test.tensile}%</TableCell>
                <TableCell className="text-right">{test.elongation}%</TableCell>
                <TableCell className="text-right">{test.hairiness}%</TableCell>
                <TableCell>{getStatusBadge(test.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QualityParameters;
