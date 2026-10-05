import { useState, useEffect } from 'react';
import { FileText, ArrowRight, ArrowLeft } from 'lucide-react';

export default function StudentLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({ name: '', regId: '', semester: '', branch: '', reason: '', startDate: '', expectedReturnDate: '' });

  const fetchLeaves = () => {
    fetch('http://localhost:3000/api/student-leaves')
      .then(res => res.json())
      .then(data => setLeaves(data.data || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/student-leaves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => {
      setFormData({ name: '', regId: '', semester: '', branch: '', reason: '', startDate: '', expectedReturnDate: '' });
      fetchLeaves();
    });
  };

  const handleAction = (id, action) => {
    fetch(`http://localhost:3000/api/student-leaves/${id}/${action}`, {
      method: 'PATCH'
    })
    .then(() => fetchLeaves());
  };

  return (
    <div>
      <div className="page-header">
        <h1>Student Leave Register (Out-Pass)</h1>
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3>Register New Leave Pass</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            
            <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Student Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Registration ID</label>
                  <input type="text" className="form-input" value={formData.regId} onChange={e => setFormData({...formData, regId: e.target.value})} required />
                </div>
            </div>

            <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Semester</label>
                  <select className="form-select" value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})} required>
                    <option value="" disabled>Select Sem</option>
                    <option value="1">1st Sem</option>
                    <option value="2">2nd Sem</option>
                    <option value="3">3rd Sem</option>
                    <option value="4">4th Sem</option>
                    <option value="5">5th Sem</option>
                    <option value="6">6th Sem</option>
                    <option value="7">7th Sem</option>
                    <option value="8">8th Sem</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Branch</label>
                  <input type="text" className="form-input" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} placeholder="e.g. CSE, IT" required />
                </div>
            </div>

            <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input type="date" className="form-input" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Expected Return</label>
                  <input type="date" className="form-input" value={formData.expectedReturnDate} onChange={e => setFormData({...formData, expectedReturnDate: e.target.value})} required />
                </div>
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Leave</label>
              <input type="text" className="form-input" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} required />
            </div>
            
            <button type="submit" className="btn btn-primary">
              <FileText size={18} /> Generate Pass
            </button>
          </form>
        </div>
      </div>

      <div className="glass-panel table-container">
        <h3>Active & Past Leaves</h3>
        <table className="data-table" style={{ marginTop: '1rem', minWidth: '900px' }}>
          <thead>
            <tr>
              <th>Student Details</th>
              <th>Branch/Sem</th>
              <th>Duration</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(leave => (
              <tr key={leave.id}>
                <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{leave.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{leave.regId}</div>
                </td>
                <td>{leave.branch} (Sem {leave.semester})</td>
                <td>
                    <div style={{ fontSize: '0.85rem' }}>{leave.startDate} to {leave.expectedReturnDate}</div>
                </td>
                <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{leave.reason}</td>
                <td>
                  <span className={`badge ${leave.status === 'Returned' ? 'success' : leave.status === 'On Leave' ? 'warning' : 'info'}`}>
                    {leave.status}
                  </span>
                </td>
                <td>
                  {leave.status === 'Pending Departure' && (
                    <button onClick={() => handleAction(leave.id, 'depart')} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#d97706', boxShadow: 'none' }}>
                      <ArrowRight size={14} /> Mark Departed
                    </button>
                  )}
                  {leave.status === 'On Leave' && (
                    <button onClick={() => handleAction(leave.id, 'return')} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#059669', boxShadow: 'none' }}>
                      <ArrowLeft size={14} /> Mark Returned
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {leaves.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No leave passes generated.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
