
import { supabase } from "@/integrations/supabase/client";
import { SignUpData, UserProfile } from "@/types/auth.types";
import { useToast } from "@/hooks/use-toast";

export const useAuthApi = () => {
  const { toast } = useToast();

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user ID:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      console.log("Profile data:", data);
      return data as UserProfile;
    } catch (error) {
      console.error("Profile fetch error:", error);
      return null;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: SignUpData
  ) => {
    try {
      console.log("Signing up with data:", { email, userData });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone,
            preferred_language: userData.preferred_language || "english",
            role: userData.role || "employee",
          },
        },
      });

      if (error) {
        console.error("Sign up error:", error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log("Sign up successful:", data);
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification.",
        });
      }

      return { data, error };
    } catch (error: any) {
      console.error("Unexpected sign up error:", error);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        toast({
          title: "Verification failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Verification successful",
          description: "You have successfully verified your account.",
        });
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  return {
    fetchUserProfile,
    signUp,
    signIn,
    verifyOtp,
    signOut,
  };
};
