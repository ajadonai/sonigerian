import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : '';
  };

  const navLinks = [
    { to: '/', label: 'Home', hash: '' },
    { to: '/#about', label: 'About', hash: '#about' },
    { to: '/episodes', label: 'Episodes' },
    { to: '/dilemma', label: 'Dilemma' },
    { to: '/#contact', label: 'Contact', hash: '#contact' },
  ];

  const handleHashClick = (e, hash) => {
    if (hash && location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">So<span>Nigerian</span></Link>
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.label}>
              <Link
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
                onClick={(e) => link.hash && handleHashClick(e, link.hash)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className="nav-cta">
          <Play size={12} fill="currentColor" />
          Listen Now
        </button>
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
                <Link to={link.to} onClick={(e) => link.hash && handleHashClick(e, link.hash)}>
                  <span>{link.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,6 15,12 9,18" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel-bottom">
          <button className="panel-cta">Listen Now</button>
          <div className="panel-socials">
            <a href="#">IG</a><a href="#">TW</a><a href="#">YT</a><a href="#">TT</a>
          </div>
        </div>
      </div>
    </>
  );
}
