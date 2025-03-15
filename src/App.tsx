
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Production from "@/pages/Production";
import Inventory from "@/pages/Inventory";
import Quality from "@/pages/Quality";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              } 
            />
            <Route 
              path="/production" 
              element={
                <Layout>
                  <Production />
                </Layout>
              } 
            />
            <Route 
              path="/production/performance" 
              element={
                <Layout>
                  <Production />
                </Layout>
              } 
            />
            <Route 
              path="/production/machinery" 
              element={
                <Layout>
                  <Production />
                </Layout>
              } 
            />
            <Route 
              path="/production/processes" 
              element={
                <Layout>
                  <Production />
                </Layout>
              } 
            />
            <Route 
              path="/production/maintenance" 
              element={
                <Layout>
                  <Production />
                </Layout>
              } 
            />
            <Route 
              path="/production/tracking" 
              element={
                <Layout>
                  <Production />
                </Layout>
              } 
            />
            <Route 
              path="/inventory" 
              element={
                <Layout>
                  <Inventory />
                </Layout>
              } 
            />
            <Route 
              path="/quality" 
              element={
                <Layout>
                  <Quality />
                </Layout>
              } 
            />
            <Route 
              path="/finance" 
              element={
                <Layout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Finance Module</h1>
                    <p className="text-muted-foreground mt-2">This module will be implemented in the next update.</p>
                  </div>
                </Layout>
              } 
            />
            <Route 
              path="/hr" 
              element={
                <Layout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Human Resources Module</h1>
                    <p className="text-muted-foreground mt-2">This module will be implemented in the next update.</p>
                  </div>
                </Layout>
              } 
            />
            <Route 
              path="/crm" 
              element={
                <Layout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Customer Relationship Module</h1>
                    <p className="text-muted-foreground mt-2">This module will be implemented in the next update.</p>
                  </div>
                </Layout>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <Layout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-muted-foreground mt-2">Settings will be implemented in the next update.</p>
                  </div>
                </Layout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
