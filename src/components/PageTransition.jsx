import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [phase, setPhase] = useState('visible');
  const [content, setContent] = useState(children);
  const timeoutRef = useRef(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      setContent(children);
      return;
    }

    setPhase('exit');

    timeoutRef.current = setTimeout(() => {
      setContent(children);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPhase('enter');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('visible');
        });
      });
    }, 350);

    return () => clearTimeout(timeoutRef.current);
  }, [location.pathname]);

  useEffect(() => {
    setContent(children);
  }, [children]);

  return (
    <div className={`page-transition ${phase}`}>
      {content}
    </div>
  );
}
