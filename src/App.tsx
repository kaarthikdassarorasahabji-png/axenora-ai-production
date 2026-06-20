import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LenisScroll } from "@/components/LenisScroll";
import { CookieConsent } from "@/components/CookieConsent";
import { AIChatbot } from "@/components/AIChatbot";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { lazy, Suspense } from "react";

// Pages
import { AdminProtectedRoute } from '@/components/AdminProtectedRoute';
import { SEOManager } from '@/components/SEOManager';
import { ScrollToTop } from '@/components/ScrollToTop';

const Index = lazy(() => import("./pages/Index"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Features = lazy(() => import("./pages/Features"));
const Empmetria = lazy(() => import("./pages/projects/Empmetria"));
const ProjectDetail = lazy(() => import("./pages/projects/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PaymentGateway = lazy(() => import("./pages/PaymentGateway"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Refund = lazy(() => import("./pages/legal/Refund"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminClients = lazy(() => import('@/pages/admin/AdminClients'));
const AdminOrders = lazy(() => import('@/pages/admin/AdminOrders'));
const AdminServices = lazy(() => import('@/pages/admin/AdminServices'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminTransactions = lazy(() => import('@/pages/admin/AdminTransactions'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <LenisScroll>
            <Toaster />
            <Sonner />
            <CookieConsent />
            <AIChatbot />
            <BrowserRouter>
              <SEOManager />
              <ScrollToTop />
              <Suspense fallback={<div className="min-h-screen bg-[#0c1413]" />}>
              <Routes>
                {/* Marketing Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/projects/empmetria" element={<Empmetria />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/solutions/website" element={<Navigate to="/projects/crm" replace />} />
                <Route path="/solutions/ads" element={<Navigate to="/projects/instagram" replace />} />
                <Route path="/solutions/whatsapp" element={<Navigate to="/projects/whatsapp" replace />} />
                <Route path="/solutions/chatbots" element={<Navigate to="/projects/chatbots" replace />} />
                <Route path="/solutions/calling" element={<Navigate to="/projects/office-automation" replace />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payment" element={<PaymentGateway />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/refund" element={<Refund />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User Dashboard Routes (Path-based) */}
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes (Path-based) */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="clients" element={<AdminClients />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="transactions" element={<AdminTransactions />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
            </BrowserRouter>
          </LenisScroll>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
