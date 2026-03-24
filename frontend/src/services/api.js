const BASE = '/api/v2';

async function fetchJson(url, signal) {
  const res = await fetch(`${BASE}${url}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const documentApi = {
  getAll: (signal) => fetchJson('/documents', signal),
  getById: (id) => fetchJson(`/documents/${id}`),
  // TODO: GH-2 — uncomment when export is ready
  // exportCsv: () => fetch(`${BASE}/documents/export`).then(r => r.text()),
};

export const deviationApi = {
  getAll: (signal) => fetchJson('/deviations', signal),
  getById: (id) => fetchJson(`/deviations/${id}`),
};

export const auditApi = {
  getAll: (signal) => fetchJson('/audits', signal),
  getById: (id) => fetchJson(`/audits/${id}`),
};

export const caseApi = {
  getAll: (signal) => fetchJson('/cases', signal),
  getById: (id) => fetchJson(`/cases/${id}`),
};

export const userApi = {
  getAll: (signal) => fetchJson('/users', signal),
  getById: (id) => fetchJson(`/users/${id}`),
};
