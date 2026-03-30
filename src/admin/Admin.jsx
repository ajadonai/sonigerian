import { useState } from 'react';
import { LayoutDashboard, Layers, Mail, Settings, LogOut, Plus, Trash2, RotateCcw, Archive, X, RefreshCw, Edit } from 'lucide-react';
import { dilemmas, siteConfig } from '../data/placeholder';
import './Admin.css';

const ADMIN_USERS = [
  { email: 'oluwadamilarearogundade@gmail.com', password: 'soNigerian', name: 'Dami Aros', role: 'master' },
  { email: 'deeaigbadumah@gmail.com', password: 'soNigerian', name: 'Isaac Aigbadumah', role: 'admin' },
];

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dilemma form state
  const [dilemmaScenario, setDilemmaScenario] = useState('');
  const [dilemmaOptions, setDilemmaOptions] = useState(['', '']);
  const [showDilemmaForm, setShowDilemmaForm] = useState(false);

  // Sync state
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [episodeCount, setEpisodeCount] = useState(null);

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

  const handleSync = async () => {
    setSyncing(true);
    try {
      sessionStorage.removeItem('sn-episodes');
      const res = await fetch('/api/episodes');
      const data = await res.json();
      if (data.episodes) {
        setEpisodeCount(data.total);
        sessionStorage.setItem('sn-episodes', JSON.stringify({ data: data.episodes, timestamp: Date.now() }));
      }
      setLastSync(new Date().toLocaleTimeString());
    } catch (e) {}
    setSyncing(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const found = ADMIN_USERS.find(u => u.email.toLowerCase() === loginForm.email.toLowerCase() && u.password === loginForm.password);
    if (found) { setUser(found); setLoginError(''); handleSync(); }
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

            <div className="sync-card">
              <div className="sync-info">
                <h3>RSS Feed Sync</h3>
                <p>Episodes auto-sync from Acast every 10 minutes. Use this button to force an immediate refresh.</p>
                {episodeCount && <span className="sync-count">{episodeCount} episodes synced</span>}
                {lastSync && <span className="sync-time">Last synced: {lastSync}</span>}
              </div>
              <button className={`sync-btn ${syncing ? 'syncing' : ''}`} onClick={handleSync} disabled={syncing}>
                <RefreshCw size={16} className={syncing ? 'spin' : ''} />
                {syncing ? 'Syncing...' : 'Sync now'}
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card"><div className="sc-label">Episodes</div><div className="sc-val">{episodeCount || '—'}</div></div>
              <div className="stat-card"><div className="sc-label">Active dilemma votes</div><div className="sc-val">{totalVotes.toLocaleString()}</div></div>
              <div className="stat-card"><div className="sc-label">Submissions</div><div className="sc-val">23</div></div>
            </div>

            <div className="quick-actions">
              <button className="qa-btn" onClick={() => { setActiveTab('dilemma'); setShowDilemmaForm(true); }}><Plus size={16} /> Post dilemma</button>
              <button className="qa-btn" onClick={() => setActiveTab('messages')}><Mail size={16} /> View submissions</button>
            </div>
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
                  <button className="tbl-btn" onClick={() => { setActiveTab('dilemma'); setShowDilemmaForm(true); setDilemmaScenario(m.gist); }}>Use as dilemma</button>
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

              <h2 className="settings-section-title">Social media links</h2>
              <div className="form-row">
                <div className="form-field"><label>Instagram</label><input defaultValue={siteConfig.socials.instagram} /></div>
                <div className="form-field"><label>Twitter / X</label><input defaultValue={siteConfig.socials.twitter} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>YouTube</label><input defaultValue={siteConfig.socials.youtube} /></div>
                <div className="form-field"><label>TikTok</label><input defaultValue={siteConfig.socials.tiktok || ''} placeholder="https://tiktok.com/..." /></div>
              </div>

              <h2 className="settings-section-title" style={{ marginTop: 28 }}>Platform links</h2>
              <div className="form-row">
                <div className="form-field"><label>Spotify</label><input defaultValue="https://open.spotify.com/show/0IJMdqLjeYBy9xdY30t1M1" /></div>
                <div className="form-field"><label>Apple Podcasts</label><input defaultValue="https://podcasts.apple.com/us/podcast/so-nigerian/id1507420236" /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>YouTube</label><input defaultValue="https://youtube.com/@sonigerianpodcast" /></div>
                <div className="form-field"><label>Acast</label><input defaultValue="https://feeds.acast.com/public/shows/so-nigerian" /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Podbean</label><input defaultValue="https://www.podbean.com/podcast-detail/evymz-14569b/So-Nigerian-Podcast" /></div>
                <div className="form-field"></div>
              </div>

              <h2 className="settings-section-title" style={{ marginTop: 28 }}>Contact</h2>
              <div className="form-row">
                <div className="form-field"><label>Contact email</label><input defaultValue={siteConfig.contact.email} /></div>
                <div className="form-field"><label>Form submissions email</label><input defaultValue="oluwadamilarearogundade@gmail.com" /></div>
              </div>

              <button className="admin-save-btn" style={{ marginTop: 16 }}>Save site settings</button>

              <h2 className="settings-section-title" style={{ marginTop: 36 }}>Admin users</h2>
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
        {tabs.slice(0, 3).map(t => (
          <button key={t.id} className={`admin-bnav ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            <t.icon size={18} /><span>{t.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
