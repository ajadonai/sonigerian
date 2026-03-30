import { useState, useEffect } from 'react';

const CACHE_KEY = 'sn-episodes';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export function useEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check cache first
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setEpisodes(data);
          setLoading(false);
          return;
        }
      } catch (e) {}
    }

    fetch('/api/episodes')
      .then(r => r.json())
      .then(data => {
        if (data.episodes) {
          setEpisodes(data.episodes);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: data.episodes, timestamp: Date.now() }));
        }
      })
      .catch(() => {
        // Fallback to placeholder data if API fails
        import('../data/placeholder').then(mod => {
          setEpisodes(mod.episodes);
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return { episodes, loading };
}
