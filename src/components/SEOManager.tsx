import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageSEO, siteUrl, structuredData } from "@/lib/seo";
export function SEOManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pageSEO[pathname];
    const setMeta = (key: string, value: string, property = false) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.append(element);
      }
      element.content = value;
    };
    setMeta(
      "robots",
      page ? "index, follow, max-image-preview:large" : "noindex, follow",
    );
    if (!page) {
      document.title = "Axenora AI";
      return;
    }
    document.title = page.title;
    setMeta("description", page.description);
    setMeta("og:title", page.title, true);
    setMeta("og:description", page.description, true);
    setMeta("og:url", `${siteUrl}${pathname}`, true);
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) canonical.href = `${siteUrl}${pathname}`;
    const schema = document.getElementById("page-schema");
    if (schema) schema.textContent = JSON.stringify(structuredData(pathname));
  }, [pathname]);
  return null;
}
