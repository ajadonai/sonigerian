import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Episodes from './pages/Episodes';
import EpisodeDetail from './pages/EpisodeDetail';
import Dilemma from './pages/Dilemma';
import Listen from './pages/Listen';
import NotFound from './pages/NotFound';
import Admin from './admin/Admin';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/episodes" element={<PublicLayout><Episodes /></PublicLayout>} />
        <Route path="/episodes/:slug" element={<PublicLayout><EpisodeDetail /></PublicLayout>} />
        <Route path="/dilemma" element={<PublicLayout><Dilemma /></PublicLayout>} />
        <Route path="/listen" element={<PublicLayout><Listen /></PublicLayout>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
