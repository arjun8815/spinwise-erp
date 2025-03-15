
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  PauseCircle,
  Cog,
  BarChart2,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - would be connected to the backend in production
const machinesData = [
  { 
    id: 1, 
    name: "Bale Opener", 
    type: "Opener", 
    area: "Pre-Spinning",
    status: "running", 
    efficiency: 92, 
    lastMaintenance: "2023-09-15",
    nextMaintenance: "2023-12-15"
  },
  { 
    id: 2, 
    name: "Carding Machine", 
    type: "Carding", 
    area: "Pre-Spinning",
    status: "idle", 
    efficiency: 0, 
    lastMaintenance: "2023-10-05",
    nextMaintenance: "2023-11-05"
  },
  { 
    id: 3, 
    name: "Drawing Frame", 
    type: "Drawing", 
    area: "Pre-Spinning",
    status: "running", 
    efficiency: 87, 
    lastMaintenance: "2023-08-20",
    nextMaintenance: "2023-11-20"
  },
  { 
    id: 4, 
    name: "Roving Frame", 
    type: "Roving", 
    area: "Pre-Spinning",
    status: "warning", 
    efficiency: 78, 
    lastMaintenance: "2023-09-10",
    nextMaintenance: "2023-12-10"
  },
  { 
    id: 5, 
    name: "Ring Spinning Unit 1", 
    type: "Ring Spinning", 
    area: "Spinning",
    status: "running", 
    efficiency: 95, 
    lastMaintenance: "2023-10-01",
    nextMaintenance: "2024-01-01"
  },
  { 
    id: 6, 
    name: "Open-End Spinning", 
    type: "Open-End Spinning", 
    area: "Spinning",
    status: "running", 
    efficiency: 91, 
    lastMaintenance: "2023-09-05",
    nextMaintenance: "2023-12-05"
  },
  { 
    id: 7, 
    name: "Winding Machine", 
    type: "Winding", 
    area: "Post-Spinning",
    status: "error", 
    efficiency: 0, 
    lastMaintenance: "2023-07-15",
    nextMaintenance: "2023-10-15"
  },
  { 
    id: 8, 
    name: "Quality Control Unit", 
    type: "Quality", 
    area: "Quality Control",
    status: "running", 
    efficiency: 89, 
    lastMaintenance: "2023-08-30",
    nextMaintenance: "2023-11-30"
  },
  { 
    id: 9, 
    name: "Combing Machine", 
    type: "Combing", 
    area: "Pre-Spinning",
    status: "running", 
    efficiency: 93, 
    lastMaintenance: "2023-09-25",
    nextMaintenance: "2023-12-25"
  },
  { 
    id: 10, 
    name: "Ring Spinning Unit 2", 
    type: "Ring Spinning", 
    area: "Spinning",
    status: "running", 
    efficiency: 90, 
    lastMaintenance: "2023-08-15",
    nextMaintenance: "2023-11-15"
  }
];

const MachineryList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");

  const statusIcons = {
    running: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    error: <XCircle className="h-4 w-4 text-red-500" />,
    idle: <PauseCircle className="h-4 w-4 text-gray-500" />
  };

  const filteredMachines = machinesData.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        machine.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || machine.status === statusFilter;
    const matchesArea = areaFilter === "all" || machine.area === areaFilter;
    
    return matchesSearch && matchesStatus && matchesArea;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder={t("search_machines")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t("filter_by_status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_statuses")}</SelectItem>
              <SelectItem value="running">{t("running")}</SelectItem>
              <SelectItem value="warning">{t("warning")}</SelectItem>
              <SelectItem value="error">{t("error")}</SelectItem>
              <SelectItem value="idle">{t("idle")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t("filter_by_area")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_areas")}</SelectItem>
              <SelectItem value="Pre-Spinning">{t("pre_spinning")}</SelectItem>
              <SelectItem value="Spinning">{t("spinning")}</SelectItem>
              <SelectItem value="Post-Spinning">{t("post_spinning")}</SelectItem>
              <SelectItem value="Quality Control">{t("quality_control")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("machine_name")}</TableHead>
              <TableHead>{t("type")}</TableHead>
              <TableHead>{t("area")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">{t("efficiency")}</TableHead>
              <TableHead>{t("maintenance")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMachines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell className="font-medium">{machine.name}</TableCell>
                <TableCell>{machine.type}</TableCell>
                <TableCell>{machine.area}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {statusIcons[machine.status]}
                    <span className="capitalize">{t(machine.status)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {machine.status === "running" || machine.status === "warning" ? (
                    <Badge className={
                      machine.efficiency > 90 ? "bg-green-100 text-green-800" : 
                      machine.efficiency > 75 ? "bg-yellow-100 text-yellow-800" : 
                      "bg-red-100 text-red-800"
                    }>
                      {machine.efficiency}%
                    </Badge>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div>{t("last")}: {machine.lastMaintenance}</div>
                    <div>{t("next")}: {machine.nextMaintenance}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Cog className="h-4 w-4 mr-1" />
                      {t("manage")}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <History className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MachineryList;
