
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

// Sample data for finished goods
const finishedGoodsData = [
  {
    id: "FG001",
    name: "30s Cotton Yarn",
    batchNumber: "B12345",
    count: "30",
    quantity: 35.8,
    unit: "tons",
    packageType: "cone",
    location: "Finished Goods Store A",
    productionDate: "2023-08-10",
    status: "ready_for_shipment"
  },
  {
    id: "FG002",
    name: "40s Cotton Yarn",
    batchNumber: "B12346",
    count: "40",
    quantity: 28.4,
    unit: "tons",
    packageType: "cone",
    location: "Finished Goods Store A",
    productionDate: "2023-08-12",
    status: "ready_for_shipment"
  },
  {
    id: "FG003",
    name: "60s Cotton Yarn",
    batchNumber: "B12347",
    count: "60",
    quantity: 15.2,
    unit: "tons",
    packageType: "cone",
    location: "Finished Goods Store B",
    productionDate: "2023-08-13",
    status: "quality_check"
  },
  {
    id: "FG004",
    name: "20s Polyester Cotton Blend",
    batchNumber: "B12348",
    count: "20",
    quantity: 42.5,
    unit: "tons",
    packageType: "cone",
    location: "Finished Goods Store B",
    productionDate: "2023-08-14",
    status: "ready_for_shipment"
  },
  {
    id: "FG005",
    name: "30s Viscose Blend",
    batchNumber: "B12349",
    count: "30",
    quantity: 30.9,
    unit: "tons",
    packageType: "cone",
    location: "Finished Goods Store C",
    productionDate: "2023-08-15",
    status: "reserved"
  }
];

const FinishedGoods: React.FC = () => {
  const { t } = useLanguage();

  // Function to render appropriate badge for status
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "ready_for_shipment":
        return <Badge className="bg-green-500">{t("ready_for_shipment")}</Badge>;
      case "quality_check":
        return <Badge className="bg-blue-500">{t("quality_check")}</Badge>;
      case "reserved":
        return <Badge className="bg-purple-500">{t("reserved")}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("finished_goods_inventory")}</CardTitle>
          <CardDescription>
            {t("finished_goods_overview_description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("yarn_name")}</TableHead>
                <TableHead>{t("batch_number")}</TableHead>
                <TableHead>{t("count")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("location")}</TableHead>
                <TableHead>{t("production_date")}</TableHead>
                <TableHead>{t("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finishedGoodsData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.batchNumber}</TableCell>
                  <TableCell>{item.count}s</TableCell>
                  <TableCell>
                    {item.quantity} {t(item.unit)}
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.productionDate}</TableCell>
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

export default FinishedGoods;
