export interface Customer {
  id: number;
  name: string;
  email: string;
  organizationNumber: string;
  createdAt: string;
  isDeleted: boolean;
}

export interface CustomerExportResponse {
  url: string;
  rowCount: number;
  truncated: boolean;
}
