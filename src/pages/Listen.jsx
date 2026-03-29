import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { useReveal } from '../lib/useReveal';
import './Listen.css';

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/show/0IJMdqLjeYBy9xdY30t1M1', color: '#1DB954' },
  { name: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/so-nigerian/id1507420236', color: '#A855F7' },
  { name: 'YouTube', url: '#', color: '#FF0000' },
  { name: 'Acast', url: 'https://feeds.acast.com/public/shows/so-nigerian', color: '#FF6B35' },
  { name: 'Podbean', url: 'https://www.podbean.com/podcast-detail/evymz-14569b/So-Nigerian-Podcast', color: '#6DB33F' },
  { name: 'Pod.link', url: 'https://pod.link/sonigerian', color: '#3B82F6' },
];

function RevealItem({ children, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function Listen() {
  const [headerRef, headerVisible] = useReveal();

  return (
    <main className="listen-page">
      <SEO title="Listen" description="Listen to So Nigerian on your favourite podcast platform." path="/listen" />

      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>

      <div className={`listen-split reveal ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
        <div className="listen-image-side">
          <div className="listen-image-wrap">
            <img src="/hosts.png" alt="Dami Aros and Isaac — So Nigerian" />
            <div className="listen-image-overlay" />
          </div>
          <div className="listen-image-footer">
            <span className="listen-badge">New episodes every Monday</span>
          </div>
        </div>

        <div className="listen-content-side">
          <div className="eyebrow"><div className="eyebrow-line" /><span>Listen Now</span></div>
          <h1 className="page-title">Pick your platform</h1>
          <p className="page-sub">So Nigerian is available everywhere you get your podcasts.</p>

          <div className="platforms-list">
            {platforms.map((p, i) => (
              <RevealItem key={p.name} delay={0.1 + i * 0.06}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="platform-card">
                  <div className="platform-icon" style={{ background: p.color }}>{p.name.charAt(0)}</div>
                  <div className="platform-info">
                    <h3>{p.name}</h3>
                    <span>Listen on {p.name}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7.8M17 7.8H7.8"/></svg>
                </a>
              </RevealItem>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
