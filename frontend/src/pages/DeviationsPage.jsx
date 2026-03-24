import { useApiData } from '../hooks/useApiData';
import { deviationApi } from '../services/api';

const severityBadge = {
  Low: 'badge-gray',
  Medium: 'badge-yellow',
  High: 'badge-orange',
  Critical: 'badge-red',
};

const statusBadge = {
  Open: 'badge-red',
  InProgress: 'badge-yellow',
  Resolved: 'badge-green',
  Closed: 'badge-gray',
};

export function DeviationsPage() {
  const { data, loading, error } = useApiData(deviationApi.getAll);

  if (loading) return <div class="loading">Loading deviations...</div>;
  if (error) return <div class="error">Error: {error}</div>;

  return (
    <div>
      <div class="page-header">
        <h2 class="page-title">All Deviations</h2>
      </div>
      <table class="data-table">
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
                <span class={`badge ${severityBadge[dev.severity] || 'badge-gray'}`}>
                  {dev.severity}
                </span>
              </td>
              <td>
                <span class={`badge ${statusBadge[dev.status] || 'badge-gray'}`}>
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
