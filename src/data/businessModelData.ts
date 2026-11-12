export interface SubscriptionTier {
  id: string;
  name: string;
  targetAudience: string;
  priceMonthly: number;
  priceAnnual: number;
  grantVolumeLimit: string;
  features: string[];
  recommended?: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'starter',
    name: 'Foundation Essentials',
    targetAudience: 'For family offices & emerging non-profits',
    priceMonthly: 850,
    priceAnnual: 8160,
    grantVolumeLimit: 'Up to 15 active grants / yr',
    features: [
      'Consolidated view of grant metrics',
      'Deliverable milestone tracking',
      'Automated reminder emails to grantees',
      'Basic quarterly PDF export',
      'Standard email support'
    ]
  },
  {
    id: 'growth',
    name: 'Impact Enterprise',
    targetAudience: 'For institutional foundations & government agencies',
    priceMonthly: 2400,
    priceAnnual: 23040,
    grantVolumeLimit: 'Up to 80 active grants / yr',
    recommended: true,
    features: [
      'Everything in Foundation Essentials',
      'SGX Core ESG & GRI sustainability generator',
      'Multi-stage milestone verification workflows',
      'Automated accounting system connector',
      'Role-based permissions (Funder, Auditor, Grantee)',
      'Direct government agency network integration'
    ]
  },
  {
    id: 'sovereign',
    name: 'Government & Conglomerate',
    targetAudience: 'For statutory boards, large funds & public listed issuers',
    priceMonthly: 5800,
    priceAnnual: 55680,
    grantVolumeLimit: 'Unlimited grants & multi-entity portfolios',
    features: [
      'Everything in Impact Enterprise',
      'Custom SGX & TCFD board reporting templates',
      'Dedicated compliance advisor consultation',
      'Private cloud / sovereign data isolation (SG / ASEAN)',
      '24/7 Priority technical SLA & phone support',
      'Custom ERP & payment gateway disbursements'
    ]
  }
];

export const PAID_ADDONS = [
  {
    id: 'addon-custom-sgx',
    name: 'Custom SGX ESG Board Template Studio',
    category: 'Customization',
    price: 3200,
    type: 'one-time',
    description: 'Bespoke design aligned to company corporate identity and board presentation deck standards.'
  },
  {
    id: 'addon-onboarding',
    name: 'White-Glove Grantee Onboarding & Workshop',
    category: 'Onboarding fee',
    price: 1800,
    type: 'one-time',
    description: 'Hands-on training for up to 30 partner NGOs and schools, ensuring 100% first-month compliance.'
  },
  {
    id: 'addon-audit-vault',
    name: 'Immutable Audit Vault & Cryptographic Timestamping',
    category: 'Paid add ons',
    price: 450,
    type: 'monthly',
    description: 'Hardware security module (HSM) backed audit hash log for forensic reporting compliance.'
  },
  {
    id: 'addon-tech-sla',
    name: 'Dedicated Technical Account Manager & SLA (2h response)',
    category: 'technical support',
    price: 1200,
    type: 'monthly',
    description: 'Named senior solutions engineer available for live grant distribution cycles and board deadlines.'
  }
];

export const COST_BREAKDOWN = [
  {
    category: 'Cloud hosting and security',
    monthlyExpenseSGD: 3800,
    percentage: 32,
    description: 'High-availability Kubernetes cluster, encrypted data storage, multi-zone backups, and DDoS mitigation.'
  },
  {
    category: 'Sales and marketing',
    monthlyExpenseSGD: 4500,
    percentage: 38,
    description: 'Direct enterprise sales to foundations, government partner events, content marketing, and user referral programs.'
  },
  {
    category: 'Legal and compliance',
    monthlyExpenseSGD: 3600,
    percentage: 30,
    description: 'SGX regulatory advisor retainer, PDPA data privacy compliance audits, and grant agreement verification.'
  }
];
