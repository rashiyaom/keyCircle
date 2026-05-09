import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthDebug from "@/components/AuthDebug";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SignIn from "./pages/SignIn";
import SignUpJourney from "./pages/SignUpJourney";
import AdminSignIn from "./pages/AdminSignIn";
import Dashboard from "./pages/Dashboard";
import ProfileEnhanced from "./pages/ProfileEnhanced";
import Marketplace from "./pages/Marketplace";
import About from "./pages/About";
import Share from "./pages/Share";
import Rent from "./pages/Rent";
import Services from "./pages/Services";
import VehicleDetail from "./pages/VehicleDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthDebug />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileEnhanced /></ProtectedRoute>} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/share" element={<ProtectedRoute><Share /></ProtectedRoute>} />
            <Route path="/rent" element={<ProtectedRoute><Rent /></ProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup/journey" element={<SignUpJourney />} />
            {/* Hidden admin route - not visible in UI */}
            <Route path="/admin/signin" element={<AdminSignIn />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
