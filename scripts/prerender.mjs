import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
try {
  const { render, pageSEO, siteUrl, structuredData } =
    await server.ssrLoadModule("/src/entry-prerender.tsx");
  const template = await readFile("dist/index.html", "utf8");
  const manifest = JSON.parse(
    await readFile("dist/.vite/manifest.json", "utf8"),
  );
  for (const [route, seo] of Object.entries(pageSEO)) {
    let body = render(route).replaceAll("opacity:0", "opacity:1");
    for (const [source, asset] of Object.entries(manifest)) {
      body = body.replaceAll(`/${source}`, `/${asset.file}`);
    }
    const url = `${siteUrl}${route}`;
    let html = template
      .replace(/<title>.*?<\/title>/s, `<title>${escape(seo.title)}</title>`)
      .replace(
        /(<meta name="description" content=")[^"]*("\s*\/?>)/,
        `$1${escape(seo.description)}$2`,
      )
      .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${url}$2`);
    for (const key of [
      "og:title",
      "twitter:title",
      "og:description",
      "twitter:description",
      "og:url",
    ]) {
      const value = key.endsWith("title")
        ? seo.title
        : key.endsWith("description")
          ? seo.description
          : url;
      html = html.replace(
        new RegExp(
          `(<meta (?:name|property)="${key}" content=")[^"]*("\\s*\\/?>)`,
        ),
        `$1${escape(value)}$2`,
      );
    }
    html = html
      .replace(
        /(<script type="application\/ld\+json" id="page-schema">).*?(<\/script>)/s,
        `$1${JSON.stringify(structuredData(route)).replaceAll("<", "\\u003c")}$2`,
      )
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    const directory = path.join("dist", route);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), html);
  }
  const routes = Object.keys(pageSEO);
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${siteUrl}${route}</loc></url>`).join("")}</urlset>`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /dashboard\nDisallow: /api/\nDisallow: /login\nDisallow: /register\nDisallow: /payment\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
  await writeFile(
    "dist/llms.txt",
    `# Axenora AI\n\nCustom business software and conversational AI by Kaarthik Dass Arora.\n\n${routes.map((route) => `- [${pageSEO[route].title}](${siteUrl}${route}): ${pageSEO[route].description}`).join("\n")}\n\nElvori: https://elovri.axenoraai.in. Private client collaboration; example conversations are illustrative.\nAI calling is a custom implementation with providers and integrations agreed during scoping.\nContact: contact@axenoraai.in\n`,
  );
  console.log(
    `Prerendered ${routes.length} public pages with metadata and structured data.`,
  );
} finally {
  await server.close();
}
