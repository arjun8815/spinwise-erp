
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LifeBuoy } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const supportFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

const ContactSupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: SupportFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would send this data to your backend
      console.log("Support request submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting support request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset the form and submitted state after dialog closes
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 300);
  };

  return (
    <>
      <div className="mt-6 text-center">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1.5 text-textile-500 hover:text-textile-600 hover:bg-transparent"
          onClick={() => setIsOpen(true)}
        >
          <LifeBuoy className="w-4 h-4" />
          <span>{t("need_help")}</span>
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isSubmitted ? t("thank_you") : t("contact_support")}</DialogTitle>
            <DialogDescription>
              {isSubmitted 
                ? t("support_submitted") 
                : t("support_description")}
            </DialogDescription>
          </DialogHeader>

          {!isSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">{t("name")}</Label>
                      <FormControl>
                        <Input id="name" placeholder={t("your_name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">{t("email")}</Label>
                      <FormControl>
                        <Input id="email" type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="message">{t("message")}</Label>
                      <FormControl>
                        <Textarea 
                          id="message" 
                          placeholder={t("describe_issue")}
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("sending") : t("send_message")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <Button onClick={handleClose}>{t("close")}</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactSupportButton;
