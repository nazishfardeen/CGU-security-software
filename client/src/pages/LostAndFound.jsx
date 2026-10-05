import { useState, useEffect } from 'react';
import { Search, CheckCircle } from 'lucide-react';

export default function LostAndFound() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ itemDescription: '', location: '', contactInfo: '' });

  const fetchItems = () => {
    fetch('http://localhost:3000/api/lost-found')
      .then(res => res.json())
      .then(data => setItems(data.data || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/lost-found', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => {
      setFormData({ itemDescription: '', location: '', contactInfo: '' });
      fetchItems();
    });
  };

  const handleClaim = (id) => {
    fetch(`http://localhost:3000/api/lost-found/${id}/claim`, {
      method: 'PATCH'
    })
    .then(() => fetchItems());
  };

  return (
    <div>
      <div className="page-header">
        <h1>Lost & Found Registry</h1>
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3>Report Item</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Item Description</label>
              <textarea className="form-textarea" rows="2" value={formData.itemDescription} onChange={e => setFormData({...formData, itemDescription: e.target.value})} required placeholder="E.g. Blue Dell Laptop, Black Wallet" />
            </div>
            <div className="form-group">
              <label className="form-label">Location (Lost or Found)</label>
              <select className="form-select" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required>
                  <option value="" disabled>Select Location</option>
                  <option value="Girls Hostel">Girls Hostel</option>
                  <option value="Boys Hostel">Boys Hostel</option>
                  <option value="International Students Hostel">International Students Hostel</option>
                  <option value="BS Building">BS Building</option>
                  <option value="CS Building">CS Building</option>
                  <option value="RIHC Auditorium">RIHC Auditorium</option>
                  <option value="MBA Gallery">MBA Gallery</option>
                  <option value="Electrical Building">Electrical Building</option>
                  <option value="Mechanical Building">Mechanical Building</option>
                  <option value="Library">Library</option>
                  <option value="Cafeteria">Cafeteria</option>
                  <option value="Main Gate">Main Gate</option>
                  <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Contact Information</label>
              <input type="text" className="form-input" value={formData.contactInfo} onChange={e => setFormData({...formData, contactInfo: e.target.value})} required placeholder="Phone number or Student ID" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--secondary-color), #d97706)' }}>
              <Search size={18} /> Report Item
            </button>
          </form>
        </div>
      </div>

      <div className="glass-panel table-container">
        <h3>Registry Log</h3>
        <table className="data-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Location</th>
              <th>Contact Info</th>
              <th>Reported At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={{ fontWeight: 500 }}>{item.itemDescription}</td>
                <td>{item.location}</td>
                <td>{item.contactInfo}</td>
                <td>{new Date(item.reportedAt).toLocaleString()}</td>
                <td>
                  <span className={`badge ${item.status === 'Claimed' ? 'success' : 'warning'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  {item.status === 'Unclaimed' && (
                    <button onClick={() => handleClaim(item.id)} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#059669', boxShadow: 'none' }}>
                      <CheckCircle size={14} /> Mark Claimed
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No items reported.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
