import { Link } from 'react-router-dom';
import { useApiData } from '../hooks/useApiData';
import { documentApi, deviationApi, auditApi, caseApi } from '../services/api';

export function DashboardPage() {
  const docs = useApiData(documentApi.getAll);
  const devs = useApiData(deviationApi.getAll);
  const audits = useApiData(auditApi.getAll);
  const cases = useApiData(caseApi.getAll);

  const openDeviations = devs.data
    ? devs.data.filter((d) => d.status === 'Open' || d.status === 'InProgress').length
    : 0;

  const pendingAudits = audits.data
    ? audits.data.filter((a) => a.status === 'Planned').length
    : 0;

  const totalDocuments = docs.data ? docs.data.length : 0;

  const activeCases = cases.data
    ? cases.data.filter((c) => c.status === 'Open' || c.status === 'InProgress').length
    : 0;

  const criticalDeviations = devs.data
    ? devs.data.filter((d) => d.severity === 'Critical' || d.severity === 'High').length
    : 0;

  const anyLoading = docs.loading || devs.loading || audits.loading || cases.loading;
  const anyError = docs.error || devs.error || audits.error || cases.error;

  if (anyLoading) return <div className="loading">Loading dashboard...</div>;
  if (anyError) return <div className="error">Error loading data: {anyError}</div>;

  return (
    <div>
      <div className="dashboard-grid">
        <div className="card kpi-card">
          <div className="card-title">Open Deviations</div>
          <div className="card-value">{openDeviations}</div>
        </div>
        <div className="card kpi-card">
          <div className="card-title">Pending Audits</div>
          <div className="card-value">{pendingAudits}</div>
        </div>
        <div className="card kpi-card">
          <div className="card-title">Total Documents</div>
          <div className="card-value">{totalDocuments}</div>
        </div>
        <div className="card kpi-card">
          <div className="card-title">Active Cases</div>
          <div className="card-value">{activeCases}</div>
        </div>
        <div className="card kpi-card">
          <div className="card-title">Critical / High Deviations</div>
          <div className="card-value">{criticalDeviations}</div>
        </div>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/deviations" className="btn btn-primary btn-gradient radius-lg">View All Deviations</Link>
      </div>
    </div>
  );
}
