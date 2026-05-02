import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{width:'100%',padding:10,margin:5}}/>
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required style={{width:'100%',padding:10,margin:5}}/>
      <button type="submit" style={{padding:10, width:'100%'}}>Login</button>
      <p>No account? <Link to="/register">Register</Link></p>
    </form>
  );
}