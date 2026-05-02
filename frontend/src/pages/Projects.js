import { useEffect, useState } from 'react';
import API from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', members: [] });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const load = async () => {
    try {
      const { data } = await API.get('/projects');
      setProjects(data);
      if (user?.role === 'Admin') {
        const u = await API.get('/auth/users');
        setUsers(u.data);
      }
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/projects', form);
      setForm({ name: '', description: '', members: [] });
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (window.confirm('Delete this project?')) {
      await API.delete(`/projects/${id}`);
      load();
    }
  };

  const colors = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #3b82f6, #6366f1)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
  ];

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", color: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: '#e2e8f0' }}>Projects</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 4, fontSize: 14 }}>{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
        </div>
        {user?.role === 'Admin' && (
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 20px', borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              color: '#fff', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 14, fontFamily: "'Sora', sans-serif",
              transition: 'transform 0.2s',
            }}
            onMouseOver={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            {showForm ? '✕ Cancel' : '+ New Project'}
          </button>
        )}
      </div>

      {/* Create Form */}
      {showForm && user?.role === 'Admin' && (
        <div style={{
          background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: 20, padding: 28, marginBottom: 28,
          animation: 'slideDown 0.3s ease',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 20px', color: '#a5b4fc' }}>📁 Create New Project</h2>
          <form onSubmit={create}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, display: 'block', marginBottom: 6 }}>Project Name *</label>
                <input
                  placeholder="e.g. Website Redesign"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, display: 'block', marginBottom: 6 }}>Description</label>
                <input
                  placeholder="Brief description..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, display: 'block', marginBottom: 6 }}>
                Add Members (Ctrl+click to select multiple)
              </label>
              <select
                multiple
                value={form.members}
                onChange={e => setForm({ ...form, members: [...e.target.selectedOptions].map(o => o.value) })}
                style={{
                  width: '100%', height: 100, padding: '8px 14px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', fontSize: 14, outline: 'none',
                }}
              >
                {users.map(u => (
                  <option key={u._id} value={u._id} style={{ background: '#1a1830', padding: 8 }}>{u.name}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 28px', borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                color: '#fff', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: 14, fontFamily: "'Sora', sans-serif",
              }}
            >
              {loading ? 'Creating...' : '✓ Create Project'}
            </button>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 0',
          background: 'rgba(255,255,255,0.03)', borderRadius: 20,
          border: '1px dashed rgba(255,255,255,0.1)',
        }}>
          <div style={{ fontSize: 50, marginBottom: 16 }}>📂</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>No projects yet</p>
          {user?.role === 'Admin' && (
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>Click "New Project" to get started</p>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {projects.map((project, i) => (
            <div key={project._id} style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Color bar */}
              <div style={{ height: 6, background: colors[i % colors.length] }} />
              <div style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: colors[i % colors.length],
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}>📁</div>
                  {user?.role === 'Admin' && (
                    <button
                      onClick={() => remove(project._id)}
                      style={{
                        background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                        color: '#fca5a5', borderRadius: 8, padding: '4px 10px',
                        fontSize: 11, cursor: 'pointer', fontWeight: 600,
                      }}
                    >Delete</button>
                  )}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '12px 0 6px', color: '#e2e8f0' }}>{project.name}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 16px', lineHeight: 1.5 }}>
                  {project.description || 'No description provided'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>👥</span>
                  {project.members?.length > 0 ? (
                    project.members.slice(0, 3).map((m, idx) => (
                      <span key={idx} style={{
                        fontSize: 11, background: 'rgba(255,255,255,0.08)',
                        padding: '3px 8px', borderRadius: 20, color: 'rgba(255,255,255,0.6)',
                      }}>{m.name}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>No members</span>
                  )}
                  {project.members?.length > 3 && (
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>+{project.members.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        select option { background: #1a1830; color: #fff; }
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </div>
  );
}
