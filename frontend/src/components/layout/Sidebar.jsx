import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const link = (to, label, icon) => (
    <NavLink to={to} className={({ isActive }) => `sidebar-link${isActive ? ' active glow-teal' : ''}`}>
      <span className="sidebar-icon">{icon}</span>
      {label}
    </NavLink>
  );

  return (
    <nav className="sidebar sidebar-dark">
      <div className="sidebar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#0D9488" />
          <path d="M7 12l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Centuri
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Quality</div>
        {link('/', 'Dashboard', '📊')}
        {link('/documents', 'Documents', '📄')}
        {link('/deviations', 'Deviations', '⚠️')}
        {link('/audits', 'Audits', '🔍')}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Management</div>
        {link('/cases', 'Cases', '📋')}
        {link('/users', 'Users', '👥')}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Other</div>
        {link('/settings', 'Settings', '⚙️')}
        {link('/help', 'Help', '❓')}
      </div>
    </nav>
  );
}
