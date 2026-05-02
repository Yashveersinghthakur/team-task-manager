import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Member' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box',
    marginBottom: 16, transition: 'border 0.2s',
  };

  const labelStyle = {
    color: 'rgba(255,255,255,0.7)', fontSize: 13,
    display: 'block', marginBottom: 8, fontWeight: 500,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Sora', sans-serif", position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(99,102,241,0.35), transparent)',
        borderRadius: '50%', top: '-100px', right: '-100px',
        animation: 'float 7s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(16,185,129,0.25), transparent)',
        borderRadius: '50%', bottom: '-80px', left: '-80px',
        animation: 'float 5s ease-in-out infinite reverse',
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24,
        padding: '48px 40px', width: 400,
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #10b981, #6366f1)',
            marginBottom: 16, fontSize: 24,
          }}>🚀</div>
          <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 700, margin: 0 }}>Create Account</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 4 }}>Join TaskFlow and boost productivity</p>
        </div>

        <form onSubmit={submit}>
          <label style={labelStyle}>Full Name</label>
          <input
            placeholder="John Doe"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
          />

          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
          />

          <label style={labelStyle}>Role</label>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="Member" style={{ background: '#302b63' }}>👤 Member</option>
            <option value="Admin" style={{ background: '#302b63' }}>👑 Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #10b981, #6366f1)',
              color: '#fff', fontWeight: 700, fontSize: 16,
              border: 'none', borderRadius: 12, cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.1s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseOver={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginTop: 24, fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        input::placeholder, select { color: rgba(255,255,255,0.35); }
        select option { color: #fff; }
      `}</style>
    </div>
  );
}
