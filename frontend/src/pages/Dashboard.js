import { useEffect, useState } from 'react';
import API from '../api';

const StatCard = ({ label, value, icon, gradient, delay }) => (
  <div style={{
    background: gradient,
    borderRadius: 20, padding: '24px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    animation: `slideUp 0.5s ease ${delay}s both`,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: -20, right: -20,
      width: 100, height: 100, borderRadius: '50%',
      background: 'rgba(255,255,255,0.08)',
    }} />
    <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '0 0 4px', fontWeight: 500 }}>{label}</p>
    <p style={{ color: '#fff', fontSize: 36, fontWeight: 700, margin: 0, lineHeight: 1 }}>{value ?? 0}</p>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentTasks, setRecentTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get('/tasks/dashboard')
      .then(res => setStats(res.data))
      .catch(() => {});
    API.get('/tasks')
      .then(res => setRecentTasks(res.data.slice(0, 5)))
      .catch(() => {});
  }, []);

  const statusColor = {
    'To Do': { bg: 'rgba(99,102,241,0.2)', color: '#a5b4fc', dot: '#6366f1' },
    'In Progress': { bg: 'rgba(245,158,11,0.2)', color: '#fcd34d', dot: '#f59e0b' },
    'Done': { bg: 'rgba(16,185,129,0.2)', color: '#6ee7b7', dot: '#10b981' },
  };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", color: '#fff' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #a5b4fc, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Good morning, {user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 6, fontSize: 14 }}>
          Here's what's happening with your projects today
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 40 }}>
        <StatCard label="Total Tasks" value={stats.total} icon="📋" gradient="linear-gradient(135deg, #6366f1, #8b5cf6)" delay={0} />
        <StatCard label="To Do" value={stats.todo} icon="🎯" gradient="linear-gradient(135deg, #3b82f6, #6366f1)" delay={0.1} />
        <StatCard label="In Progress" value={stats.inProgress} icon="⚡" gradient="linear-gradient(135deg, #f59e0b, #ef4444)" delay={0.2} />
        <StatCard label="Done" value={stats.done} icon="✅" gradient="linear-gradient(135deg, #10b981, #059669)" delay={0.3} />
        <StatCard label="Overdue" value={stats.overdue} icon="🔥" gradient="linear-gradient(135deg, #ef4444, #b91c1c)" delay={0.4} />
      </div>

      {/* Recent Tasks */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.08)', padding: 24,
        animation: 'slideUp 0.6s ease 0.5s both',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: '#e2e8f0' }}>Recent Tasks</h2>
          <a href="/tasks" style={{
            color: '#818cf8', fontSize: 13, textDecoration: 'none', fontWeight: 500,
            padding: '6px 14px', background: 'rgba(99,102,241,0.15)', borderRadius: 20,
            border: '1px solid rgba(99,102,241,0.3)',
          }}>View All →</a>
        </div>

        {recentTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 14 }}>No tasks yet. Create one from the Tasks page!</p>
          </div>
        ) : (
          recentTasks.map((task, i) => {
            const s = statusColor[task.status] || statusColor['To Do'];
            return (
              <div key={task._id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: i < recentTasks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                animation: `slideUp 0.4s ease ${0.6 + i * 0.1}s both`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#e2e8f0' }}>{task.title}</p>
                    <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{task.project?.name || 'No Project'}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
                    background: s.bg, color: s.color,
                  }}>{task.status}</span>
                  <span style={{
                    fontSize: 11, padding: '4px 10px', borderRadius: 20,
                    background: task.priority === 'High' ? 'rgba(239,68,68,0.2)' : task.priority === 'Medium' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)',
                    color: task.priority === 'High' ? '#fca5a5' : task.priority === 'Medium' ? '#fcd34d' : '#6ee7b7',
                  }}>{task.priority}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
