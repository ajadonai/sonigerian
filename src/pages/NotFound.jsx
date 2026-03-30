import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="nf-content">
        <div className="nf-image">
          <img src="/hosts.png" alt="Dami and Isaac" />
        </div>
        <span className="nf-code">404</span>
        <h1>Page not found</h1>
        <p>This page doesn't exist — like steady electricity in Lagos.</p>
        <div className="nf-actions">
          <Link to="/" className="nf-home">Go home</Link>
          <Link to="/episodes" className="nf-episodes">Browse episodes</Link>
        </div>
      </div>
    </main>
  );
}
