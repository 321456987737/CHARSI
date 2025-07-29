export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://charsi-sage.vercel.app';

  // Example dynamic slugs (you can fetch from DB or file)
  const slugs = ['blog-1', 'blog-2', 'blog-3'];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${slugs
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
