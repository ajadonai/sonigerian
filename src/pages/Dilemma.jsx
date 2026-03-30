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
  const pastDilemmas = dilemmas.filter(d => !d.active).slice(0, 4);

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

  return (
    <main className="dilemma-page">
      <SEO title="The Dilemma" description="What would you do? Vote on weekly dilemma scenarios." path="/dilemma" />

      <div className="dilemma-decor">
        <div className="decor-circle decor-1" />
        <div className="decor-circle decor-2" />
        <div className="decor-line decor-3" />
      </div>

      <div className={`dilemma-page-header reveal ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
        <div className="eyebrow"><div className="eyebrow-line" /><span>The Dilemma</span></div>
        <h1 className="page-title">What would you do?</h1>
        <p className="page-sub">We put you on the spot every week. No right answers. Pick your side.</p>
      </div>

      {/* ACTIVE DILEMMA */}
      {activeDilemma && (
        <RevealItem delay={0.1}>
          <div className="active-dilemma-card">
            <div className="active-badge"><div className="active-dot" /><span>Active</span></div>
            <div className="dilemma-q">{activeDilemma.scenario}</div>
            <div className="dilemma-opts">
              {activeDilemma.options.map(opt => {
                const selected = votes[activeDilemma.id];
                const total = activeDilemma.options.reduce((a, o) => a + o.votes, 0);
                const pct = Math.round((opt.votes / total) * 100);
                return (
                  <div key={opt.label} className={`dopt ${selected === opt.label ? 'chosen' : ''}`} onClick={() => handleVote(activeDilemma.id, opt.label)}>
                    <div className="dopt-letter">{opt.label}</div>
                    <span className="dopt-text">{opt.text}</span>
                    {selected && <div className="dopt-pct">{pct}%</div>}
                  </div>
                );
              })}
            </div>
            {votes[activeDilemma.id] && (
              <div className="vote-count">{activeDilemma.options.reduce((a, o) => a + o.votes, 0).toLocaleString()} votes</div>
            )}
          </div>
        </RevealItem>
      )}

      {/* PAST DILEMMAS */}
      {pastDilemmas.length > 0 && (
        <div className="past-section">
          <RevealItem delay={0}>
            <div className="past-eyebrow">
              <div className="past-line" />
              <span>Past dilemmas</span>
            </div>
          </RevealItem>
          <div className="past-grid">
            {pastDilemmas.map((d, i) => {
              const total = d.options.reduce((a, o) => a + o.votes, 0);
              return (
                <RevealItem key={d.id} delay={0.05 + i * 0.06}>
                  <div className="past-card">
                    <p className="past-scenario">{d.scenario}</p>
                    <div className="past-bars">
                      {d.options.map(opt => {
                        const pct = Math.round((opt.votes / total) * 100);
                        return (
                          <div className="past-bar-row" key={opt.label}>
                            <span className="past-bar-label">{opt.label}</span>
                            <div className="past-bar-track">
                              <div className="past-bar-fill" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="past-bar-pct">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="past-votes">{total.toLocaleString()} votes</div>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBMIT FORM */}
      <RevealItem delay={0.1}>
        <div className="submit-dilemma">
          <div className="sd-image">
            <img loading="lazy" src="/hosts-highfive.jpg" alt="Dami and Isaac" />
          </div>
          <div className="sd-content">
            <h2>Got a dilemma?</h2>
            <p>Big problem, small problem, or problem wey you create by yourself 😭... we accept all! Fill the form sharp sharp 📝🔥</p>
            <form className="dilemma-form" onSubmit={handleSubmit}>
              <div className="df-field">
                <label>Name <span className="df-hint">(preferably a nickname or fake name)</span></label>
                <input placeholder="Your answer" value={dilemmaForm.name} onChange={e => setDilemmaForm({...dilemmaForm, name: e.target.value})} required />
              </div>
              <div className="df-field">
                <label>Your gist <span className="df-hint">(tell us your story, dilemma, confession or hot take)</span></label>
                <textarea placeholder="Your answer" value={dilemmaForm.gist} onChange={e => setDilemmaForm({...dilemmaForm, gist: e.target.value})} rows={4} required />
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
        </div>
      </RevealItem>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={() => setToast({ ...toast, visible: false })} />
    </main>
  );
}
