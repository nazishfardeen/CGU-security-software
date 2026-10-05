import { useState, useEffect } from 'react';
import { UserPlus, CheckCircle } from 'lucide-react';

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [formData, setFormData] = useState({ name: '', purpose: '', phone: '' });

  const fetchVisitors = () => {
    fetch('http://localhost:3000/api/visitors')
      .then(res => res.json())
      .then(data => setVisitors(data.data || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => {
      setFormData({ name: '', purpose: '', phone: '' });
      fetchVisitors();
    });
  };

  const handleCheckout = (id) => {
    fetch(`http://localhost:3000/api/visitors/${id}/checkout`, {
      method: 'PATCH'
    })
    .then(() => fetchVisitors());
  };

  return (
    <div>
      <div className="page-header">
        <h1>Visitor Management</h1>
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3>Register New Visitor</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Purpose of Visit</label>
              <input type="text" className="form-input" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={18} /> Register Visitor
            </button>
          </form>
        </div>
      </div>

      <div className="glass-panel table-container">
        <h3>Visitor Log</h3>
        <table className="data-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Purpose</th>
              <th>Check-in Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map(v => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.phone}</td>
                <td>{v.purpose}</td>
                <td>{new Date(v.checkInTime).toLocaleString()}</td>
                <td>
                  <span className={`badge ${v.status === 'Checked In' ? 'success' : 'info'}`}>
                    {v.status}
                  </span>
                </td>
                <td>
                  {v.status === 'Checked In' && (
                    <button onClick={() => handleCheckout(v.id)} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                      <CheckCircle size={14} /> Checkout
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {visitors.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No visitors logged.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
