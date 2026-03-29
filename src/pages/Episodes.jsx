import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Play } from 'lucide-react';
import { episodes, allTags } from '../data/placeholder';
import './Episodes.css';

const PER_PAGE = 12;

export default function Episodes() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

  const filtered = episodes.filter(ep => {
    const matchSearch = ep.title.toLowerCase().includes(search.toLowerCase()) ||
      ep.description.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All' || ep.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  const visible = filtered.slice(0, visibleCount);

  const handleTagChange = (tag) => {
    setActiveTag(tag);
    setVisibleCount(PER_PAGE);
  };

  return (
    <main className="episodes-page">
      <div className="episodes-page-header">
        <div className="eyebrow"><div className="eyebrow-line" /><span>All Episodes</span></div>
        <h1 className="page-title">The archive</h1>
        <p className="page-sub">{episodes.length} episodes. Every conversation, every hot take.</p>
      </div>

      <div className="episodes-controls">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search episodes..." value={search} onChange={e => { setSearch(e.target.value); setVisibleCount(PER_PAGE); }} />
        </div>
        <div className="tag-filters">
          {allTags.map(tag => (
            <button key={tag} className={`filter-btn ${activeTag === tag ? 'active' : ''}`} onClick={() => handleTagChange(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="episodes-count">
        Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} episodes
      </div>

      <div className="episodes-list">
        {visible.map(ep => (
          <Link to={`/episodes/${ep.slug}`} className="ep-list-item" key={ep.id}>
            <div className="ep-list-num">{ep.number}</div>
            <div className="ep-list-info">
              <h3>{ep.title}</h3>
              <p>{ep.description}</p>
            </div>
            <div className="ep-list-tags">
              {ep.tags.map(t => <span key={t} className="ep-tag">{t}</span>)}
            </div>
            <div className="ep-list-meta">
              <span className="ep-list-dur">{ep.duration}</span>
              <span className="ep-list-date">{new Date(ep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="ep-list-play"><Play size={14} fill="currentColor" /></div>
          </Link>
        ))}
      </div>

      {visible.length < filtered.length && (
        <div className="load-more-wrap">
          <button className="load-more" onClick={() => setVisibleCount(v => v + PER_PAGE)}>
            Load more episodes
          </button>
          <span className="load-more-count">{filtered.length - visible.length} remaining</span>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="no-results">
          <p>No episodes found{search ? ` for "${search}"` : ''}{activeTag !== 'All' ? ` in ${activeTag}` : ''}</p>
          <button className="reset-btn" onClick={() => { setSearch(''); setActiveTag('All'); }}>Clear filters</button>
        </div>
      )}
    </main>
  );
}
