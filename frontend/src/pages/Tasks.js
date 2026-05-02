import { useEffect, useState } from 'react';
import API from '../api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', project:'', assignedTo:'', priority:'Medium', dueDate:'' });
  const user = JSON.parse(localStorage.getItem('user'));

  const load = async () => {
    const { data } = await API.get('/tasks');
    setTasks(data);
    const p = await API.get('/projects');
    setProjects(p.data);
    if (user.role === 'Admin') {
      const u = await API.get('/auth/users');
      setUsers(u.data);
    }
  };
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await API.post('/tasks', form);
    setForm({ title:'', description:'', project:'', assignedTo:'', priority:'Medium', dueDate:'' });
    load();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    load();
  };

  const remove = async (id) => {
    await API.delete(`/tasks/${id}`);
    load();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Tasks</h2>
      {user.role === 'Admin' && (
        <form onSubmit={create} style={{marginBottom:20, display:'flex', gap:5, flexWrap:'wrap'}}>
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
          <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <select value={form.project} onChange={e=>setForm({...form,project:e.target.value})} required>
            <option value="">Select Project</option>
            {projects.map(p=><option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <select value={form.assignedTo} onChange={e=>setForm({...form,assignedTo:e.target.value})}>
            <option value="">Assign To</option>
            {users.map(u=><option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <input type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/>
          <button type="submit">Create Task</button>
        </form>
      )}
      <table border="1" cellPadding="10" style={{width:'100%'}}>
        <thead><tr><th>Title</th><th>Project</th><th>Assigned</th><th>Priority</th><th>Due</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.project?.name}</td>
              <td>{t.assignedTo?.name || '-'}</td>
              <td>{t.priority}</td>
              <td>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}</td>
              <td>
                <select value={t.status} onChange={e=>updateStatus(t._id, e.target.value)}>
                  <option>To Do</option><option>In Progress</option><option>Done</option>
                </select>
              </td>
              <td>{user.role === 'Admin' && <button onClick={()=>remove(t._id)}>Delete</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}