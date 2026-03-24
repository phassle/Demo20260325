import { useApiData } from '../hooks/useApiData';
import { userApi } from '../services/api';

const roleBadge = {
  Admin: 'badge-glow-violet',
  QualityManager: 'badge-glow-violet',
  Auditor: 'badge-glow-violet',
  Viewer: 'badge-glow-gray',
};

export function UsersPage() {
  const { data, loading, error } = useApiData(userApi.getAll);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">All Users</h2>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${roleBadge[user.role] || 'badge-glow-gray'}`}>
                  {user.role}
                </span>
              </td>
              <td>{user.department}</td>
              <td>
                <span className={`status-dot ${user.isActive ? 'status-active' : 'status-inactive'}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
