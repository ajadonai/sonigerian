import { useEffect } from 'react';

const DEFAULTS = {
  title: 'So Nigerian Podcast — With Dami Aros & Isaac',
  description: 'Bold social commentary podcast unpacking pop culture, relationships, Japa struggles, and everyday experiences that define young Nigerians. Real talk. No filter. New episodes every Monday.',
  image: 'https://sonigerian.com/og-image.png',
  url: 'https://sonigerian.com',
  siteName: 'So Nigerian Podcast',
  twitterHandle: '@sonigerian_',
};

export default function SEO({ title, description, path = '', episodeData = null }) {
  const fullTitle = title ? `${title} — So Nigerian Podcast` : DEFAULTS.title;
  const desc = description || DEFAULTS.description;
  const url = `${DEFAULTS.url}${path}`;
  const image = DEFAULTS.image;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard
    setMeta('name', 'description', desc);
    setMeta('name', 'author', 'Dami Aros & Isaac Aigbadumah');
    setMeta('name', 'theme-color', '#1F6B3A');

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:site_name', DEFAULTS.siteName);
    setMeta('property', 'og:locale', 'en_NG');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', DEFAULTS.twitterHandle);
    setMeta('name', 'twitter:creator', DEFAULTS.twitterHandle);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // JSON-LD Structured Data
    let ldScript = document.querySelector('script[data-seo-ld]');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.setAttribute('type', 'application/ld+json');
      ldScript.setAttribute('data-seo-ld', 'true');
      document.head.appendChild(ldScript);
    }

    if (episodeData) {
      // Episode page
      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'PodcastEpisode',
        name: episodeData.title,
        description: desc,
        url: url,
        datePublished: episodeData.date,
        duration: episodeData.duration,
        associatedMedia: episodeData.audioUrl ? {
          '@type': 'MediaObject',
          contentUrl: episodeData.audioUrl,
          encodingFormat: 'audio/mpeg',
        } : undefined,
        partOfSeries: {
          '@type': 'PodcastSeries',
          name: 'So Nigerian',
          url: 'https://sonigerian.com',
        },
      });
    } else if (path === '' || path === '/') {
      // Homepage — podcast series schema
      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'PodcastSeries',
        name: 'So Nigerian',
        description: DEFAULTS.description,
        url: 'https://sonigerian.com',
        image: image,
        author: [
          { '@type': 'Person', name: 'Dami Aros' },
          { '@type': 'Person', name: 'Isaac Aigbadumah' },
        ],
        publisher: {
          '@type': 'Organization',
          name: 'Eggcorn Digital',
          url: 'https://eggcorndigital.com',
        },
        inLanguage: 'en',
        genre: ['Society & Culture', 'Comedy'],
        webFeed: 'https://feeds.acast.com/public/shows/so-nigerian',
      });
    } else {
      // Other pages — website schema
      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        description: desc,
        url: url,
        isPartOf: {
          '@type': 'WebSite',
          name: 'So Nigerian Podcast',
          url: 'https://sonigerian.com',
        },
      });
    }
  }, [fullTitle, desc, url, image, episodeData]);

  return null;
}
