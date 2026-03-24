import { useState } from 'preact/hooks';

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
      <div class="page-header">
        <h2 class="page-title">Settings</h2>
      </div>
      <div class="card" style={{ maxWidth: '480px' }}>
        <form onSubmit={handleSave}>
          <div class="form-group">
            <label class="form-label" for="orgName">Organization Name</label>
            <input
              id="orgName"
              class="form-input"
              type="text"
              value={orgName}
              onInput={(e) => setOrgName(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="contactEmail">Contact Email</label>
            <input
              id="contactEmail"
              class="form-input"
              type="email"
              value={contactEmail}
              onInput={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
}
