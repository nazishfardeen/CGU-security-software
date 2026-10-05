import { useEffect, useState } from 'react';
import { Users, AlertTriangle, ShieldCheck, FileText, Search, Phone, Mail, GraduationCap } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ 
    activeVisitors: 0, 
    totalIncidents: 0, 
    guardsOnDuty: 0,
    activeLeaves: 0,
    unresolvedItems: 0,
    campusStatus: 'Secure' 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => console.error("Failed to fetch stats", err));
  }, []);

  const directories = [
    { name: "Vice Chancellor's Office", email: "vc@cgu-odisha.ac.in", phone: "0674-6636555" },
    { name: "Dean Academics", email: "dean.academics@cgu-odisha.ac.in", phone: "9040272733" },
    { name: "Chief Warden", email: "cwh@cgu-odisha.ac.in", phone: "9040272755" },
    { name: "Placement Cell", email: "placement@cgu-odisha.ac.in", phone: "9040021102" },
    { name: "Student Grievance", email: "grievance@cgu-odisha.ac.in", phone: "9040021101" },
    { name: "Examination Cell", email: "coe@cgu-odisha.ac.in", phone: "9040021103" }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>CGU Security Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Live Campus Monitoring System</p>
      </div>
      
      {loading ? (
        <p>Loading real-time stats...</p>
      ) : (
        <>
          <div className="grid-3" style={{ marginBottom: '2rem' }}>
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '0.5rem', color: 'var(--accent-color)' }}>
                  <Users size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Visitors</h3>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>{stats.activeVisitors}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '0.5rem', color: 'var(--warning)' }}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Incidents</h3>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>{stats.totalIncidents}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '0.5rem', color: 'var(--success)' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Guards on Duty</h3>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>{stats.guardsOnDuty}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '0.5rem', color: '#8b5cf6' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Out-Passes</h3>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>{stats.activeLeaves}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '0.5rem', color: '#ec4899' }}>
                  <Search size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Unclaimed Items</h3>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>{stats.unresolvedItems}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ background: stats.campusStatus === 'Secure' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: stats.campusStatus === 'Secure' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', color: stats.campusStatus === 'Secure' ? 'var(--success)' : 'var(--danger)' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Campus Threat Level</h3>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: stats.campusStatus === 'Secure' ? 'var(--success)' : 'var(--danger)' }}>
                    {stats.campusStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              <GraduationCap size={24} color="var(--accent-color)" /> C.V. Raman Global University Directory
            </h2>
            <div className="grid-3">
              {directories.map((dir, idx) => (
                <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-color)' }}>{dir.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    <Mail size={14} /> {dir.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <Phone size={14} /> {dir.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
