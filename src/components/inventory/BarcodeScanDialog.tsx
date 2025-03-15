
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Barcode, Search } from "lucide-react";

interface BarcodeScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BarcodeScanDialog: React.FC<BarcodeScanDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = useLanguage();
  const [barcodeValue, setBarcodeValue] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Simulate barcode scanning
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        // Generate a random barcode for simulation
        const randomBarcode = "INV" + Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
        setBarcodeValue(randomBarcode);
        setIsScanning(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  const handleStartScan = () => {
    setBarcodeValue("");
    setIsScanning(true);
  };

  const handleManualEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search for the item with this barcode
    // or add it to the system
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("scan_barcode")}</DialogTitle>
          <DialogDescription>
            {t("scan_barcode_description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center justify-center gap-4 p-4 border rounded-lg">
              {isScanning ? (
                <div className="flex flex-col items-center justify-center h-40">
                  <Barcode className="animate-pulse w-16 h-16 text-primary" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t("scanning_barcode")}...
                  </p>
                </div>
              ) : (
                <>
                  {barcodeValue ? (
                    <div className="flex flex-col items-center justify-center h-40">
                      <Barcode className="w-16 h-16 text-primary" />
                      <p className="mt-4 font-mono text-lg">{barcodeValue}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40">
                      <Barcode className="w-16 h-16 text-muted-foreground" />
                      <p className="mt-4 text-sm text-muted-foreground">
                        {t("no_barcode_scanned")}
                      </p>
                    </div>
                  )}
                </>
              )}
              <Button
                type="button"
                onClick={handleStartScan}
                disabled={isScanning}
                className="w-full"
              >
                <Barcode className="mr-2 h-4 w-4" />
                {isScanning ? t("scanning") : t("start_scan")}
              </Button>
            </div>

            <div className="grid gap-4">
              <Label htmlFor="manual-entry">{t("or_enter_manually")}</Label>
              <div className="flex gap-2">
                <Input
                  id="manual-entry"
                  value={barcodeValue}
                  onChange={handleManualEntry}
                  placeholder={t("enter_barcode_manually")}
                  className="flex-1"
                />
                <Button type="submit" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!barcodeValue}>
              {t("find_item")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScanDialog;
