import { useState, useEffect } from 'react';
import { Megaphone, Phone } from 'lucide-react';

export default function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);
  const [formData, setFormData] = useState({ message: '', type: 'Alert' });

  const fetchData = () => {
    fetch('http://localhost:3000/api/emergency-contacts')
      .then(res => res.json())
      .then(data => setContacts(data.data || []));
      
    fetch('http://localhost:3000/api/broadcasts')
      .then(res => res.json())
      .then(data => setBroadcasts(data.data || []));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBroadcast = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/broadcasts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => {
      setFormData({ message: '', type: 'Alert' });
      fetchData();
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Emergency Contacts & Broadcast</h1>
      </div>

      <div className="grid-2">
        <div className="glass-panel">
            <h3>Quick Emergency Contacts</h3>
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {contacts.map(contact => (
                    <div key={contact.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{contact.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{contact.role}</div>
                        <a href={`tel:${contact.phone}`} className="btn btn-primary" style={{ display: 'inline-flex', padding: '0.3rem 0.6rem', fontSize: '0.8rem', textDecoration: 'none' }}>
                            <Phone size={14} /> {contact.phone}
                        </a>
                    </div>
                ))}
            </div>
        </div>

        <div className="glass-panel">
            <h3>Campus Broadcast System</h3>
            <form onSubmit={handleBroadcast} style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Broadcast Type</label>
                  <select className="form-select" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} required>
                    <option value="Alert">General Alert</option>
                    <option value="Warning">Warning</option>
                    <option value="Emergency">Critical Emergency</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" rows="3" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required placeholder="E.g. Fire alarm triggered in BS Building. Please evacuate." />
                </div>
                <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}>
                  <Megaphone size={18} /> Send Broadcast
                </button>
            </form>
        </div>
      </div>

      <div className="glass-panel table-container" style={{ marginTop: '2rem' }}>
        <h3>Broadcast History</h3>
        <table className="data-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Sent At</th>
              <th>Type</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {broadcasts.map(b => (
              <tr key={b.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(b.sentAt).toLocaleString()}</td>
                <td>
                  <span className={`badge ${b.type === 'Emergency' ? 'danger' : b.type === 'Warning' ? 'warning' : 'info'}`} style={{ backgroundColor: b.type === 'Emergency' ? '#ef4444' : b.type === 'Warning' ? '#f59e0b' : '#3b82f6', color: 'white' }}>
                    {b.type}
                  </span>
                </td>
                <td>{b.message}</td>
              </tr>
            ))}
            {broadcasts.length === 0 && (
              <tr><td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No broadcasts sent.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
