import { useState, useEffect } from 'react';
import { episodes as placeholderEpisodes } from '../data/placeholder';

const CACHE_KEY = 'sn-episodes';
const CACHE_TTL = 10 * 60 * 1000;

export function useEpisodes() {
  const [episodes, setEpisodes] = useState(() => {
    // Try cache immediately for instant render
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) return data;
      }
    } catch (e) {}
    return placeholderEpisodes;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if cache is still valid
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) return;
      }
    } catch (e) {}

    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch('/api/episodes', { signal: controller.signal })
      .then(r => r.json())
      .then(data => {
        if (data.episodes && data.episodes.length > 0) {
          setEpisodes(data.episodes);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: data.episodes, timestamp: Date.now() }));
        }
      })
      .catch(() => {})
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
  }, []);

  return { episodes, loading };
}
