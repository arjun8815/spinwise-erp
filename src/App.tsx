
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Production from "@/pages/Production";
import Inventory from "@/pages/Inventory";
import Quality from "@/pages/Quality";
import Auth from "@/pages/Auth";
import UserManagement from "@/pages/UserManagement";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/production" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
                    <Layout>
                      <Production />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/production/performance" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
                    <Layout>
                      <Production />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/production/machinery" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
                    <Layout>
                      <Production />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/production/processes" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
                    <Layout>
                      <Production />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/production/maintenance" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
                    <Layout>
                      <Production />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/production/tracking" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
                    <Layout>
                      <Production />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/inventory" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager"]}>
                    <Layout>
                      <Inventory />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/quality" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager"]}>
                    <Layout>
                      <Quality />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/finance" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager"]}>
                    <Layout>
                      <div className="p-8 text-center">
                        <h1 className="text-2xl font-bold">Finance Module</h1>
                        <p className="text-muted-foreground mt-2">This module will be implemented in the next update.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hr" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager"]}>
                    <Layout>
                      <div className="p-8 text-center">
                        <h1 className="text-2xl font-bold">Human Resources Module</h1>
                        <p className="text-muted-foreground mt-2">This module will be implemented in the next update.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/crm" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager"]}>
                    <Layout>
                      <div className="p-8 text-center">
                        <h1 className="text-2xl font-bold">Customer Relationship Module</h1>
                        <p className="text-muted-foreground mt-2">This module will be implemented in the next update.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <UserManagement />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute allowedRoles={["admin", "manager"]}>
                    <Layout>
                      <div className="p-8 text-center">
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p className="text-muted-foreground mt-2">Settings will be implemented in the next update.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
