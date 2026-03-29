import { Link } from 'react-router-dom';
import { siteConfig } from '../data/placeholder';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <Link to="/" className="footer-logo">So<span>Nigerian</span> <span className="logo-podcast">Podcast</span></Link>
          <p className="footer-tagline">Real conversations. No filter.</p>
        </div>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/episodes">Episodes</Link></li>
          <li><Link to="/dilemma">Dilemma</Link></li>
          <li><Link to="/listen">Listen</Link></li>
        </ul>
        <div className="footer-socials">
          <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">IG</a>
          <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer">X</a>
          <a href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer">YT</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} So Nigerian. All rights reserved.</span>
        <span>Managed by Eggcorn Digital</span>
        <span className="footer-credit">Designed & built by <a href="https://x.com/wlxaj" target="_blank" rel="noopener noreferrer">Trip</a></span>
      </div>
    </footer>
  );
}
