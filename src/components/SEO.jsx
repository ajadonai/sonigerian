import { useEffect } from 'react';

const DEFAULTS = {
  title: 'So Nigerian — Podcast with Dami Aros & Isaac',
  description: 'Bold social commentary podcast unpacking pop culture, relationships, Japa struggles, and everyday Nigerian life.',
  image: '/hosts.png',
  url: 'https://sonigerian.vercel.app',
};

export default function SEO({ title, description, path = '' }) {
  const fullTitle = title ? `${title} — So Nigerian` : DEFAULTS.title;
  const desc = description || DEFAULTS.description;
  const url = `${DEFAULTS.url}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`) ||
               document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          el.setAttribute('property', property);
        } else {
          el.setAttribute('name', property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', desc);
    setMeta('og:title', fullTitle);
    setMeta('og:description', desc);
    setMeta('og:url', url);
    setMeta('og:type', 'website');
    setMeta('og:image', DEFAULTS.image);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', DEFAULTS.image);
  }, [fullTitle, desc, url]);

  return null;
}
