import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import GrowthHub from "./pages/GrowthHub";
import WebsiteSolution from "./pages/solutions/WebsiteSolution";
import AdsSolution from "./pages/solutions/AdsSolution";
import WhatsAppSolution from "./pages/solutions/WhatsAppSolution";
import ChatbotSolution from "./pages/solutions/ChatbotSolution";
import CallingSolution from "./pages/solutions/CallingSolution";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/website" element={<WebsiteSolution />} />
          <Route path="/solutions/ads" element={<AdsSolution />} />
          <Route path="/solutions/whatsapp" element={<WhatsAppSolution />} />
          <Route path="/solutions/chatbots" element={<ChatbotSolution />} />
          <Route path="/solutions/calling" element={<CallingSolution />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/growth-hub" element={<GrowthHub />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
