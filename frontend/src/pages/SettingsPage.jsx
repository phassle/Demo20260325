import { useState } from 'react';

export function SettingsPage() {
  const [orgName, setOrgName] = useState('Centuri AB');
  const [contactEmail, setContactEmail] = useState('admin@centuri.se');

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Implement settings save via API
    alert('Settings saved (not yet connected to backend).');
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Settings</h2>
      </div>
      <div className="card" style={{ maxWidth: '480px' }}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label" htmlFor="orgName">Organization Name</label>
            <input
              id="orgName"
              className="form-input radius-md ghost-border"
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contactEmail">Contact Email</label>
            <input
              id="contactEmail"
              className="form-input radius-md ghost-border"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-gradient radius-lg">Save</button>
        </form>
      </div>
    </div>
  );
}
