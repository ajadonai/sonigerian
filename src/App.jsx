import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Episodes from './pages/Episodes';
import EpisodeDetail from './pages/EpisodeDetail';
import Dilemma from './pages/Dilemma';
import Admin from './admin/Admin';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/episodes" element={<PublicLayout><Episodes /></PublicLayout>} />
        <Route path="/episodes/:slug" element={<PublicLayout><EpisodeDetail /></PublicLayout>} />
        <Route path="/dilemma" element={<PublicLayout><Dilemma /></PublicLayout>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
