export type RecipientCategory = 'Government agency' | 'Foundations' | 'Schools' | 'Non profit organisations';

export type DeliverableStatus = 'Pending' | 'Under Review' | 'Verified' | 'Delayed';

export interface Deliverable {
  id: string;
  grantId: string;
  title: string;
  description: string;
  metricLabel: string;
  targetMetric: number;
  currentMetric: number;
  metricUnit: string;
  deadline: string;
  verifiedAt?: string;
  status: DeliverableStatus;
  evidenceNotes?: string;
  proofFileName?: string;
}

export interface Disbursement {
  id: string;
  grantId: string;
  trancheNumber: number;
  amount: number;
  scheduledDate: string;
  disbursedDate?: string;
  isDisbursed: boolean;
  purpose: string;
  contingentDeliverableId?: string;
}

export interface SGXImpactMetrics {
  primarySdg: string; // e.g. "SDG 4: Quality Education"
  esgCategory: 'Social Impact' | 'Environmental Sustainability' | 'Governance & Compliance';
  beneficiariesCount: number;
  co2OffsetTonnes?: number;
  jobsOrScholarsSupported?: number;
  reportingYear: number;
  sgxCoreMetricCode: string; // e.g. "SGX-SOC-02"
}

export interface Grant {
  id: string;
  code: string;
  title: string;
  funderName: string;
  recipientName: string;
  category: RecipientCategory;
  totalApprovedBudget: number;
  disbursedAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  efficacyRating: number; // 0 - 100
  status: 'Active' | 'Under Review' | 'Completed' | 'Pending Disbursement';
  description: string;
  deliverables: Deliverable[];
  disbursements: Disbursement[];
  sgxMetrics: SGXImpactMetrics;
}
