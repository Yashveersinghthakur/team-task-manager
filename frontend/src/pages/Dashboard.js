import { useEffect, useState } from 'react';
import API from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    API.get('/tasks/dashboard').then(res => setStats(res.data));
  }, []);
  const cardStyle = { padding: 20, border: '1px solid #ddd', borderRadius: 8, textAlign: 'center', flex: 1 };
  return (
    <div style={{ padding: 30 }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
        <div style={cardStyle}><h3>{stats.total || 0}</h3><p>Total Tasks</p></div>
        <div style={cardStyle}><h3>{stats.todo || 0}</h3><p>To Do</p></div>
        <div style={cardStyle}><h3>{stats.inProgress || 0}</h3><p>In Progress</p></div>
        <div style={cardStyle}><h3>{stats.done || 0}</h3><p>Done</p></div>
        <div style={{...cardStyle, background: '#ffe6e6'}}><h3>{stats.overdue || 0}</h3><p>Overdue</p></div>
      </div>
    </div>
  );
}