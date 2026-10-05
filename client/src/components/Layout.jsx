import { Outlet, NavLink } from 'react-router-dom';
import { Users, AlertTriangle, LayoutDashboard, Search, FileText, Megaphone, Shield } from 'lucide-react';

export default function Layout() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img 
            src="https://www.facultyplus.com/wp-content/uploads/2024/02/CV-Raman-Global-University-logo.png" 
            alt="CGU Logo" 
            style={{ height: '45px', objectFit: 'contain' }} 
          />
          <span style={{ fontSize: '1.1rem' }}>Security System</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} end>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/visitors" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Users size={20} />
            Visitor Management
          </NavLink>
          <NavLink to="/incidents" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <AlertTriangle size={20} />
            Incident Log
          </NavLink>
          <NavLink to="/lost-found" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Search size={20} />
            Lost & Found
          </NavLink>
          <NavLink to="/student-leaves" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <FileText size={20} />
            Student Leaves
          </NavLink>
          <NavLink to="/emergency" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Megaphone size={20} />
            Emergency Contacts
          </NavLink>
          <NavLink to="/guard-shifts" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Shield size={20} />
            Guard Shifts
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
