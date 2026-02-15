import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LenisScroll } from "@/components/LenisScroll";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CookieConsent } from "@/components/CookieConsent";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { AIChatbot } from "@/components/AIChatbot";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getSubdomain, SUBDOMAINS } from "@/utils/subdomain";

// Pages
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import WebsiteSolution from "./pages/solutions/WebsiteSolution";
import AdsSolution from "./pages/solutions/AdsSolution";
import WhatsAppSolution from "./pages/solutions/WhatsAppSolution";
import ChatbotSolution from "./pages/solutions/ChatbotSolution";
import CallingSolution from "./pages/solutions/CallingSolution";
import NotFound from "./pages/NotFound";
import PaymentGateway from "./pages/PaymentGateway";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Refund from "./pages/legal/Refund";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "@/pages/dashboard/Dashboard";
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminClients from '@/pages/admin/AdminClients';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminServices from '@/pages/admin/AdminServices';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminTransactions from '@/pages/admin/AdminTransactions';
import { AdminProtectedRoute } from '@/components/AdminProtectedRoute';

const queryClient = new QueryClient();

const App = () => {
  const subdomain = getSubdomain();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <LoadingScreen />
            <LenisScroll>
              <Toaster />
              <Sonner />
              <CookieConsent />
              <WhatsAppWidget />
              <AIChatbot />
              <BrowserRouter>
                <Routes>
                  {/* Subdomain Routing Logic */}
                  {subdomain === SUBDOMAINS.ADMIN ? (
                    <>
                      <Route path="/login" element={<AdminLogin />} />
                      <Route path="/" element={
                        <AdminProtectedRoute>
                          <AdminLayout />
                        </AdminProtectedRoute>
                      }>
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="clients" element={<AdminClients />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="transactions" element={<AdminTransactions />} />
                        <Route path="services" element={<AdminServices />} />
                        <Route path="settings" element={<AdminSettings />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Route>
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                  ) : subdomain === SUBDOMAINS.DASHBOARD ? (
                    <>
                      <Route
                        path="/*"
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />
                    </>
                  ) : subdomain === SUBDOMAINS.LOGIN ? (
                    <>
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/" element={<Navigate to="/login" replace />} />
                      <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                  ) : (
                    /* Main Marketing Site (axenoraai.in) */
                    <>
                      <Route path="/" element={<Index />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/solutions" element={<Solutions />} />
                      <Route path="/solutions/website" element={<WebsiteSolution />} />
                      <Route path="/solutions/ads" element={<AdsSolution />} />
                      <Route path="/solutions/whatsapp" element={<WhatsAppSolution />} />
                      <Route path="/solutions/chatbots" element={<ChatbotSolution />} />
                      <Route path="/solutions/calling" element={<CallingSolution />} />
                      <Route path="/how-it-works" element={<HowItWorks />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/payment" element={<PaymentGateway />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/refund" element={<Refund />} />
                      
                      {/* Redirect old paths to subdomains for SEO/UX */}
                      <Route path="/login" element={<Navigate to={`https://login.axenoraai.in/login`} replace />} />
                      <Route path="/register" element={<Navigate to={`https://login.axenoraai.in/register`} replace />} />
                      <Route path="/dashboard/*" element={<Navigate to={`https://dashboard.axenoraai.in/`} replace />} />
                      <Route path="/admin/*" element={<Navigate to={`https://admin.axenoraai.in/`} replace />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </>
                  )}
                </Routes>
              </BrowserRouter>
            </LenisScroll>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

