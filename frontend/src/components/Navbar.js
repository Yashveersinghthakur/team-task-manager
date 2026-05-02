import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <nav style={{ padding: 15, background: '#222', color: '#fff', display: 'flex', gap: 20 }}>
      <Link to="/" style={{ color: '#fff' }}>Dashboard</Link>
      <Link to="/projects" style={{ color: '#fff' }}>Projects</Link>
      <Link to="/tasks" style={{ color: '#fff' }}>Tasks</Link>
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <>
            <span>{user.name} ({user.role}) </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#fff' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}