import { useState } from 'react';
import { LayoutDashboard, Radio, Layers, Mail, Settings, LogOut, Plus, Edit, Trash2, RotateCcw, Archive, X } from 'lucide-react';
import { episodes, dilemmas, siteConfig, allTags } from '../data/placeholder';
import './Admin.css';

const ADMIN_USERS = [
  { email: 'oluwadamilarearogundade@gmail.com', password: 'soNigerian', name: 'Dami Aros', role: 'master' },
  { email: 'Deeaigbadumah@gmail.com', password: 'soNigerian', name: 'Isaac Aigbadumah', role: 'admin' },
];

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Episode form state
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [availableTags, setAvailableTags] = useState(allTags.filter(t => t !== 'All'));
  const [episodeView, setEpisodeView] = useState('manage');

  // Dilemma form state
  const [dilemmaScenario, setDilemmaScenario] = useState('');
  const [dilemmaOptions, setDilemmaOptions] = useState(['', '']);
  const [showDilemmaForm, setShowDilemmaForm] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const addCustomTag = () => {
    const tag = customTag.trim();
    if (tag && !availableTags.includes(tag)) {
      setAvailableTags(prev => [...prev, tag]);
      setSelectedTags(prev => [...prev, tag]);
    } else if (tag && !selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
    setCustomTag('');
  };

  const addDilemmaOption = () => {
    if (dilemmaOptions.length < 6) setDilemmaOptions([...dilemmaOptions, '']);
  };

  const removeDilemmaOption = (index) => {
    if (dilemmaOptions.length > 2) setDilemmaOptions(dilemmaOptions.filter((_, i) => i !== index));
  };

  const updateDilemmaOption = (index, value) => {
    const updated = [...dilemmaOptions];
    updated[index] = value;
    setDilemmaOptions(updated);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const found = ADMIN_USERS.find(u => u.email.toLowerCase() === loginForm.email.toLowerCase() && u.password === loginForm.password);
    if (found) { setUser(found); setLoginError(''); }
    else setLoginError('Invalid credentials');
  };

  if (!user) {
    return (
      <main className="admin-login-page">
        <div className="login-card">
          <div className="login-logo">So<span>Nigerian</span></div>
          <p className="login-sub">Admin Panel</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field">
              <label>Email</label>
              <input type="email" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} placeholder="your@email.com" />
            </div>
            <div className="login-field">
              <label>Password</label>
              <input type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} placeholder="Enter password" />
            </div>
            {loginError && <div className="login-error">{loginError}</div>}
            <button type="submit" className="login-btn">Sign In</button>
          </form>
        </div>
      </main>
    );
  }

  const isMaster = user.role === 'master';
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'episodes', label: 'Episodes', icon: Radio },
    { id: 'dilemma', label: 'Dilemma', icon: Layers },
    { id: 'messages', label: 'Messages', icon: Mail },
    ...(isMaster ? [{ id: 'settings', label: 'Settings', icon: Settings }] : []),
  ];

  const activeDilemma = dilemmas.find(d => d.active);
  const totalVotes = activeDilemma?.options.reduce((a, o) => a + o.votes, 0) || 0;
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sb-logo">So<span>Nigerian</span><small>Admin</small></div>
        <nav className="admin-sb-nav">
          {tabs.map(t => (
            <button key={t.id} className={`sb-nav-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </nav>
        <div className="admin-sb-user">
          <div className="sb-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
          <div className="sb-user-info">
            <div className="sb-name">{user.name}</div>
            <div className="sb-role">{isMaster ? 'Master' : 'Admin'}</div>
          </div>
          <button className="sb-logout" onClick={() => setUser(null)}><LogOut size={14} /></button>
        </div>
      </aside>

      <div className="admin-main">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="admin-content">
            <div className="admin-header">
              <h1>Welcome back, {user.name.split(' ')[0]}</h1>
              <span className="admin-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="stats-grid">
              <div className="stat-card"><div className="sc-label">Episodes</div><div className="sc-val">{episodes.length}</div></div>
              <div className="stat-card"><div className="sc-label">Active dilemma votes</div><div className="sc-val">{totalVotes.toLocaleString()}</div></div>
              <div className="stat-card"><div className="sc-label">Submissions</div><div className="sc-val">23</div></div>
            </div>
            <div className="admin-section-header">
              <h2>Recent episodes</h2>
              <button className="admin-add-btn" onClick={() => setActiveTab('episodes')}><Plus size={14} /> Add episode</button>
            </div>
            <table className="admin-table">
              <thead><tr><th>#</th><th>Title</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {episodes.slice(0, 5).map(ep => (
                  <tr key={ep.id}>
                    <td>{ep.number}</td>
                    <td className="td-title">{ep.title}</td>
                    <td><span className={`status-badge ${ep.status}`}>{ep.status}</span></td>
                    <td>{new Date(ep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    <td><button className="tbl-btn"><Edit size={12} /></button><button className="tbl-btn del"><Trash2 size={12} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* EPISODES */}
        {activeTab === 'episodes' && (
          <div className="admin-content">
            <div className="admin-header">
              <h1>{episodeView === 'manage' ? 'All episodes' : 'Add episode'}</h1>
              <button className="admin-add-btn" onClick={() => setEpisodeView(episodeView === 'manage' ? 'add' : 'manage')}>
                {episodeView === 'manage' ? <><Plus size={14} /> Add new</> : <><X size={14} /> Back to list</>}
              </button>
            </div>

            {episodeView === 'manage' && (
              <>
                <div className="ep-count">{episodes.length} episodes total</div>
                <table className="admin-table">
                  <thead><tr><th>#</th><th>Title</th><th>Tags</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {episodes.map(ep => (
                      <tr key={ep.id}>
                        <td>{ep.number}</td>
                        <td className="td-title">{ep.title}</td>
                        <td className="td-tags">{ep.tags.map(t => <span key={t} className="mini-tag">{t}</span>)}</td>
                        <td><span className={`status-badge ${ep.status}`}>{ep.status}</span></td>
                        <td>{new Date(ep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                        <td>
                          <button className="tbl-btn"><Edit size={12} /></button>
                          <button className="tbl-btn del"><Trash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {episodeView === 'add' && (
              <div className="admin-form">
              <div className="form-row">
                <div className="form-field"><label>Episode title</label><input placeholder="e.g. Owambe Pressure" /></div>
                <div className="form-field"><label>Episode number</label><input type="number" placeholder={episodes.length + 1} /></div>
              </div>
              <div className="form-field full"><label>Description / Show notes</label><textarea placeholder="Write the episode description..." rows={4} /></div>
              <div className="form-row">
                <div className="form-field"><label>Duration</label><input placeholder="42:15" /></div>
                <div className="form-field">
                  <label>Status</label>
                  <select><option>Published</option><option>Draft</option></select>
                </div>
              </div>
              <div className="form-field full">
                <label>Tags</label>
                <div className="tag-selector">
                  <div className="tag-options">
                    {availableTags.map(tag => (
                      <button key={tag} type="button" className={`tag-opt ${selectedTags.includes(tag) ? 'selected' : ''}`} onClick={() => toggleTag(tag)}>
                        {tag}
                        {selectedTags.includes(tag) && <X size={10} />}
                      </button>
                    ))}
                  </div>
                  <div className="tag-custom">
                    <input placeholder="Add custom tag..." value={customTag} onChange={e => setCustomTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomTag())} />
                    <button type="button" className="tag-add-btn" onClick={addCustomTag}><Plus size={12} /></button>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Spotify link</label><input placeholder="https://open.spotify.com/..." /></div>
                <div className="form-field"><label>Apple Podcasts link</label><input placeholder="https://podcasts.apple.com/..." /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>YouTube link</label><input placeholder="https://youtube.com/..." /></div>
                <div className="form-field"><label>Thumbnail</label><input type="file" /></div>
              </div>
              <button className="admin-save-btn"><Plus size={14} /> Save episode</button>
            </div>
            )}
          </div>
        )}

        {/* DILEMMA */}
        {activeTab === 'dilemma' && (
          <div className="admin-content">
            <div className="admin-header">
              <h1>Dilemma</h1>
              <button className="admin-add-btn" onClick={() => setShowDilemmaForm(!showDilemmaForm)}>
                {showDilemmaForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> New dilemma</>}
              </button>
            </div>

            {showDilemmaForm && (
              <div className="dilemma-post-form">
                <div className="form-field full">
                  <label>Scenario</label>
                  <textarea placeholder="e.g. Your partner checks your phone while you're asleep..." rows={3} value={dilemmaScenario} onChange={e => setDilemmaScenario(e.target.value)} />
                </div>
                <label className="options-label">Options</label>
                <div className="dilemma-options-list">
                  {dilemmaOptions.map((opt, i) => (
                    <div className="dilemma-option-row" key={i}>
                      <span className="opt-label">{optionLabels[i]}</span>
                      <input placeholder={`Option ${optionLabels[i]}`} value={opt} onChange={e => updateDilemmaOption(i, e.target.value)} />
                      {dilemmaOptions.length > 2 && (
                        <button className="opt-remove" type="button" onClick={() => removeDilemmaOption(i)}><X size={12} /></button>
                      )}
                    </div>
                  ))}
                </div>
                {dilemmaOptions.length < 6 && (
                  <button className="add-option-btn" type="button" onClick={addDilemmaOption}>
                    <Plus size={12} /> Add option
                  </button>
                )}
                <button className="admin-save-btn" style={{ marginTop: 16 }}>Post dilemma (becomes active)</button>
              </div>
            )}

            {activeDilemma && (
              <div className="admin-dilemma-card">
                <div className="ad-badge"><div className="ad-dot" /><span>Active dilemma</span></div>
                <div className="ad-question">{activeDilemma.scenario}</div>
                <div className="ad-options">
                  {activeDilemma.options.map(opt => (
                    <div className="ad-opt" key={opt.label}>
                      <div className="ad-opt-label">{opt.label}</div>
                      <div className="ad-opt-text">{opt.text}</div>
                      <div className="ad-opt-votes">{opt.votes.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="ad-total">{totalVotes.toLocaleString()} total votes</div>
                <div className="ad-actions">
                  <button className="tbl-btn"><Edit size={12} /> Edit</button>
                  <button className="tbl-btn"><RotateCcw size={12} /> Reset votes</button>
                  <button className="tbl-btn"><Archive size={12} /> Archive</button>
                </div>
              </div>
            )}

            <h2 className="past-title">History</h2>
            <table className="admin-table">
              <thead><tr><th>Scenario</th><th>Votes</th><th>Date</th></tr></thead>
              <tbody>
                {dilemmas.filter(d => !d.active).map(d => (
                  <tr key={d.id}>
                    <td className="td-title">{d.scenario.slice(0, 60)}...</td>
                    <td>{d.options.reduce((a, o) => a + o.votes, 0).toLocaleString()}</td>
                    <td>{new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MESSAGES */}
        {activeTab === 'messages' && (
          <div className="admin-content">
            <div className="admin-header"><h1>Submissions</h1><span className="msg-count">23 total</span></div>
            {[
              { name: 'Big_Tunde_01', gist: 'My best friend borrowed ₦200K and has been dodging me for 3 months. Now he posted a vacation in Dubai. What do I do?', date: 'Mar 28' },
              { name: 'Aunty_Shade', gist: 'I caught my sister\'s husband at a restaurant with another woman. Do I tell her or mind my business?', date: 'Mar 27' },
              { name: 'Lagos_Boy_99', gist: 'My girlfriend wants me to delete all female contacts from my phone. She says it\'s "boundaries" but I think it\'s control. Am I wrong?', date: 'Mar 26' },
            ].map((m, i) => (
              <div className="msg-card" key={i}>
                <div className="msg-header">
                  <strong>{m.name}</strong>
                  <span className="msg-date">{m.date}</span>
                </div>
                <p className="msg-body">{m.gist}</p>
                <div className="msg-actions">
                  <button className="tbl-btn">Use as dilemma</button>
                  <button className="tbl-btn del"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && isMaster && (
          <div className="admin-content">
            <div className="admin-header"><h1>Settings</h1></div>
            <div className="admin-form">
              <h2 className="settings-section-title">Admin users</h2>
              {ADMIN_USERS.map(u => (
                <div className="user-manage-card" key={u.email}>
                  <div className="umc-header">
                    <div className="role-avatar">{u.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="umc-info">
                      <h3>{u.name}</h3>
                      <span className={`role-tag ${u.role}`}>{u.role === 'master' ? 'Master' : 'Admin'}</span>
                    </div>
                  </div>
                  <p className="role-email">{u.email}</p>
                  <div className="form-row" style={{ marginTop: 12 }}>
                    <div className="form-field"><label>New password for {u.name.split(' ')[0]}</label><input type="password" placeholder="Enter new password" /></div>
                    <div className="form-field" style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <button className="admin-add-btn">Update password</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="admin-bottom-nav">
        {tabs.slice(0, 4).map(t => (
          <button key={t.id} className={`admin-bnav ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            <t.icon size={18} /><span>{t.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
