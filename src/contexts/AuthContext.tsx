
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, UserProfile } from "@/types/auth.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for development
const mockUser = {
  id: "mock-user-id",
  email: "admin@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "",
};

const mockProfile: UserProfile = {
  id: "mock-user-id",
  first_name: "Admin",
  last_name: "User",
  phone: "+1234567890",
  preferred_language: "english",
  role: "admin",
};

// Mock session
const mockSession = {
  access_token: "mock-token",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "mock-refresh-token",
  user: mockUser,
  expires_at: 9999999999,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState(mockSession);
  const [user, setUser] = useState(mockUser);
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [loading, setLoading] = useState(false);

  // Mock authentication functions
  const signIn = async () => ({ error: null });
  const signUp = async () => ({ data: null, error: null });
  const signOut = async () => {};
  const verifyOtp = async () => ({ error: null });

  const isAdmin = profile?.role === "admin";
  const isManager = profile?.role === "manager";
  const isEmployee = profile?.role === "employee";

  const checkUserRole = (allowedRoles: string[]) => {
    if (!profile) return false;
    return allowedRoles.includes(profile.role);
  };

  useEffect(() => {
    // Simulate loading complete
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        verifyOtp,
        isAdmin,
        isManager,
        isEmployee,
        checkUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
