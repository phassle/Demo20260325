import { useApiData } from '../hooks/useApiData';
import { userApi } from '../services/api';

const roleBadge = {
  Admin: 'badge-red',
  QualityManager: 'badge-blue',
  Auditor: 'badge-yellow',
  Viewer: 'badge-gray',
};

export function UsersPage() {
  const { data, loading, error } = useApiData(userApi.getAll);

  if (loading) return <div class="loading">Loading users...</div>;
  if (error) return <div class="error">Error: {error}</div>;

  return (
    <div>
      <div class="page-header">
        <h2 class="page-title">All Users</h2>
      </div>
      <table class="data-table">
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
                <span class={`badge ${roleBadge[user.role] || 'badge-gray'}`}>
                  {user.role}
                </span>
              </td>
              <td>{user.department}</td>
              <td>
                <span class={`status-dot ${user.isActive ? 'status-active' : 'status-inactive'}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
