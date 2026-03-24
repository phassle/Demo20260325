import { useApiData } from '../hooks/useApiData';
import { caseApi } from '../services/api';

const priorityBadge = {
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

export function CasesPage() {
  const { data, loading, error } = useApiData(caseApi.getAll);

  if (loading) return <div className="loading">Loading cases...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">All Cases</h2>
      </div>
      <table className="data-table">
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
                <span className={`badge ${priorityBadge[c.priority] || 'badge-glow-gray'}`}>
                  {c.priority}
                </span>
              </td>
              <td>
                <span className={`badge ${statusBadge[c.status] || 'badge-glow-gray'}`}>
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
