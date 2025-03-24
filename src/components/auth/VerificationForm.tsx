
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// OTP Verification Schema
const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

type OtpFormValues = z.infer<typeof otpSchema>;

interface VerificationFormProps {
  email: string;
  onBackToLogin: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ 
  email, 
  onBackToLogin 
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();
  const [loading, setLoading] = React.useState(false);

  // OTP form
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpFormValues) => {
    setLoading(true);
    try {
      const { error } = await verifyOtp(email, data.otp);
      
      if (!error) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        {t("otp_sent_to")} {email}
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="mx-auto text-center">
                <FormLabel>{t("verification_code")}</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : t("verify")}
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full"
            onClick={onBackToLogin}
          >
            {t("back_to_login")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerificationForm;
