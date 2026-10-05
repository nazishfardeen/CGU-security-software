import { useState, useEffect } from 'react';
import { Shield, Clock, LogOut } from 'lucide-react';

export default function GuardShifts() {
  const [guards, setGuards] = useState([]);

  const fetchGuards = () => {
    fetch('http://localhost:3000/api/guard-shifts')
      .then(res => res.json())
      .then(data => setGuards(data.data || []));
  };

  useEffect(() => {
    fetchGuards();
  }, []);

  const handleAction = (id, action) => {
    fetch(`http://localhost:3000/api/guard-shifts/${id}/${action}`, {
      method: 'PATCH'
    })
    .then(() => fetchGuards());
  };

  return (
    <div>
      <div className="page-header">
        <h1>Guard Shift Logs</h1>
      </div>

      <div className="glass-panel table-container" style={{ marginTop: '2rem' }}>
        <h3>Current Duty Roster</h3>
        <table className="data-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Guard Details</th>
              <th>Location</th>
              <th>Shift</th>
              <th>Status</th>
              <th>In Time</th>
              <th>Exit Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guards.map(g => (
              <tr key={g.id}>
                <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{g.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{g.badgeNumber}</div>
                </td>
                <td>{g.location}</td>
                <td>{g.shiftType} Shift</td>
                <td>
                  <span className={`badge`} style={{ backgroundColor: g.status === 'On Duty' ? '#059669' : '#4b5563', color: 'white' }}>
                    {g.status}
                  </span>
                </td>
                <td>{g.inTime ? new Date(g.inTime).toLocaleTimeString() : '-'}</td>
                <td>{g.exitTime ? new Date(g.exitTime).toLocaleTimeString() : '-'}</td>
                <td>
                  {g.status === 'Off Duty' && (
                    <button onClick={() => handleAction(g.id, 'in')} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#059669', boxShadow: 'none' }}>
                      <Clock size={14} /> Clock In
                    </button>
                  )}
                  {g.status === 'On Duty' && (
                    <button onClick={() => handleAction(g.id, 'out')} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#dc2626', boxShadow: 'none' }}>
                      <LogOut size={14} /> Clock Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
