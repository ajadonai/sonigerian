import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import './Navbar.css';

const FONT_SIZES = [
  { label: 'A', key: 'small', size: '14px' },
  { label: 'A', key: 'medium', size: '16px' },
  { label: 'A', key: 'large', size: '18px' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('sn-fontsize') || 'medium');
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setFontMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const match = FONT_SIZES.find(f => f.key === fontSize);
    if (match) {
      document.documentElement.style.setProperty('--body-font-size', match.size);
      localStorage.setItem('sn-fontsize', fontSize);
    }
  }, [fontSize]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setFontMenuOpen(false);
    document.body.style.overflow = !menuOpen ? 'hidden' : '';
  };

  const navLinks = [
    { label: 'Home', path: '/', hash: '#home' },
    { label: 'About', path: '/', hash: '#about' },
    { label: 'Episodes', path: '/episodes' },
    { label: 'Dilemma', path: '/dilemma' },
    { label: 'Contact', path: '/', hash: '#contact' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (link.hash) {
      if (location.pathname === '/') {
        const el = document.querySelector(link.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (link.hash === '#home') window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/' + link.hash);
      }
    } else {
      navigate(link.path);
    }
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const FontToggle = ({ className }) => (
    <div className={`font-toggle ${className || ''}`}>
      <button className="font-trigger" onClick={() => setFontMenuOpen(!fontMenuOpen)} aria-label="Font size">
        <span className="font-icon">Aa</span>
      </button>
      {fontMenuOpen && (
        <div className="font-dropdown">
          {FONT_SIZES.map(f => (
            <button
              key={f.key}
              className={`font-option ${fontSize === f.key ? 'active' : ''}`}
              onClick={() => { setFontSize(f.key); setFontMenuOpen(false); }}
            >
              <span className={`font-preview font-${f.key}`}>{f.label}</span>
              <span className="font-label">{f.key}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" className="nav-logo" onClick={(e) => { e.preventDefault(); if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); else navigate('/'); }}>
          So<span>Nigerian</span>
        </a>
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.hash ? '/' + link.hash : link.path}
                className={
                  link.path === '/episodes' && location.pathname.startsWith('/episodes') ? 'active' :
                  link.path === '/dilemma' && location.pathname === '/dilemma' ? 'active' :
                  link.path === '/' && !link.hash && location.pathname === '/' ? 'active' : ''
                }
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <FontToggle className="desktop-only" />
          <button className="nav-cta">
            <Play size={12} fill="currentColor" />
            Listen Now
          </button>
        </div>
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`overlay ${menuOpen ? 'vis' : ''}`} onClick={toggleMenu} />
      <div className={`slide-panel ${menuOpen ? 'open' : ''}`}>
        <div className="green-strip" />
        <div className="panel-accent">Menu</div>
        <div className="panel-top">
          <ul className="panel-nav">
            {navLinks.map((link, i) => (
              <li key={link.label} style={{ '--delay': `${0.1 + i * 0.05}s` }}>
                <a href={link.hash ? '/' + link.hash : link.path} onClick={(e) => handleNavClick(e, link)}>
                  <span>{link.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,6 15,12 9,18" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel-bottom">
          <div className="panel-font-section">
            <span className="panel-font-label">Text size</span>
            <div className="panel-font-buttons">
              {FONT_SIZES.map(f => (
                <button
                  key={f.key}
                  className={`panel-font-btn ${fontSize === f.key ? 'active' : ''}`}
                  onClick={() => setFontSize(f.key)}
                >
                  <span className={`font-preview font-${f.key}`}>A</span>
                </button>
              ))}
            </div>
          </div>
          <button className="panel-cta">Listen Now</button>
          <div className="panel-socials">
            <a href="#">IG</a><a href="#">TW</a><a href="#">YT</a><a href="#">TT</a>
          </div>
        </div>
      </div>
    </>
  );
}
