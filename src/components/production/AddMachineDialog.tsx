
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AddMachineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Machine name is required" }),
  type: z.string().min(1, { message: "Machine type is required" }),
  area: z.string().min(1, { message: "Production area is required" }),
  description: z.string().optional(),
  model: z.string().optional(),
  manufacturer: z.string().optional(),
  installationDate: z.string().optional(),
  outputMetric: z.string().min(1, { message: "Output metric is required" }),
  outputUnit: z.string().min(1, { message: "Output unit is required" }),
});

const AddMachineDialog: React.FC<AddMachineDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      area: "",
      description: "",
      model: "",
      manufacturer: "",
      installationDate: "",
      outputMetric: "",
      outputUnit: ""
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, this would save to database
    console.log(values);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("add_new_machine")}</DialogTitle>
          <DialogDescription>
            {t("add_machine_description")}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("machine_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_machine_name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("machine_type")}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_machine_type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bale Opener">Bale Opener</SelectItem>
                        <SelectItem value="Bale Feeder">Bale Feeder</SelectItem>
                        <SelectItem value="Blower">Blower</SelectItem>
                        <SelectItem value="Carding">Carding Machine</SelectItem>
                        <SelectItem value="Drawing">Drawing Frame</SelectItem>
                        <SelectItem value="Combing">Combing Machine</SelectItem>
                        <SelectItem value="Roving">Roving Frame</SelectItem>
                        <SelectItem value="Ring Spinning">Ring Spinning</SelectItem>
                        <SelectItem value="Open-End Spinning">Open-End Spinning</SelectItem>
                        <SelectItem value="Winding">Winding Machine</SelectItem>
                        <SelectItem value="Quality Control">Quality Control</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("production_area")}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_production_area")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pre-Spinning">{t("pre_spinning")}</SelectItem>
                      <SelectItem value="Spinning">{t("spinning")}</SelectItem>
                      <SelectItem value="Post-Spinning">{t("post_spinning")}</SelectItem>
                      <SelectItem value="Quality Control">{t("quality_control")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("machine_description_placeholder")} 
                      {...field}
                      className="h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("model")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_model")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("manufacturer")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_manufacturer")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="installationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("installation_date")}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t("output_metrics")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="outputMetric"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("metric_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("e.g._production_rate")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="outputUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("unit")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("e.g._kg_per_hour")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t("cancel")}
              </Button>
              <Button type="submit">{t("add_machine")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMachineDialog;
