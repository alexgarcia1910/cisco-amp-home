import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import EnterpriseSoftwarePortfolioNew from "./pages/EnterpriseSoftwarePortfolioNew";
import SoftwareEntitlement from "./pages/SoftwareEntitlement";
import FinancialAnalystPO from "./pages/FinancialAnalystPO";
import FinancialAnalystPODetail from "./pages/FinancialAnalystPODetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/enterprisesoftwareportfolionew" element={<EnterpriseSoftwarePortfolioNew />} />
          <Route path="/softwareentitlement" element={<SoftwareEntitlement />} />
          <Route path="/financialanalystpo" element={<FinancialAnalystPO />} />
          <Route path="/financialanalystpo/:id" element={<FinancialAnalystPODetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
