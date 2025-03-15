
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data
const mockOrders = [
  {
    id: "ORD-1234",
    customer: "Tamil Textiles Ltd.",
    product: "40s Combed Cotton Yarn",
    quantity: "500 kg",
    status: "Pending",
    date: "2023-06-15",
  },
  {
    id: "ORD-1235",
    customer: "Chennai Fabrics",
    product: "60s Compact Yarn",
    quantity: "300 kg",
    status: "Processing",
    date: "2023-06-14",
  },
  {
    id: "ORD-1236",
    customer: "Madurai Mills",
    product: "30s Carded Cotton Yarn",
    quantity: "1000 kg",
    status: "Completed",
    date: "2023-06-13",
  },
  {
    id: "ORD-1237",
    customer: "Coimbatore Spinners",
    product: "20s Blended Yarn",
    quantity: "750 kg",
    status: "Pending",
    date: "2023-06-12",
  },
];

const OrdersTable: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{t("pendingOrders")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
