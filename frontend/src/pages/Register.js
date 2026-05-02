import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Member' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} required style={{width:'100%',padding:10,margin:5}}/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required style={{width:'100%',padding:10,margin:5}}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required style={{width:'100%',padding:10,margin:5}}/>
      <select onChange={e => setForm({...form, role: e.target.value})} style={{width:'100%',padding:10,margin:5}}>
        <option value="Member">Member</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit" style={{padding:10, width:'100%'}}>Register</button>
      <p>Have account? <Link to="/login">Login</Link></p>
    </form>
  );
}