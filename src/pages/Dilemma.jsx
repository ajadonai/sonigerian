import { useState } from 'react';
import { dilemmas } from '../data/placeholder';
import SEO from '../components/SEO';
import Toast from '../components/Toast';
import { useReveal } from '../lib/useReveal';
import './Dilemma.css';

function RevealItem({ children, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function Dilemma() {
  const [votes, setVotes] = useState({});
  const [headerRef, headerVisible] = useReveal();
  const [dilemmaForm, setDilemmaForm] = useState({ name: '', gist: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const activeDilemma = dilemmas.find(d => d.active);
  const pastDilemmas = dilemmas.filter(d => !d.active);

  const handleVote = (dilemmaId, label) => {
    setVotes(prev => ({ ...prev, [dilemmaId]: label }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/submit-dilemma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: dilemmaForm.name, gist: dilemmaForm.gist }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setDilemmaForm({ name: '', gist: '' });
      setToast({ visible: true, message: 'Submitted! We might just use yours next week 🔥', type: 'success' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setToast({ visible: true, message: 'Something went wrong. Try the Google Form below.', type: 'error' });
    }
    setSending(false);
  };

  const renderDilemma = (d, isActive) => {
    const selected = votes[d.id];
    const total = d.options.reduce((a, o) => a + o.votes, 0);
    return (
      <div className={`dilemma-card-full ${isActive ? 'active-card' : 'past-card'}`} key={d.id}>
        {isActive && <div className="active-badge"><div className="active-dot" /><span>Active</span></div>}
        <div className="dilemma-q">{d.scenario}</div>
        <div className="dilemma-opts">
          {d.options.map(opt => (
            <div key={opt.label} className={`dopt ${selected === opt.label ? 'chosen' : ''}`} onClick={() => handleVote(d.id, opt.label)}>
              <div className="dopt-letter">{opt.label}</div>
              <div className="dopt-content">
                <span>{opt.text}</span>
                {selected && <div className="dopt-result"><div className="dopt-bar" style={{ width: `${Math.round((opt.votes / total) * 100)}%` }} /><span>{Math.round((opt.votes / total) * 100)}%</span></div>}
              </div>
            </div>
          ))}
        </div>
        {selected && <div className="vote-count">{total.toLocaleString()} votes</div>}
        {!isActive && <div className="past-date">{new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>}
      </div>
    );
  };

  return (
    <main className="dilemma-page">
      <SEO title="The Dilemma" description="What would you do? Vote on weekly dilemma scenarios." path="/dilemma" />

      <div className={`dilemma-page-header reveal ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
        <div className="eyebrow"><div className="eyebrow-line" /><span>The Dilemma</span></div>
        <h1 className="page-title">What would you do?</h1>
        <p className="page-sub">We put you on the spot every week. No right answers. Pick your side.</p>
      </div>

      {activeDilemma && (
        <RevealItem delay={0.1}>
          {renderDilemma(activeDilemma, true)}
        </RevealItem>
      )}

      {pastDilemmas.length > 0 && (
        <div className="past-section">
          <RevealItem delay={0}>
            <h2 className="past-heading">Past dilemmas</h2>
          </RevealItem>
          {pastDilemmas.map((d, i) => (
            <RevealItem key={d.id} delay={Math.min((i + 1) * 0.1, 0.3)}>
              {renderDilemma(d, false)}
            </RevealItem>
          ))}
        </div>
      )}

      <RevealItem delay={0.1}>
        <div className="submit-dilemma">
          <h2>Got a dilemma?</h2>
          <p>Big problem, small problem, or problem wey you create by yourself 😭... we accept all! Fill the form sharp sharp 📝🔥</p>
          <form className="dilemma-form" onSubmit={handleSubmit}>
            <div className="df-field">
              <label>Name <span className="df-hint">(preferably a nickname or fake name)</span></label>
              <input
                placeholder="Your answer"
                value={dilemmaForm.name}
                onChange={e => setDilemmaForm({...dilemmaForm, name: e.target.value})}
                required
              />
            </div>
            <div className="df-field">
              <label>Your gist <span className="df-hint">(tell us your story, dilemma, confession or hot take)</span></label>
              <textarea
                placeholder="Your answer"
                value={dilemmaForm.gist}
                onChange={e => setDilemmaForm({...dilemmaForm, gist: e.target.value})}
                rows={4}
                required
              />
            </div>
            {submitted ? (
              <div className="df-success">Submitted! We might just use yours next week.</div>
            ) : (
              <button type="submit" className="submit-dilemma-btn" disabled={sending}>
                {sending ? 'Sending...' : 'Submit'}
              </button>
            )}
          </form>
          <a href="https://forms.gle/LKG8XM4v2yrax5dj9" target="_blank" rel="noopener noreferrer" className="df-fallback">Having issues? Submit via Google Form</a>
        </div>
      </RevealItem>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </main>
  );
}
