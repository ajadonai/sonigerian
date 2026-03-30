import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { useReveal } from '../lib/useReveal';
import './Listen.css';

const SpotifyIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
const AppleIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
const YouTubeIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const AcastIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>;
const PodbeanIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>;

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/show/0IJMdqLjeYBy9xdY30t1M1', icon: SpotifyIcon, color: '#1DB954' },
  { name: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/so-nigerian/id1507420236', icon: AppleIcon, color: '#A855F7' },
  { name: 'YouTube', url: 'https://youtube.com/@sonigerianpodcast', icon: YouTubeIcon, color: '#FF0000' },
  { name: 'Acast', url: 'https://feeds.acast.com/public/shows/so-nigerian', icon: AcastIcon, color: '#FF6B35' },
  { name: 'Podbean', url: 'https://www.podbean.com/podcast-detail/evymz-14569b/So-Nigerian-Podcast', icon: PodbeanIcon, color: '#6DB33F' },
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
      <SEO title="Platforms" description="Listen to So Nigerian on your favourite podcast platform." path="/listen" />

      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>

      <div className={`listen-split reveal ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
        <div className="listen-image-side">
          <div className="listen-image-wrap">
            <img src="/hosts.jpg" alt="Dami Aros and Isaac — So Nigerian" />
            <div className="listen-image-overlay" />
          </div>
          <div className="listen-image-footer">
            <span className="listen-badge">New episodes every Monday</span>
          </div>
        </div>

        <div className="listen-content-side">
          <div className="eyebrow"><div className="eyebrow-line" /><span>Platforms</span></div>
          <h1 className="page-title">Where to listen</h1>
          <p className="page-sub">So Nigerian is available everywhere you get your podcasts.</p>

          <div className="platforms-list">
            {platforms.map((p, i) => (
              <RevealItem key={p.name} delay={0.1 + i * 0.06}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="platform-card">
                  <div className="platform-icon" style={{ color: p.color }}><p.icon /></div>
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
