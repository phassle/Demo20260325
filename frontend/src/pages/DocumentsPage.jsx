import { useApiData } from '../hooks/useApiData';
import { documentApi } from '../services/api';

const statusBadge = {
  Draft: 'badge-gray',
  InReview: 'badge-yellow',
  Approved: 'badge-green',
  Archived: 'badge-red',
};

export function DocumentsPage() {
  const { data, loading, error } = useApiData(documentApi.getAll);

  if (loading) return <div class="loading">Loading documents...</div>;
  if (error) return <div class="error">Error: {error}</div>;

  return (
    <div>
      <div class="page-header">
        <h2 class="page-title">All Documents</h2>
        {/* TODO: GH-2 — Enable CSV export when backend endpoint is ready */}
        <button class="btn btn-primary" disabled title="Export coming soon">
          Export CSV
        </button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Version</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.title}</td>
              <td>{doc.category}</td>
              <td>{doc.version}</td>
              <td>
                <span class={`badge ${statusBadge[doc.status] || 'badge-gray'}`}>
                  {doc.status}
                </span>
              </td>
              <td>{doc.createdBy}</td>
              <td>{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
