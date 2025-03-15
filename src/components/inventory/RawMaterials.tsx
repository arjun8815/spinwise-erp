
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

// Sample data for raw materials
const rawMaterialsData = [
  {
    id: "RM001",
    name: "Cotton - Shankar 6",
    quantity: 35.2,
    unit: "tons",
    location: "Warehouse A",
    status: "in_stock",
    lastUpdated: "2023-08-15",
  },
  {
    id: "RM002",
    name: "Cotton - DCH 32",
    quantity: 28.7,
    unit: "tons",
    location: "Warehouse A",
    status: "in_stock",
    lastUpdated: "2023-08-12",
  },
  {
    id: "RM003",
    name: "Polyester Staple Fiber",
    quantity: 15.6,
    unit: "tons",
    location: "Warehouse B",
    status: "low_stock",
    lastUpdated: "2023-08-14",
  },
  {
    id: "RM004",
    name: "Viscose Fiber",
    quantity: 8.0,
    unit: "tons",
    location: "Warehouse B",
    status: "critical_stock",
    lastUpdated: "2023-08-10",
  },
  {
    id: "RM005",
    name: "Cotton - J-34",
    quantity: 45.3,
    unit: "tons",
    location: "Warehouse C",
    status: "in_stock",
    lastUpdated: "2023-08-16",
  },
];

const RawMaterials: React.FC = () => {
  const { t } = useLanguage();

  // Function to render appropriate badge for stock status
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-500">{t("in_stock")}</Badge>;
      case "low_stock":
        return <Badge className="bg-amber-500">{t("low_stock")}</Badge>;
      case "critical_stock":
        return <Badge className="bg-red-500">{t("critical_stock")}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("raw_materials_inventory")}</CardTitle>
          <CardDescription>
            {t("raw_materials_overview_description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("material_name")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("location")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("last_updated")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rawMaterialsData.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.id}</TableCell>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>
                    {material.quantity} {t(material.unit)}
                  </TableCell>
                  <TableCell>{material.location}</TableCell>
                  <TableCell>{renderStatusBadge(material.status)}</TableCell>
                  <TableCell>{material.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RawMaterials;
