import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', location: '', severity: 'Low' });

  const fetchIncidents = () => {
    fetch('http://localhost:3000/api/incidents')
      .then(res => res.json())
      .then(data => setIncidents(data.data || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => {
      setFormData({ title: '', description: '', location: '', severity: 'Low' });
      fetchIncidents();
    });
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'High': return 'badge danger';
      case 'Medium': return 'badge warning';
      default: return 'badge info';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Incident Log</h1>
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3>Report New Incident</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Incident Title</label>
              <input type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Location</label>
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
                <label className="form-label">Severity</label>
                <select className="form-select" value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'var(--danger)' }}>
              <AlertTriangle size={18} /> Report Incident
            </button>
          </form>
        </div>
      </div>

      <div className="glass-panel table-container">
        <h3>Recent Incidents</h3>
        <table className="data-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Reported At</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(inc => (
              <tr key={inc.id}>
                <td style={{ fontWeight: 500 }}>{inc.title}</td>
                <td>{inc.location}</td>
                <td>
                  <span className={getSeverityBadge(inc.severity)}>{inc.severity}</span>
                </td>
                <td>{new Date(inc.reportedAt).toLocaleString()}</td>
                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {inc.description}
                </td>
              </tr>
            ))}
            {incidents.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No incidents reported.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
