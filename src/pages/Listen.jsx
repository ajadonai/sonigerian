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

      <div className={`listen-header reveal ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
        <Link to="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>
        <div className="eyebrow"><div className="eyebrow-line" /><span>Listen Now</span></div>
        <h1 className="page-title">Pick your platform</h1>
        <p className="page-sub">So Nigerian is available everywhere you get your podcasts.</p>
      </div>

      <div className="platforms-grid">
        {platforms.map((p, i) => (
          <RevealItem key={p.name} delay={i * 0.08}>
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

      <div className="listen-footer-note">
        <p>New episodes every Monday. Subscribe and never miss one.</p>
      </div>
    </main>
  );
}
