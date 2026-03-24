import { useApiData } from '../hooks/useApiData';
import { deviationApi } from '../services/api';

const severityBadge = {
  Low: 'badge-glow-gray',
  Medium: 'badge-glow-yellow',
  High: 'badge-glow-orange',
  Critical: 'badge-glow-red',
};

const statusBadge = {
  Open: 'badge-glow-red',
  InProgress: 'badge-glow-yellow',
  Resolved: 'badge-glow-green',
  Closed: 'badge-glow-gray',
};

export function DeviationsPage() {
  const { data, loading, error } = useApiData(deviationApi.getAll);

  if (loading) return <div className="loading">Loading deviations...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">All Deviations</h2>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Reported By</th>
            <th>Assigned To</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((dev) => (
            <tr key={dev.id}>
              <td>{dev.id}</td>
              <td>{dev.title}</td>
              <td>
                <span className={`badge ${severityBadge[dev.severity] || 'badge-glow-gray'}`}>
                  {dev.severity}
                </span>
              </td>
              <td>
                <span className={`badge ${statusBadge[dev.status] || 'badge-glow-gray'}`}>
                  {dev.status}
                </span>
              </td>
              <td>{dev.reportedBy}</td>
              <td>{dev.assignedTo}</td>
              <td>{dev.createdAt ? new Date(dev.createdAt).toLocaleDateString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
