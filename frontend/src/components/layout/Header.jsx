export function Header({ title }) {
  return (
    <header className="header header-glass">
      <h1 className="header-title">{title}</h1>
      <div className="header-right">
        <input type="text" className="header-search" placeholder="Search..." />
        <button className="header-bell" title="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <div className="header-user">
          <div className="header-avatar">CA</div>
          <span>Centuri Admin</span>
        </div>
      </div>
    </header>
  );
}
