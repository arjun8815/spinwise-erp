
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for work in progress
const wipData = [
  {
    id: "WIP001",
    batchNumber: "B45678",
    description: "Cotton Sliver - Carding",
    quantity: 12.5,
    unit: "tons",
    stage: "carding",
    machine: "Card C5-01",
    startDate: "2023-08-14",
    estimatedCompletion: "2023-08-16",
    status: "in_progress",
  },
  {
    id: "WIP002",
    batchNumber: "B45679",
    description: "Cotton Roving - Drawing",
    quantity: 10.8,
    unit: "tons",
    stage: "drawing",
    machine: "Draw Frame DF-03",
    startDate: "2023-08-13",
    estimatedCompletion: "2023-08-15",
    status: "in_progress",
  },
  {
    id: "WIP003",
    batchNumber: "B45680",
    description: "Polyester Blend - Mixing",
    quantity: 8.4,
    unit: "tons",
    stage: "mixing",
    machine: "Blender BL-02",
    startDate: "2023-08-15",
    estimatedCompletion: "2023-08-17",
    status: "delayed",
  },
  {
    id: "WIP004",
    batchNumber: "B45681",
    description: "Cotton Yarn - Spinning",
    quantity: 7.2,
    unit: "tons",
    stage: "spinning",
    machine: "Ring Frame RF-05",
    startDate: "2023-08-12",
    estimatedCompletion: "2023-08-16",
    status: "in_progress",
  },
  {
    id: "WIP005",
    batchNumber: "B45682",
    description: "Blended Yarn - Winding",
    quantity: 6.3,
    unit: "tons",
    stage: "winding",
    machine: "Winder W-08",
    startDate: "2023-08-15",
    estimatedCompletion: "2023-08-16",
    status: "in_progress",
  },
];

const WorkInProgress: React.FC = () => {
  const { t } = useLanguage();

  // Function to render appropriate badge for status
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge className="bg-blue-500">{t("in_progress")}</Badge>;
      case "delayed":
        return <Badge className="bg-amber-500">{t("delayed")}</Badge>;
      case "on_hold":
        return <Badge className="bg-red-500">{t("on_hold")}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("work_in_progress_inventory")}</CardTitle>
          <CardDescription>
            {t("wip_overview_description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("batch_number")}</TableHead>
                <TableHead>{t("description")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("production_stage")}</TableHead>
                <TableHead>{t("machine")}</TableHead>
                <TableHead>{t("estimated_completion")}</TableHead>
                <TableHead>{t("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wipData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.batchNumber}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {item.quantity} {t(item.unit)}
                  </TableCell>
                  <TableCell>{t(item.stage)}</TableCell>
                  <TableCell>{item.machine}</TableCell>
                  <TableCell>{item.estimatedCompletion}</TableCell>
                  <TableCell>{renderStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkInProgress;
