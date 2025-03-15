
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

// Form validation schema
const formSchema = z.object({
  batchId: z.string().min(1, { message: "Batch ID is required" }),
  machine: z.string().min(1, { message: "Machine is required" }),
  twist: z.coerce.number().min(0).max(100),
  evenness: z.coerce.number().min(0).max(100),
  tensileStrength: z.coerce.number().min(0).max(100),
  elongation: z.coerce.number().min(0).max(100),
  hairiness: z.coerce.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

interface AddTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTestDialog: React.FC<AddTestDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useLanguage();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batchId: "",
      machine: "",
      twist: 95,
      evenness: 93,
      tensileStrength: 96,
      elongation: 91,
      hairiness: 88,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Test data:", data);
    
    // Show success toast
    toast({
      title: t("test_added"),
      description: t("test_added_successfully"),
    });
    
    // Reset form and close dialog
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("add_test")}</DialogTitle>
          <DialogDescription>
            {t("add_new_quality_test_results")}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="batchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("batch")}</FormLabel>
                    <FormControl>
                      <Input placeholder="B2023-0716-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="machine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("machine")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_machine")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ring Spinning 01">Ring Spinning 01</SelectItem>
                        <SelectItem value="Ring Spinning 02">Ring Spinning 02</SelectItem>
                        <SelectItem value="Ring Spinning 03">Ring Spinning 03</SelectItem>
                        <SelectItem value="Ring Spinning 04">Ring Spinning 04</SelectItem>
                        <SelectItem value="Open-End Spinning 01">Open-End Spinning 01</SelectItem>
                        <SelectItem value="Open-End Spinning 02">Open-End Spinning 02</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <h3 className="text-sm font-medium mt-2">{t("quality_parameters")}</h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="twist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("twist")} (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="evenness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("evenness")} (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tensileStrength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("tensile_strength")} (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="elongation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("elongation")} (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hairiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("hairiness")} (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">{t("save_test")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTestDialog;
