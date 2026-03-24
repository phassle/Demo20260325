import { useApiData } from '../hooks/useApiData';
import { documentApi } from '../services/api';

const statusBadge = {
  Draft: 'badge-glow-gray',
  InReview: 'badge-glow-yellow',
  Approved: 'badge-glow-green',
  Archived: 'badge-glow-red',
};

export function DocumentsPage() {
  const { data, loading, error } = useApiData(documentApi.getAll);

  if (loading) return <div className="loading">Loading documents...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">All Documents</h2>
        {/* TODO: GH-2 — Enable CSV export when backend endpoint is ready */}
        <button className="btn btn-primary btn-gradient radius-lg" disabled title="Export coming soon">
          Export CSV
        </button>
      </div>
      {data && data.length === 0 ? (
        <div className="empty-state surface-container">No documents found.</div>
      ) : (
        <>
          <table className="data-table tonal-table">
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
                    <span className={`badge ${statusBadge[doc.status] || 'badge-glow-gray'}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td>{doc.createdBy}</td>
                  <td>{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mobile-cards">
            {data && data.map((doc) => (
              <div key={doc.id} className="card mobile-card">
                <div className="card-title">{doc.title}</div>
                <div className="mobile-card-meta">
                  <span>{doc.category}</span>
                  <span>v{doc.version}</span>
                  <span className={`badge ${statusBadge[doc.status] || 'badge-glow-gray'}`}>{doc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
