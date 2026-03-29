import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Send, ChevronRight } from 'lucide-react';
import { episodes, dilemmas, siteConfig } from '../data/placeholder';
import './Home.css';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedOption, setSelectedOption] = useState(null);
  const latestEpisodes = episodes.slice(0, 4);
  const activeDilemma = dilemmas.find(d => d.active);
  const totalVotes = activeDilemma?.options.reduce((a, o) => a + o.votes, 0) || 0;

  const formatNumber = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="hero" id="home">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            <span>With Dami Aros & Isaac</span>
          </div>
          <h1 className="hero-title">
            {siteConfig.heroTitle}<br />
            <em><span className="accent">{siteConfig.heroTitleAccent}</span></em>
          </h1>
          <p className="hero-desc">{siteConfig.heroDescription}</p>
          <div className="hero-actions">
            <Link to={`/episodes/${episodes[0].slug}`} className="btn-listen">
              <Play size={16} fill="currentColor" /> Latest Episode
            </Link>
            <Link to="/episodes" className="btn-episodes">
              Browse All Episodes
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">{formatNumber(siteConfig.stats.totalPlays)}<span>+</span></div>
              <div className="stat-label">Total Plays</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{episodes.length}<span>+</span></div>
              <div className="stat-label">Episodes</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{siteConfig.stats.countries}</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">#1</div>
              <div className="stat-label">On Spotify NG</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-image-container">
            <div className="hero-image-placeholder">
              <span>HOST PHOTO</span>
            </div>
            <div className="hero-image-overlay" />
          </div>
          <div className="hero-decorator top-accent" />
          <div className="hero-decorator corner-lines" />
          <div className="hero-decorator floating-text">EST. 2020</div>
          <div className="platform-badges">
            <div className="platform-badge">Spotify</div>
            <div className="platform-badge">Apple</div>
            <div className="platform-badge">YouTube</div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...Array(2)].map((_, rep) => (
            ['Pop Culture', 'Relationships', 'Japa Stories', 'Social Media', 'Hot Takes', 'Nigerian Life', 'As Seen In ThisDay', 'Featured On Pulse'].map((item, i) => (
              <div className="marquee-item" key={`${rep}-${i}`}>
                <span>{item}</span>
                <div className="marquee-dot" />
              </div>
            ))
          ))}
        </div>
      </div>

      {/* ═══ FEATURED EPISODE ═══ */}
      <div className="featured-strip">
        <div className="featured-inner">
          <div className="featured-label">
            <div className="featured-dot" />
            <span>Now Playing</span>
          </div>
          <div className="featured-info">
            <span className="featured-ep-num">EP {episodes[0].number}</span>
            <span className="featured-ep-title">{episodes[0].title} — {episodes[0].description}</span>
          </div>
          <Link to={`/episodes/${episodes[0].slug}`} className="featured-play">
            <Play size={12} fill="currentColor" /> Play
          </Link>
        </div>
      </div>

      {/* ═══ EPISODES TEASER ═══ */}
      <section className="episodes-section">
        <div className="section-header">
          <div>
            <div className="eyebrow"><div className="eyebrow-line" /><span>Latest Episodes</span></div>
            <h2 className="section-title">Catch up</h2>
            <p className="section-sub">New episodes every week. Here's the freshest.</p>
          </div>
          <Link to="/episodes" className="view-all-btn">View all {episodes.length} episodes <ArrowRight size={14} /></Link>
        </div>
        <div className="episodes-row">
          {latestEpisodes.map(ep => (
            <Link to={`/episodes/${ep.slug}`} className="ep-card" key={ep.id}>
              <div className="ep-thumb" style={{ background: `linear-gradient(135deg, ${['#1F6B3A,#3FAE5A', '#5E6F73,#2E2A28', '#BFA27A,#1F6B3A', '#2E2A28,#5E6F73'][ep.id % 4]})` }}>
                <span className="ep-num">EP {ep.number}</span>
                <div className="ep-play-icon"><Play size={14} fill="white" /></div>
                <span className="ep-dur">{ep.duration}</span>
              </div>
              <div className="ep-body">
                <h4>{ep.title}</h4>
                <p>{ep.description}</p>
                <div className="ep-tags">
                  {ep.tags.map(t => <span key={t} className="ep-tag">{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="about-section" id="about">
        <div className="about-left">
          <div className="eyebrow"><div className="eyebrow-line" /><span>About the Show</span></div>
          <h2 className="section-title">Stories that hit different.</h2>
          <p className="about-text">{siteConfig.aboutText}</p>
        </div>
        <div className="about-right">
          {siteConfig.hosts.map(host => (
            <div className="host-card" key={host.name}>
              <div className="host-photo-placeholder">{host.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="host-info">
                <h3>{host.name}</h3>
                <span className="host-role">{host.role}</span>
                <p>{host.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DILEMMA PREVIEW ═══ */}
      {activeDilemma && (
        <section className="dilemma-section">
          <div className="dilemma-header">
            <div className="eyebrow"><div className="eyebrow-line" /><span>The Dilemma</span></div>
            <h2 className="section-title">What would you do?</h2>
            <p className="section-sub">Every week, we put you on the spot. No right answers — just vibes.</p>
          </div>
          <div className="dilemma-card">
            <div className="dilemma-question">{activeDilemma.scenario}</div>
            <div className="dilemma-options">
              {activeDilemma.options.map(opt => (
                <div
                  key={opt.label}
                  className={`dilemma-opt ${selectedOption === opt.label ? 'selected' : ''}`}
                  onClick={() => setSelectedOption(opt.label)}
                >
                  <div className="opt-letter">{opt.label}</div>
                  <span>{opt.text}</span>
                  {selectedOption && (
                    <div className="opt-bar-wrap">
                      <div className="opt-bar" style={{ width: `${Math.round((opt.votes / totalVotes) * 100)}%` }} />
                      <span className="opt-pct">{Math.round((opt.votes / totalVotes) * 100)}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="dilemma-footer">
              {selectedOption ? (
                <span className="dilemma-total">{totalVotes.toLocaleString()} votes</span>
              ) : (
                <span className="dilemma-hint">Pick an option to see results</span>
              )}
              <Link to="/dilemma" className="dilemma-link">See all dilemmas <ChevronRight size={14} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CONTACT ═══ */}
      <section className="contact-section" id="contact">
        <div className="contact-left">
          <div className="eyebrow"><div className="eyebrow-line" /><span>Get In Touch</span></div>
          <h2 className="section-title">Say something.</h2>
          <p className="section-sub">Got a dilemma? Want to be on the show? Just want to yarn? Drop a message.</p>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="What should we call you?" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Spill it..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>
            <button type="submit" className="form-submit"><Send size={14} /> Send Message</button>
          </form>
        </div>
        <div className="contact-right">
          <h3>Follow the conversation</h3>
          <p>We're most active on social media. Follow us for behind-the-scenes content, polls, and community banter.</p>
          <div className="contact-socials">
            <a href="#">Instagram</a>
            <a href="#">Twitter / X</a>
            <a href="#">YouTube</a>
            <a href="#">TikTok</a>
          </div>
          <div className="contact-email">
            <h3>Or email us</h3>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
