import { useState } from 'react';
import { dilemmas } from '../data/placeholder';
import './Dilemma.css';

export default function Dilemma() {
  const [votes, setVotes] = useState({});
  const activeDilemma = dilemmas.find(d => d.active);
  const pastDilemmas = dilemmas.filter(d => !d.active);

  const handleVote = (dilemmaId, label) => {
    setVotes(prev => ({ ...prev, [dilemmaId]: label }));
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
      <div className="dilemma-page-header">
        <div className="eyebrow"><div className="eyebrow-line" /><span>The Dilemma</span></div>
        <h1 className="page-title">What would you do?</h1>
        <p className="page-sub">We put you on the spot every week. No right answers. Pick your side.</p>
      </div>

      {activeDilemma && renderDilemma(activeDilemma, true)}

      {pastDilemmas.length > 0 && (
        <div className="past-section">
          <h2 className="past-heading">Past dilemmas</h2>
          {pastDilemmas.map(d => renderDilemma(d, false))}
        </div>
      )}
    </main>
  );
}
