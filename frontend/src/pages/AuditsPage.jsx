import { useApiData } from '../hooks/useApiData';
import { auditApi } from '../services/api';

const statusBadge = {
  Planned: 'badge-blue',
  InProgress: 'badge-yellow',
  Completed: 'badge-green',
};

export function AuditsPage() {
  const { data, loading, error } = useApiData(auditApi.getAll);

  if (loading) return <div className="loading">Loading audits...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">All Audits</h2>
      </div>
      <table className="data-table">
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
                <span className={`badge ${statusBadge[audit.status] || 'badge-gray'}`}>
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
