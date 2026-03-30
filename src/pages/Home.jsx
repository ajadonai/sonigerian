import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, ChevronRight } from 'lucide-react';
import { dilemmas, siteConfig } from '../data/placeholder';
import { useEpisodes } from '../lib/useEpisodes';
import SEO from '../components/SEO';
import { useReveal } from '../lib/useReveal';
import './Home.css';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [expandedHost, setExpandedHost] = useState(null);
  const { episodes } = useEpisodes();
  const [aboutRef, aboutVisible] = useReveal();
  const [episodesRef, episodesVisible] = useReveal();
  const [dilemmaRef, dilemmaVisible] = useReveal();
  const [contactRef, contactVisible] = useReveal();
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
      <SEO />
      <section className="hero" id="home">
        <div className="hero-grid">
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
              <Link to={episodes.length > 0 ? `/episodes/${episodes[0].slug}` : '/episodes'} className="btn-listen">
                <Play size={16} fill="currentColor" /> Latest Episode
              </Link>
              <Link to="/episodes" className="btn-episodes">
                Browse All Episodes
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">{episodes.length}<span>+</span></div>
                <div className="stat-label">Episodes</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">#1</div>
                <div className="stat-label">On Spotify NG</div>
              </div>
            </div>
            <div className="hero-platforms-mobile">
              <div className="platform-badge">Spotify</div>
              <div className="platform-badge">Apple</div>
              <div className="platform-badge">YouTube</div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image-container">
              <img className="hero-image" src="/hosts.jpg" alt="Dami Aros and Isaac — So Nigerian Podcast hosts" />
              <div className="hero-image-overlay" />
            </div>
            <div className="hero-decorator top-accent" />
            <div className="hero-decorator corner-lines" />
            <div className="hero-decorator floating-text">EST. 2020</div>
            <div className="platform-badges">
              <a href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer" className="platform-badge">YouTube</a>
              <a href={siteConfig.platformLink} target="_blank" rel="noopener noreferrer" className="platform-badge">All Platforms</a>
            </div>
          </div>
        </div>
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
      </section>

      <section className={`about-section reveal ${aboutVisible ? 'visible' : ''}`} id="about" ref={aboutRef}>
        <div className="about-left">
          <div className="eyebrow"><div className="eyebrow-line" /><span>About the Show</span></div>
          <h2 className="section-title">Stories that hit different.</h2>
          <p className="about-text">{siteConfig.aboutText}</p>
        </div>
        <div className="about-right">
          {siteConfig.hosts.map(host => (
            <div className="host-card" key={host.name}>
              <img loading="lazy" className="host-photo" src={host.image} alt={host.name} />
              <div className="host-info">
                <h3>{host.name}</h3>
                <span className="host-role">{host.role}</span>
                <p className={expandedHost === host.name ? '' : 'truncated'}>{host.bio}</p>
                <button className="host-show-more" onClick={() => setExpandedHost(expandedHost === host.name ? null : host.name)}>
                  {expandedHost === host.name ? 'Show less' : 'Show more'}
                </button>
                <div className="host-socials">
                  {host.twitter && <a href={host.twitter} target="_blank" rel="noopener noreferrer" className="host-social-link">X</a>}
                  {host.instagram && <a href={host.instagram} target="_blank" rel="noopener noreferrer" className="host-social-link">IG</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`episodes-section reveal ${episodesVisible ? 'visible' : ''}`} ref={episodesRef}>
        <div className="section-header">
          <div>
            <div className="eyebrow"><div className="eyebrow-line" /><span>Latest Episodes</span></div>
            <h2 className="section-title">Catch up</h2>
            <p className="section-sub">New episodes every week. Here's the freshest.</p>
          </div>
          <Link to="/episodes" className="view-all-btn">View all <ArrowRight size={14} /></Link>
        </div>
        <div className="episodes-row">
          {latestEpisodes.map(ep => (
            <Link to={`/episodes/${ep.slug}`} className="ep-card" key={ep.slug || ep.id}>
              <div className="ep-thumb">
                <img loading="lazy" src="/hosts.jpg" alt="So Nigerian" className="ep-thumb-img" />
                <div className="ep-thumb-overlay" />
                <span className="ep-num">{ep.season ? `S${ep.season} E${ep.number}` : `EP ${ep.number}`}</span>
                <div className="ep-play-icon"><Play size={14} fill="white" /></div>
                <span className="ep-dur">{ep.duration}</span>
              </div>
              <div className="ep-body">
                <h4>{ep.title}</h4>
                <p>{ep.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {activeDilemma && (
        <section className={`dilemma-section reveal ${dilemmaVisible ? 'visible' : ''}`} ref={dilemmaRef}>
          <div className="dilemma-header">
            <div className="eyebrow"><div className="eyebrow-line" /><span>The Dilemma</span></div>
            <h2 className="section-title">What would you do?</h2>
            <p className="section-sub">Every week, we put you on the spot. No right answers — just vibes.</p>
          </div>
          <div className="dilemma-card">
            <div className="dilemma-question">{activeDilemma.scenario}</div>
            <div className="dilemma-options">
              {activeDilemma.options.map(opt => (
                <div key={opt.label} className={`dilemma-opt ${selectedOption === opt.label ? 'selected' : ''}`} onClick={() => setSelectedOption(opt.label)}>
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
              {selectedOption ? <span className="dilemma-total">{totalVotes.toLocaleString()} votes</span> : <span className="dilemma-hint">Pick an option to see results</span>}
              <Link to="/dilemma" className="dilemma-link">See all dilemmas <ChevronRight size={14} /></Link>
            </div>
          </div>
        </section>
      )}

      <section className={`contact-section reveal ${contactVisible ? 'visible' : ''}`} id="contact" ref={contactRef}>
        <div className="contact-image-side">
          <div className="contact-image-wrap">
            <img loading="lazy" src="/hosts-contact.jpg" alt="Dami and Isaac" />
            <div className="contact-image-overlay" />
            <div className="contact-image-text">
              <span>Let's talk</span>
            </div>
          </div>
        </div>
        <div className="contact-content">
          <div className="eyebrow"><div className="eyebrow-line" /><span>Get In Touch</span></div>
          <h2 className="section-title">Say something.</h2>
          <p className="contact-desc">Want to be on the show? Got a collaboration idea? Just want to yarn? Reach out on socials or drop us an email.</p>
          <div className="contact-socials">
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer"><span className="social-label">Instagram</span><span className="social-handle">@sonigerian_</span></a>
            <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer"><span className="social-label">Twitter / X</span><span className="social-handle">@sonigerian_</span></a>
            <a href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer"><span className="social-label">YouTube</span><span className="social-handle">So Nigerian</span></a>
          </div>
          <div className="contact-email-block">
            <span className="contact-email-label">Email</span>
            <a href={`mailto:${siteConfig.contact.email}`} className="contact-email-link">{siteConfig.contact.email}</a>
          </div>
          <Link to="/listen" className="contact-listen-btn">
            All Platforms
          </Link>
        </div>
      </section>
    </main>
  );
}
