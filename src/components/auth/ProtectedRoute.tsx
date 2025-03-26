
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

type UserRole = "admin" | "manager" | "employee";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ["admin", "manager", "employee"],
}) => {
  const { loading } = useAuth();

  if (loading) {
    // Show loading spinner while checking authentication
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // With mock auth context, users always have access
  return <>{children}</>;
};

export default ProtectedRoute;
