
import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically add the item to your inventory
    // For now, just close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("add_inventory_item")}</DialogTitle>
          <DialogDescription>
            {t("add_item_description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-type" className="text-right">
                {t("item_type")}
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("select_item_type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raw_material">{t("raw_material")}</SelectItem>
                  <SelectItem value="work_in_progress">{t("work_in_progress")}</SelectItem>
                  <SelectItem value="finished_good">{t("finished_good")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-name" className="text-right">
                {t("item_name")}
              </Label>
              <Input
                id="item-name"
                placeholder={t("enter_item_name")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                {t("quantity")}
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                {t("unit")}
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("select_unit")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tons">{t("tons")}</SelectItem>
                  <SelectItem value="kg">{t("kg")}</SelectItem>
                  <SelectItem value="lbs">{t("lbs")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                {t("location")}
              </Label>
              <Input
                id="location"
                placeholder={t("enter_location")}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{t("add_item")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
