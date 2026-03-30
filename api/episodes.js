export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');

  try {
    const response = await fetch('https://feeds.acast.com/public/shows/so-nigerian');
    const xml = await response.text();

    const episodes = [];
    const items = xml.split('<item>').slice(1);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const getTag = (tag) => {
        const cdataMatch = item.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`));
        if (cdataMatch) return cdataMatch[1].trim();
        const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
        return match ? match[1].trim() : '';
      };

      const getAttr = (tag, attr) => {
        const match = item.match(new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, 'i'));
        return match ? match[1] : '';
      };

      const title = getTag('title');
      const rawDesc = getTag('description');
      const pubDate = getTag('pubDate');
      const duration = getTag('itunes:duration');
      const audioUrl = getAttr('enclosure', 'url');
      const acastLink = getTag('link');
      const season = getTag('itunes:season');
      const epNum = getTag('itunes:episode');
      const episodeUrl = getAttr('acast:episodeUrl', 'acast:episodeUrl') ||
        item.match(/<acast:episodeUrl>([^<]*)<\/acast:episodeUrl>/)?.[1] || '';

      // Clean description — remove HTML tags, social links boilerplate
      let description = rawDesc
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Remove the "FOLLOW US ON" boilerplate and everything after
      const followIdx = description.indexOf('FOLLOW US ON');
      if (followIdx > 0) description = description.substring(0, followIdx).trim();

      const joinIdx = description.indexOf('JOIN THE WHATSAPP');
      if (joinIdx > 0) description = description.substring(0, joinIdx).trim();

      // Remove "Hosted on Acast" boilerplate
      const acastIdx = description.indexOf('Hosted on Acast');
      if (acastIdx > 0) description = description.substring(0, acastIdx).trim();

      // Remove YouTube watch links at the start
      description = description.replace(/^(Please )?(Watch|watch|View).*?https?:\/\/[^\s]+\s*/i, '').trim();

      // Create slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 80);

      const episodeNumber = items.length - i;

      episodes.push({
        id: i + 1,
        number: epNum ? parseInt(epNum) : episodeNumber,
        season: season ? parseInt(season) : null,
        title,
        description: description.substring(0, 300),
        showNotes: description,
        slug,
        date: pubDate,
        duration,
        audioUrl,
        acastLink,
        status: 'published',
        tags: [],
      });
    }

    return res.status(200).json({ episodes, total: episodes.length });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch RSS feed', details: err.message });
  }
}
