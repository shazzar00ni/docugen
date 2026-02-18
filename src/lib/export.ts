import JSZip from 'jszip';

/**
 * Create a ZIP archive containing an index.html (with the provided CSS and JS embedded), a README.md, and a sitemap.xml.
 *
 * The generated index.html includes a root div and embeds `css` inside a <style> tag and `js` inside a <script> tag.
 *
 * @param html - (currently unused) HTML string placeholder for future inclusion in the exported index
 * @param css - CSS content to embed into the generated index.html
 * @param js - JavaScript content to embed into the generated index.html
 * @returns A Blob representing the generated ZIP archive
 */
export async function exportStaticZip(html: string, css: string, js: string): Promise<Blob> {
  const zip = new JSZip();

  // Create index.html with base tag for asset paths
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documentation</title>
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <script>${js}</script>
</body>
</html>`;

  zip.file('index.html', indexHtml);

  // Add common assets (if any) – for now just placeholder files
  zip.file('README.md', '# Exported Documentation\n\nGenerated on: ' + new Date().toISOString());
  zip.file('sitemap.xml', generateSitemapXml());

  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
}

/**
 * Generates a minimal sitemap XML containing a single URL entry for the site root.
 *
 * @returns A sitemap XML string with an XML declaration and a `urlset` containing one `url` whose `loc` is `https://your-domain.com/`, whose `lastmod` is the current date in `YYYY-MM-DD` format, and whose `changefreq` is `weekly`.
 */
function generateSitemapXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
</urlset>`;
}