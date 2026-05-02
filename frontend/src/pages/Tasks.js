import { useEffect, useState } from 'react';
import API from '../api';

const priorityStyle = (p) => ({
  High: { bg: 'rgba(239,68,68,0.2)', color: '#fca5a5', label: '🔴 High' },
  Medium: { bg: 'rgba(245,158,11,0.2)', color: '#fcd34d', label: '🟡 Medium' },
  Low: { bg: 'rgba(16,185,129,0.2)', color: '#6ee7b7', label: '🟢 Low' },
}[p] || { bg: 'rgba(99,102,241,0.2)', color: '#a5b4fc', label: p });

const columnConfig = {
  'To Do': { icon: '🎯', gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'rgba(99,102,241,0.3)' },
  'In Progress': { icon: '⚡', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', border: 'rgba(245,158,11,0.3)' },
  'Done': { icon: '✅', gradient: 'linear-gradient(135deg, #10b981, #059669)', border: 'rgba(16,185,129,0.3)' },
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', project: '', assignedTo: '', priority: 'Medium', dueDate: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const load = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
      const p = await API.get('/projects');
      setProjects(p.data);
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
      await API.post('/tasks', form);
      setForm({ title: '', description: '', project: '', assignedTo: '', priority: 'Medium', dueDate: '' });
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      load();
    } catch {}
  };

  const remove = async (id) => {
    if (window.confirm('Delete this task?')) {
      await API.delete(`/tasks/${id}`);
      load();
    }
  };

  const columns = ['To Do', 'In Progress', 'Done'];

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Sora', sans-serif",
  };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", color: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: '#e2e8f0' }}>Task Board</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 4, fontSize: 14 }}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} across all projects
          </p>
        </div>
        {user?.role === 'Admin' && (
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 20px', borderRadius: 12,
              background: showForm ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #6366f1, #ec4899)',
              color: '#fff', border: showForm ? '1px solid rgba(255,255,255,0.2)' : 'none',
              cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: "'Sora', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            {showForm ? '✕ Cancel' : '+ New Task'}
          </button>
        )}
      </div>

      {/* Create Task Form */}
      {showForm && user?.role === 'Admin' && (
        <div style={{
          background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 20, padding: 28, marginBottom: 28,
          animation: 'slideDown 0.3s ease',
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 20px', color: '#a5b4fc' }}>✨ Create New Task</h2>
          <form onSubmit={create}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Title *</label>
                <input placeholder="Task title..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Description</label>
                <input placeholder="Brief description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Project *</label>
                <select value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} required style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p._id} value={p._id} style={{ background: '#1a1830' }}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Assign To</label>
                <select value={form.assignedTo} onChange={e => setForm({ ...form, assignedTo: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Unassigned</option>
                  {users.map(u => <option key={u._id} value={u._id} style={{ background: '#1a1830' }}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option style={{ background: '#1a1830' }}>Low</option>
                  <option style={{ background: '#1a1830' }}>Medium</option>
                  <option style={{ background: '#1a1830' }}>High</option>
                </select>
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Due Date</label>
                <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} style={{ ...inputStyle, colorScheme: 'dark' }} />
              </div>
            </div>
            <button type="submit" disabled={loading} style={{
              padding: '10px 28px', borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              color: '#fff', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 14, fontFamily: "'Sora', sans-serif",
            }}>
              {loading ? 'Creating...' : '✓ Create Task'}
            </button>
          </form>
        </div>
      )}

      {/* Kanban Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
        {columns.map(col => {
          const cfg = columnConfig[col];
          const colTasks = tasks.filter(t => t.status === col);
          return (
            <div key={col} style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 20, border: `1px solid ${cfg.border}`,
              overflow: 'hidden',
            }}>
              {/* Column Header */}
              <div style={{
                padding: '16px 18px',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: `1px solid ${cfg.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{cfg.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#e2e8f0' }}>{col}</span>
                </div>
                <span style={{
                  background: cfg.gradient, color: '#fff',
                  fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                  minWidth: 28, textAlign: 'center',
                }}>{colTasks.length}</span>
              </div>

              {/* Tasks */}
              <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 200 }}>
                {colTasks.length === 0 && (
                  <div style={{
                    textAlign: 'center', padding: '30px 0',
                    color: 'rgba(255,255,255,0.2)', fontSize: 13,
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
                    No tasks here
                  </div>
                )}
                {colTasks.map((task, i) => {
                  const ps = priorityStyle(task.priority);
                  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';
                  return (
                    <div key={task._id} style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 14, padding: '14px 16px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      animation: `slideUp 0.3s ease ${i * 0.06}s both`,
                      cursor: 'default',
                    }}
                      onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'; }}
                      onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#e2e8f0', flex: 1, marginRight: 8 }}>
                          {task.title}
                        </h3>
                        {user?.role === 'Admin' && (
                          <button onClick={() => remove(task._id)} style={{
                            background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)',
                            cursor: 'pointer', fontSize: 14, padding: 0, lineHeight: 1,
                            transition: 'color 0.2s',
                          }}
                            onMouseOver={e => e.target.style.color = '#fca5a5'}
                            onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
                          >✕</button>
                        )}
                      </div>

                      {task.description && (
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '0 0 10px', lineHeight: 1.5 }}>
                          {task.description}
                        </p>
                      )}

                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: ps.bg, color: ps.color }}>
                          {ps.label}
                        </span>
                        {isOverdue && (
                          <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                            🔥 Overdue
                          </span>
                        )}
                        {task.assignedTo?.name && (
                          <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                            👤 {task.assignedTo.name}
                          </span>
                        )}
                      </div>

                      {task.dueDate && (
                        <p style={{ fontSize: 11, color: isOverdue ? '#fca5a5' : 'rgba(255,255,255,0.3)', margin: '0 0 10px' }}>
                          📅 {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}

                      <select
                        value={task.status}
                        onChange={e => updateStatus(task._id, e.target.value)}
                        style={{
                          width: '100%', padding: '7px 10px', borderRadius: 8,
                          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                          color: '#a5b4fc', fontSize: 12, cursor: 'pointer', outline: 'none',
                          fontFamily: "'Sora', sans-serif", fontWeight: 500,
                        }}
                      >
                        <option style={{ background: '#1a1830' }}>To Do</option>
                        <option style={{ background: '#1a1830' }}>In Progress</option>
                        <option style={{ background: '#1a1830' }}>Done</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        select option { color: #fff; }
      `}</style>
    </div>
  );
}
