import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Play, ArrowUpDown } from 'lucide-react';
import { useEpisodes } from '../lib/useEpisodes';
import SEO from '../components/SEO';
import { useReveal } from '../lib/useReveal';
import './Episodes.css';

const PER_PAGE = 12;

function RevealItem({ children, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function Episodes() {
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [sortOrder, setSortOrder] = useState('newest');
  const [headerRef, headerVisible] = useReveal();
  const [controlsRef, controlsVisible] = useReveal();
  const { episodes, loading } = useEpisodes();

  const filtered = episodes.filter(ep =>
    ep.title.toLowerCase().includes(search.toLowerCase()) ||
    ep.description.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  const visible = sorted.slice(0, visibleCount);

  return (
    <main className="episodes-page">
      <SEO title="Episodes" description="Browse all episodes of the So Nigerian podcast." path="/episodes" />

      <div className={`episodes-page-header reveal ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
        <div className="eyebrow"><div className="eyebrow-line" /><span>All Episodes</span></div>
        <h1 className="page-title">The archive</h1>
        <p className="page-sub">{episodes.length} episodes. Every conversation, every hot take.</p>
      </div>

      <div className={`episodes-controls reveal ${controlsVisible ? 'visible' : ''}`} ref={controlsRef}>
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search episodes..." value={search} onChange={e => { setSearch(e.target.value); setVisibleCount(PER_PAGE); }} />
        </div>
        <button className="sort-btn" onClick={() => setSortOrder(s => s === 'newest' ? 'oldest' : 'newest')}>
          <ArrowUpDown size={13} />
          {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
        </button>
      </div>

      <div className="episodes-count">
        Showing {Math.min(visibleCount, sorted.length)} of {sorted.length} episodes
      </div>

      {loading && <div className="episodes-loading">Loading episodes...</div>}

      <div className="episodes-list">
        {visible.map((ep, i) => (
          <RevealItem key={ep.slug || ep.id} delay={Math.min(i * 0.04, 0.25)}>
            <Link to={`/episodes/${ep.slug}`} className="ep-list-item">
              <div className="ep-list-left">
                <div className="ep-list-num-badge">
                  {ep.season ? `S${ep.season} E${ep.number}` : ep.number || '—'}
                </div>
              </div>
              <div className="ep-list-info">
                <h3>{ep.title}</h3>
                <p>{ep.description}</p>
              </div>
              <div className="ep-list-meta">
                <span className="ep-list-dur">{ep.duration}</span>
                <span className="ep-list-date">{new Date(ep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="ep-list-play"><Play size={14} fill="currentColor" /></div>
            </Link>
          </RevealItem>
        ))}
      </div>

      {visible.length < sorted.length && (
        <div className="load-more-wrap">
          <button className="load-more" onClick={() => setVisibleCount(v => v + PER_PAGE)}>
            Load more episodes
          </button>
          <span className="load-more-count">{sorted.length - visible.length} remaining</span>
        </div>
      )}

      {!loading && sorted.length === 0 && (
        <div className="no-results">
          <p>No episodes found{search ? ` for "${search}"` : ''}</p>
          <button className="reset-btn" onClick={() => setSearch('')}>Clear search</button>
        </div>
      )}
    </main>
  );
}
