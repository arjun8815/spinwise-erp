
import { Session, User } from "@supabase/supabase-js";

export type UserRole = "admin" | "manager" | "employee";

export type UserProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  preferred_language: string;
  role: UserRole;
};

export type SignUpData = {
  first_name: string;
  last_name: string;
  phone: string;
  preferred_language: string;
  role: UserRole;
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    userData: SignUpData
  ) => Promise<{ error: any; data: any }>;
  signOut: () => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<{ error: any }>;
  isAdmin: boolean;
  isManager: boolean;
  isEmployee: boolean;
  checkUserRole: (allowedRoles: string[]) => boolean;
};
