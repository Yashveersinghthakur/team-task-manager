import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/projects', icon: '📁', label: 'Projects' },
    { path: '/tasks', icon: '✅', label: 'Tasks' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Sora', sans-serif", background: '#0f1117' }}>
      {/* Sidebar */}
      <div style={{
        width: 240, background: 'linear-gradient(180deg, #13111c 0%, #1a1830 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        padding: '24px 16px', position: 'fixed', top: 0, left: 0, height: '100vh',
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, padding: '0 8px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>⚡</div>
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px' }}>TaskFlow</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, marginBottom: 8, padding: '0 8px', textTransform: 'uppercase' }}>
            Menu
          </p>
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 10, marginBottom: 4,
                  background: active ? 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(236,72,153,0.15))' : 'transparent',
                  border: active ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                  color: active ? '#a5b4fc' : 'rgba(255,255,255,0.5)',
                  textDecoration: 'none', fontSize: 14, fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={e => { if (!active) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = active ? '#a5b4fc' : 'rgba(255,255,255,0.5)'; }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 14, fontWeight: 700,
            }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: 0 }}>{user?.name || 'User'}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: 0 }}>{user?.role || 'Member'}</p>
            </div>
          </div>
          <button onClick={logout} style={{
            width: '100%', padding: '8px', borderRadius: 8,
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            color: '#fca5a5', fontSize: 12, cursor: 'pointer', fontWeight: 600,
            transition: 'all 0.2s',
          }}
            onMouseOver={e => e.target.style.background = 'rgba(239,68,68,0.3)'}
            onMouseOut={e => e.target.style.background = 'rgba(239,68,68,0.15)'}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 240, flex: 1, padding: '32px', overflowY: 'auto', minHeight: '100vh' }}>
        {children}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </div>
  );
}
