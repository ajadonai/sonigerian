import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { episodes } from '../data/placeholder';
import SEO from '../components/SEO';
import ShareButton from '../components/ShareButton';
import { useReveal } from '../lib/useReveal';
import './EpisodeDetail.css';

function RevealItem({ children, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function EpisodeDetail() {
  const { slug } = useParams();
  const episode = episodes.find(e => e.slug === slug);
  const currentIndex = episodes.findIndex(e => e.slug === slug);
  const nextEpisodes = episodes.slice(currentIndex + 1, currentIndex + 3);
  const [heroRef, heroVisible] = useReveal();
  const [notesRef, notesVisible] = useReveal();

  if (!episode) return <main className="episode-detail"><SEO title="Episode Not Found" /><div className="not-found"><p>Episode not found.</p><Link to="/episodes">Back to episodes</Link></div></main>;

  return (
    <main className="episode-detail">
      <SEO title={`EP ${episode.number}: ${episode.title}`} description={episode.description} path={`/episodes/${episode.slug}`} />

      <RevealItem>
        <Link to="/episodes" className="back-link"><ArrowLeft size={16} /> Back to episodes</Link>
      </RevealItem>

      <div className={`detail-hero reveal ${heroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="detail-thumb" style={{ background: `linear-gradient(135deg, #1F6B3A, #3FAE5A)` }}>
          <div className="detail-big-play"><Play size={28} fill="#2E2A28" /></div>
        </div>
        <div className="detail-info">
          <span className="detail-ep-num">Episode {episode.number}</span>
          <h1>{episode.title}</h1>
          <div className="detail-meta">
            {new Date(episode.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {' '}&bull; {episode.duration} &bull; {episode.tags.join(', ')}
          </div>
          <p className="detail-desc">{episode.description}</p>
          <div className="detail-platforms">
            <button className="plat-btn">Spotify</button>
            <button className="plat-btn">Apple Podcasts</button>
            <button className="plat-btn">YouTube</button>
            <ShareButton
              title={`EP ${episode.number}: ${episode.title} — So Nigerian`}
              text={episode.description}
              url={`https://sonigerian.vercel.app/episodes/${episode.slug}`}
            />
          </div>
        </div>
      </div>

      <div className="detail-divider" />

      <div className={`show-notes reveal ${notesVisible ? 'visible' : ''}`} ref={notesRef}>
        <h2>Show notes</h2>
        <p>{episode.showNotes}</p>
      </div>

      {nextEpisodes.length > 0 && (
        <>
          <div className="detail-divider" />
          <div className="up-next">
            <RevealItem>
              <div className="eyebrow"><div className="eyebrow-line" /><span>Up next</span></div>
            </RevealItem>
            {nextEpisodes.map((ep, i) => (
              <RevealItem key={ep.id} delay={(i + 1) * 0.1}>
                <Link to={`/episodes/${ep.slug}`} className="up-next-item">
                  <span className="up-next-num">{ep.number}</span>
                  <div className="up-next-info">
                    <h4>{ep.title}</h4>
                    <p>{ep.description}</p>
                  </div>
                  <span className="up-next-dur">{ep.duration}</span>
                </Link>
              </RevealItem>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
