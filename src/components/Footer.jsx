import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <Link to="/" className="footer-logo">So<span>Nigerian</span></Link>
          <p className="footer-tagline">Real conversations. No filter.</p>
        </div>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/episodes">Episodes</Link></li>
          <li><Link to="/dilemma">Dilemma</Link></li>
        </ul>
        <div className="footer-socials">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Twitter">TW</a>
          <a href="#" aria-label="YouTube">YT</a>
          <a href="#" aria-label="TikTok">TT</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} So Nigerian. All rights reserved.</span>
        <span>Managed by Eggcorn Digital</span>
      </div>
    </footer>
  );
}
