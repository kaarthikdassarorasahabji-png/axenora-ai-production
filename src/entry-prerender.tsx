import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "@/pages/StudioHome";
import {
  Solutions,
  Project,
  About,
  Process,
  Capabilities,
} from "@/pages/StudioPages";
import Pricing from "@/pages/StudioPricing";
import Contact from "@/pages/Contact";
const Empmetria = () => <Project projectSlug="empmetria" />;
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";
import Refund from "@/pages/legal/Refund";
export { pageSEO, siteUrl, structuredData } from "@/lib/seo";
export function render(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/features" element={<Capabilities />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<Process />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/empmetria" element={<Empmetria />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
        </Routes>
      </AuthProvider>
    </StaticRouter>,
  );
}
