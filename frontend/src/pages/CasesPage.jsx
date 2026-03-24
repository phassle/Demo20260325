import { useApiData } from '../hooks/useApiData';
import { caseApi } from '../services/api';

const priorityBadge = {
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

export function CasesPage() {
  const { data, loading, error } = useApiData(caseApi.getAll);

  if (loading) return <div class="loading">Loading cases...</div>;
  if (error) return <div class="error">Error: {error}</div>;

  return (
    <div>
      <div class="page-header">
        <h2 class="page-title">All Cases</h2>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>{c.type}</td>
              <td>
                <span class={`badge ${priorityBadge[c.priority] || 'badge-gray'}`}>
                  {c.priority}
                </span>
              </td>
              <td>
                <span class={`badge ${statusBadge[c.status] || 'badge-gray'}`}>
                  {c.status}
                </span>
              </td>
              <td>{c.createdBy}</td>
              <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
