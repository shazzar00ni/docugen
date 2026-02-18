import JSZip from 'jszip';

/** Export current document as a downloadable ZIP containing index.html and assets */
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
