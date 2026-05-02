import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Sora', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated blobs */}
      <div style={{
        position: 'absolute', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent)',
        borderRadius: '50%', top: '-100px', left: '-100px',
        animation: 'float 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(236,72,153,0.3), transparent)',
        borderRadius: '50%', bottom: '-50px', right: '-50px',
        animation: 'float 8s ease-in-out infinite reverse',
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 24,
        padding: '48px 40px',
        width: 380,
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            marginBottom: 16, fontSize: 24,
          }}>⚡</div>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, margin: 0 }}>TaskFlow</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 4 }}>Welcome back! Sign in to continue</p>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box',
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              color: '#fff', fontWeight: 700, fontSize: 16,
              border: 'none', borderRadius: 12, cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.1s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseOver={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginTop: 24, fontSize: 14 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>
            Create one
          </Link>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </div>
  );
}
