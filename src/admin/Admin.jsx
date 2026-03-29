import { useState } from 'react';
import { LayoutDashboard, Radio, Layers, FileText, Mail, Settings, LogOut, Plus, Edit, Trash2, RotateCcw, Archive, X } from 'lucide-react';
import { episodes, dilemmas, siteConfig, allTags } from '../data/placeholder';
import './Admin.css';

const ADMIN_USERS = [
  { email: 'dami@sonigerian.com', password: 'admin123', name: 'Dami Aros', role: 'master' },
  { email: 'isaac@sonigerian.com', password: 'admin123', name: 'Isaac Aigbadumah', role: 'admin' },
];

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [availableTags, setAvailableTags] = useState(allTags.filter(t => t !== 'All'));

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

  const handleLogin = (e) => {
    e.preventDefault();
    const found = ADMIN_USERS.find(u => u.email === loginForm.email && u.password === loginForm.password);
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
              <input type="email" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} placeholder="admin@sonigerian.com" />
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
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'messages', label: 'Messages', icon: Mail },
    ...(isMaster ? [{ id: 'settings', label: 'Settings', icon: Settings }] : []),
  ];

  const activeDilemma = dilemmas.find(d => d.active);
  const totalVotes = activeDilemma?.options.reduce((a, o) => a + o.votes, 0) || 0;

  const formatNum = n => { if (n >= 1000000) return (n/1000000).toFixed(2)+'M'; if (n >= 1000) return (n/1000).toFixed(1)+'K'; return n; };

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sb-logo">So<span>Nigerian</span><small>Admin Panel</small></div>
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
            <div className="sb-role">{isMaster ? 'Master Admin' : 'Admin'}</div>
          </div>
          <button className="sb-logout" onClick={() => setUser(null)}><LogOut size={14} /></button>
        </div>
      </aside>

      <div className="admin-main">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="admin-content">
            <div className="admin-header">
              <h1>Dashboard</h1>
              <span className="admin-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="stats-grid">
              <div className="stat-card"><div className="sc-label">Episodes</div><div className="sc-val">{episodes.length}</div></div>
              <div className="stat-card"><div className="sc-label">Total plays</div><div className="sc-val">{formatNum(siteConfig.stats.totalPlays)}</div></div>
              <div className="stat-card"><div className="sc-label">Active votes</div><div className="sc-val">{totalVotes.toLocaleString()}</div></div>
              <div className="stat-card"><div className="sc-label">Messages</div><div className="sc-val">12</div></div>
            </div>
            <div className="admin-section-header">
              <h2>Recent episodes</h2>
              <button className="admin-add-btn" onClick={() => setActiveTab('episodes')}><Plus size={14} /> Add episode</button>
            </div>
            <table className="admin-table">
              <thead><tr><th>#</th><th>Title</th><th>Status</th><th>Date</th>{isMaster && <th>Actions</th>}</tr></thead>
              <tbody>
                {episodes.slice(0, 5).map(ep => (
                  <tr key={ep.id}>
                    <td>{ep.number}</td>
                    <td className="td-title">{ep.title}</td>
                    <td><span className={`status-badge ${ep.status}`}>{ep.status}</span></td>
                    <td>{new Date(ep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    {isMaster && <td><button className="tbl-btn"><Edit size={12} /></button><button className="tbl-btn del"><Trash2 size={12} /></button></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* EPISODES */}
        {activeTab === 'episodes' && (
          <div className="admin-content">
            <div className="admin-header"><h1>Add episode</h1></div>
            <div className="admin-form">
              <div className="form-row">
                <div className="form-field"><label>Episode title</label><input placeholder="e.g. Owambe Pressure" /></div>
                <div className="form-field"><label>Episode number</label><input type="number" placeholder={episodes.length + 1} /></div>
              </div>
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
              <div className="form-field full"><label>Description / Show notes</label><textarea placeholder="Write the episode description..." rows={4} /></div>
              <div className="form-row">
                <div className="form-field"><label>Audio link</label><input placeholder="https://spotify.com/..." /></div>
                <div className="form-field"><label>Thumbnail</label><input type="file" /></div>
              </div>
              <button className="admin-add-btn" style={{ marginTop: 8 }}><Plus size={14} /> Save episode</button>
            </div>
          </div>
        )}

        {/* DILEMMA */}
        {activeTab === 'dilemma' && (
          <div className="admin-content">
            <div className="admin-header"><h1>Dilemma management</h1><button className="admin-add-btn"><Plus size={14} /> New dilemma</button></div>
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
                <div className="ad-actions">
                  <button className="tbl-btn"><Edit size={12} /> Edit</button>
                  {isMaster && <button className="tbl-btn"><RotateCcw size={12} /> Reset votes</button>}
                  <button className="tbl-btn"><Archive size={12} /> Archive</button>
                </div>
              </div>
            )}
            <h2 style={{ marginTop: 32, marginBottom: 16, fontSize: 16 }}>Past dilemmas</h2>
            <table className="admin-table">
              <thead><tr><th>Scenario</th><th>Total votes</th><th>Date</th></tr></thead>
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

        {/* CONTENT */}
        {activeTab === 'content' && (
          <div className="admin-content">
            <div className="admin-header"><h1>Site content</h1></div>
            <div className="admin-form">
              <div className="form-field full"><label>Hero title</label><input defaultValue={siteConfig.heroTitle} /></div>
              <div className="form-field full"><label>Hero accent word</label><input defaultValue={siteConfig.heroTitleAccent} /></div>
              <div className="form-field full"><label>Hero description</label><textarea defaultValue={siteConfig.heroDescription} rows={3} /></div>
              <div className="form-field full"><label>About text</label><textarea defaultValue={siteConfig.aboutText} rows={5} /></div>
              <div className="form-row">
                <div className="form-field"><label>Contact email</label><input defaultValue={siteConfig.contact.email} /></div>
                <div className="form-field"><label>Phone</label><input defaultValue={siteConfig.contact.phone} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Instagram URL</label><input placeholder="https://instagram.com/..." /></div>
                <div className="form-field"><label>Twitter URL</label><input placeholder="https://x.com/..." /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>YouTube URL</label><input placeholder="https://youtube.com/..." /></div>
                <div className="form-field"><label>TikTok URL</label><input placeholder="https://tiktok.com/..." /></div>
              </div>
              <button className="admin-add-btn" style={{ marginTop: 8 }}>Save changes</button>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {activeTab === 'messages' && (
          <div className="admin-content">
            <div className="admin-header"><h1>Messages</h1><span className="msg-count">12 unread</span></div>
            {[
              { name: 'Chidi O.', email: 'chidi@gmail.com', msg: 'Love the podcast! Would love to come on as a guest to discuss tech startups in Nigeria.', date: 'Mar 28' },
              { name: 'Amara K.', email: 'amara@email.com', msg: 'I have a dilemma for the show — my roommate keeps eating my food and denying it.', date: 'Mar 27' },
              { name: 'Tunde B.', email: 'tunde@email.com', msg: 'Is there merch coming? I need a So Nigerian hoodie asap.', date: 'Mar 26' },
            ].map((m, i) => (
              <div className="msg-card" key={i}>
                <div className="msg-header"><strong>{m.name}</strong><span>{m.email}</span><span className="msg-date">{m.date}</span></div>
                <p className="msg-body">{m.msg}</p>
                <div className="msg-actions">
                  <button className="tbl-btn">Mark read</button>
                  {isMaster && <button className="tbl-btn del"><Trash2 size={12} /> Delete</button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && isMaster && (
          <div className="admin-content">
            <div className="admin-header"><h1>Settings & Roles</h1></div>
            <div className="roles-grid">
              {ADMIN_USERS.map(u => (
                <div className="role-card" key={u.email}>
                  <div className="role-avatar">{u.name.split(' ').map(n => n[0]).join('')}</div>
                  <h3>{u.name}</h3>
                  <span className={`role-tag ${u.role}`}>{u.role === 'master' ? 'Master Admin' : 'Admin'}</span>
                  <p className="role-email">{u.email}</p>
                  <div className="role-perms">
                    {['Add/edit episodes', 'Create dilemmas', 'Edit content', 'View messages',
                      ...(u.role === 'master' ? ['Delete content', 'Manage users', 'Site settings', 'Reset votes'] : [])
                    ].map(p => (
                      <div className="perm-item" key={p}><div className="perm-check" />{p}</div>
                    ))}
                    {u.role !== 'master' && ['Delete content', 'Manage users', 'Site settings'].map(p => (
                      <div className="perm-item denied" key={p}><div className="perm-x" />{p}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="admin-bottom-nav">
        {tabs.slice(0, 5).map(t => (
          <button key={t.id} className={`admin-bnav ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            <t.icon size={18} /><span>{t.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
