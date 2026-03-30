export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

  const base = 'https://sonigerian.com';
  const now = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/episodes', priority: '0.9', changefreq: 'weekly' },
    { url: '/dilemma', priority: '0.8', changefreq: 'weekly' },
    { url: '/listen', priority: '0.6', changefreq: 'monthly' },
  ];

  // Fetch episodes from RSS
  let episodeUrls = [];
  try {
    const response = await fetch('https://feeds.acast.com/public/shows/so-nigerian');
    const xml = await response.text();
    const items = xml.split('<item>').slice(1);

    for (const item of items) {
      const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      
      if (titleMatch) {
        const title = titleMatch[1].trim();
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .substring(0, 80);
        
        const date = dateMatch ? new Date(dateMatch[1]).toISOString().split('T')[0] : now;
        episodeUrls.push({ url: `/episodes/${slug}`, date, priority: '0.7', changefreq: 'monthly' });
      }
    }
  } catch (e) {
    // If RSS fails, still return static pages
  }

  const allUrls = [...staticPages.map(p => ({ ...p, date: now })), ...episodeUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(p => `  <url>
    <loc>${base}${p.url}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return res.status(200).send(sitemap);
}
