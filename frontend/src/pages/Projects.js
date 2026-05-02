import { useEffect, useState } from 'react';
import API from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', members: [] });
  const user = JSON.parse(localStorage.getItem('user'));

  const load = async () => {
    const { data } = await API.get('/projects');
    setProjects(data);
    if (user.role === 'Admin') {
      const u = await API.get('/auth/users');
      setUsers(u.data);
    }
  };
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await API.post('/projects', form);
    setForm({ name: '', description: '', members: [] });
    load();
  };

  const remove = async (id) => {
    if (window.confirm('Delete?')) {
      await API.delete(`/projects/${id}`);
      load();
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Projects</h2>
      {user.role === 'Admin' && (
        <form onSubmit={create} style={{ marginBottom: 20 }}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
          <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <select multiple value={form.members} onChange={e=>setForm({...form, members: [...e.target.selectedOptions].map(o=>o.value)})}>
            {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <button type="submit">Create</button>
        </form>
      )}
      {projects.map(p => (
        <div key={p._id} style={{border:'1px solid #ccc', padding:15, margin:10, borderRadius:8}}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>Members: {p.members.map(m => m.name).join(', ')}</p>
          {user.role === 'Admin' && <button onClick={() => remove(p._id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
}