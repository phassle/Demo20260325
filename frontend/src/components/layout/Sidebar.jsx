export function Sidebar() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  const link = (href, label, icon) => (
    <a href={href} class={`sidebar-link${path === href ? ' active' : ''}`}>
      <span class="sidebar-icon">{icon}</span>
      {label}
    </a>
  );

  return (
    <nav class="sidebar">
      <div class="sidebar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#0D9488" />
          <path d="M7 12l3 3 7-7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Centuri
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">Quality</div>
        {link('/', 'Dashboard', '📊')}
        {link('/documents', 'Documents', '📄')}
        {link('/deviations', 'Deviations', '⚠️')}
        {link('/audits', 'Audits', '🔍')}
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">Management</div>
        {link('/cases', 'Cases', '📋')}
        {link('/users', 'Users', '👥')}
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">Other</div>
        {link('/settings', 'Settings', '⚙️')}
        {link('/help', 'Help', '❓')}
      </div>
    </nav>
  );
}
