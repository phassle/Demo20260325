import { useApiData } from '../hooks/useApiData';
import { auditApi } from '../services/api';

const statusBadge = {
  Planned: 'badge-blue',
  InProgress: 'badge-yellow',
  Completed: 'badge-green',
};

export function AuditsPage() {
  const { data, loading, error } = useApiData(auditApi.getAll);

  if (loading) return <div class="loading">Loading audits...</div>;
  if (error) return <div class="error">Error: {error}</div>;

  return (
    <div>
      <div class="page-header">
        <h2 class="page-title">All Audits</h2>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Auditor</th>
            <th>Department</th>
            <th>Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((audit) => (
            <tr key={audit.id}>
              <td>{audit.id}</td>
              <td>{audit.title}</td>
              <td>{audit.type}</td>
              <td>
                <span class={`badge ${statusBadge[audit.status] || 'badge-gray'}`}>
                  {audit.status}
                </span>
              </td>
              <td>{audit.auditorName}</td>
              <td>{audit.department}</td>
              <td>{audit.scheduledDate ? new Date(audit.scheduledDate).toLocaleDateString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
