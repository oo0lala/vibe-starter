import { Grant } from '../types/grant';

export const SAMPLE_GRANTS: Grant[] = [
  {
    id: 'grant-001',
    code: 'SGX-CSR-2026-08',
    title: 'STEM & Digital Skills Uplift for Low-Income Students',
    funderName: 'SingCapital ESG Foundation (SGX Listed)',
    recipientName: 'Reach Youth & Education Services',
    category: 'Schools',
    totalApprovedBudget: 480000,
    disbursedAmount: 320000,
    currency: 'SGD',
    startDate: '2026-01-15',
    endDate: '2026-12-31',
    efficacyRating: 94,
    status: 'Active',
    description:
      'Multi-school digital equity project providing Chromebooks, certified coding bootcamps, and mentor stipends to 650 students across 12 neighborhood secondary schools.',
    sgxMetrics: {
      primarySdg: 'SDG 4: Quality Education',
      esgCategory: 'Social Impact',
      beneficiariesCount: 650,
      jobsOrScholarsSupported: 45,
      reportingYear: 2026,
      sgxCoreMetricCode: 'SGX-SOC-03'
    },
    deliverables: [
      {
        id: 'del-01',
        grantId: 'grant-001',
        title: 'Hardware Procurement & Setup in 12 Partner Schools',
        description: 'Delivery and configuration of 650 MDM-managed learning devices.',
        metricLabel: 'Hardware units active',
        targetMetric: 650,
        currentMetric: 650,
        metricUnit: 'devices',
        deadline: '2026-02-28',
        verifiedAt: '2026-02-26',
        status: 'Verified',
        evidenceNotes: 'Signed delivery orders from 12 school vice-principals and IT asset registry hash verified.',
        proofFileName: 'delivery_manifest_q1_singapore_cluster.pdf'
      },
      {
        id: 'del-02',
        grantId: 'grant-001',
        title: 'Curriculum Completion Rate (Milestone 2)',
        description: 'Students achieving certified pass in Python & Web basics module.',
        metricLabel: 'Students Certified',
        targetMetric: 500,
        currentMetric: 432,
        metricUnit: 'students',
        deadline: '2026-06-30',
        verifiedAt: '2026-06-28',
        status: 'Verified',
        evidenceNotes: 'Assessment gradebook synced via Ministry LMS connector; verified by external audit.',
        proofFileName: 'q2_accreditation_audit_grades.xlsx'
      },
      {
        id: 'del-03',
        grantId: 'grant-001',
        title: 'Industry Mentorship Sessions & Hackathon',
        description: 'Structured corporate volunteer mentorship hours delivered by funder staff.',
        metricLabel: 'Mentorship Hours Logged',
        targetMetric: 1200,
        currentMetric: 980,
        metricUnit: 'hours',
        deadline: '2026-10-31',
        status: 'Under Review',
        evidenceNotes: 'Corporate volunteer timesheets awaiting final Q3 coordinator signoff.',
        proofFileName: 'volunteer_attendance_sept2026.pdf'
      },
      {
        id: 'del-04',
        grantId: 'grant-001',
        title: 'Post-Program Efficacy & Earning Trajectory Survey',
        description: 'Independent evaluation report measuring academic confidence and internship placement.',
        metricLabel: 'Response & Efficacy Index',
        targetMetric: 100,
        currentMetric: 0,
        metricUnit: '% completed',
        deadline: '2026-12-15',
        status: 'Pending',
        evidenceNotes: 'Survey instruments prepared; dispatch scheduled after final exams.'
      }
    ],
    disbursements: [
      {
        id: 'disb-01',
        grantId: 'grant-001',
        trancheNumber: 1,
        amount: 160000,
        scheduledDate: '2026-01-20',
        disbursedDate: '2026-01-22',
        isDisbursed: true,
        purpose: 'Mobilization & bulk hardware acquisition',
        contingentDeliverableId: 'del-01'
      },
      {
        id: 'disb-02',
        grantId: 'grant-001',
        trancheNumber: 2,
        amount: 160000,
        scheduledDate: '2026-07-01',
        disbursedDate: '2026-07-05',
        isDisbursed: true,
        purpose: 'Instructor payroll & mid-term learning licenses',
        contingentDeliverableId: 'del-02'
      },
      {
        id: 'disb-03',
        grantId: 'grant-001',
        trancheNumber: 3,
        amount: 160000,
        scheduledDate: '2026-11-15',
        isDisbursed: false,
        purpose: 'Final hackathon prizes, mentor recognition, and audit closure',
        contingentDeliverableId: 'del-03'
      }
    ]
  },
  {
    id: 'grant-002',
    code: 'GOV-COMM-2026-14',
    title: 'Elderly Mobility & Preventive Care Tech Deployment',
    funderName: 'Municipal Community Development Council',
    recipientName: 'SilverCare Integrated Wellbeing Network',
    category: 'Government agency',
    totalApprovedBudget: 750000,
    disbursedAmount: 500000,
    currency: 'SGD',
    startDate: '2025-11-01',
    endDate: '2026-11-30',
    efficacyRating: 91,
    status: 'Active',
    description:
      'Deployment of IoT sensor pads, smart walking aids, and community nurse visitation tracking for 1,400 vulnerable seniors living alone.',
    sgxMetrics: {
      primarySdg: 'SDG 3: Good Health and Well-Being',
      esgCategory: 'Social Impact',
      beneficiariesCount: 1420,
      reportingYear: 2026,
      sgxCoreMetricCode: 'SGX-SOC-01'
    },
    deliverables: [
      {
        id: 'del-21',
        grantId: 'grant-002',
        title: 'IoT Telecare Sensor Installation in 1,200 Households',
        description: 'Safe home installation with biometric privacy safeguards.',
        metricLabel: 'Units Installed',
        targetMetric: 1200,
        currentMetric: 1240,
        metricUnit: 'homes',
        deadline: '2026-03-31',
        verifiedAt: '2026-03-29',
        status: 'Verified',
        evidenceNotes: 'Smart sensor telemetry ping heartbeat active 99.4% uptime.',
        proofFileName: 'telecare_device_audit_report.pdf'
      },
      {
        id: 'del-22',
        grantId: 'grant-002',
        title: 'Reduction in Emergency Room Admissions',
        description: 'Demonstrating at least 25% drop in fall-related acute hospital admissions.',
        metricLabel: 'Hospital Fall Reduction',
        targetMetric: 25,
        currentMetric: 28.4,
        metricUnit: '% drop',
        deadline: '2026-08-31',
        verifiedAt: '2026-08-25',
        status: 'Verified',
        evidenceNotes: 'Public hospital cluster quarterly retrospective discharge data verified.',
        proofFileName: 'hospital_cluster_health_data_signed.pdf'
      },
      {
        id: 'del-23',
        grantId: 'grant-002',
        title: 'Community Nurse Regular Check-ins',
        description: 'Conducting bi-weekly preventive screenings for frail cohort.',
        metricLabel: 'In-person Checkups',
        targetMetric: 5000,
        currentMetric: 4620,
        metricUnit: 'visits',
        deadline: '2026-11-15',
        status: 'Under Review',
        evidenceNotes: 'Mobile clinical nursing logs synced to electronic medical ledger.'
      }
    ],
    disbursements: [
      {
        id: 'disb-21',
        grantId: 'grant-002',
        trancheNumber: 1,
        amount: 250000,
        scheduledDate: '2025-11-15',
        disbursedDate: '2025-11-18',
        isDisbursed: true,
        purpose: 'IoT hardware batch procurement'
      },
      {
        id: 'disb-22',
        grantId: 'grant-002',
        trancheNumber: 2,
        amount: 250000,
        scheduledDate: '2026-04-15',
        disbursedDate: '2026-04-18',
        isDisbursed: true,
        purpose: 'Nurse clinical staffing & telehealth server operations'
      },
      {
        id: 'disb-23',
        grantId: 'grant-002',
        trancheNumber: 3,
        amount: 250000,
        scheduledDate: '2026-10-01',
        isDisbursed: false,
        purpose: 'Phase 3 expansion and governance compliance wrap'
      }
    ]
  },
  {
    id: 'grant-003',
    code: 'FND-GREEN-2026-03',
    title: 'Urban Food Security & Community Micro-Farming Hubs',
    funderName: 'Apex Philanthropy Foundation',
    recipientName: 'CleanEarth Community Alliance',
    category: 'Non profit organisations',
    totalApprovedBudget: 350000,
    disbursedAmount: 350000,
    currency: 'SGD',
    startDate: '2025-06-01',
    endDate: '2026-05-31',
    efficacyRating: 98,
    status: 'Completed',
    description:
      'Conversion of underutilized rooftop spaces into 6 community hydroponic and aquaponic micro-farms, yielding fresh greens for soup kitchens.',
    sgxMetrics: {
      primarySdg: 'SDG 2: Zero Hunger & SDG 11: Sustainable Cities',
      esgCategory: 'Environmental Sustainability',
      beneficiariesCount: 3800,
      co2OffsetTonnes: 14.8,
      reportingYear: 2026,
      sgxCoreMetricCode: 'SGX-ENV-04'
    },
    deliverables: [
      {
        id: 'del-31',
        grantId: 'grant-003',
        title: '6 Rooftop Farms Operational & Certified',
        description: 'Completion of structural load approvals and automated irrigation installation.',
        metricLabel: 'Active Rooftop Farms',
        targetMetric: 6,
        currentMetric: 6,
        metricUnit: 'farms',
        deadline: '2025-09-30',
        verifiedAt: '2025-09-24',
        status: 'Verified',
        evidenceNotes: 'BCA structural engineers permit and green mark certificates filed.',
        proofFileName: 'structural_clearance_rooftops_1to6.pdf'
      },
      {
        id: 'del-32',
        grantId: 'grant-003',
        title: 'Produce Harvested & Distributed to Soup Kitchens',
        description: 'Cumulative monthly yield of organic leafy vegetables.',
        metricLabel: 'Fresh Produce Donated',
        targetMetric: 12000,
        currentMetric: 13450,
        metricUnit: 'kg',
        deadline: '2026-05-15',
        verifiedAt: '2026-05-12',
        status: 'Verified',
        evidenceNotes: 'Weight receipts from Willing Hearts and Food Bank Singapore signed.',
        proofFileName: 'food_bank_produce_acknowledgements.pdf'
      }
    ],
    disbursements: [
      {
        id: 'disb-31',
        grantId: 'grant-003',
        trancheNumber: 1,
        amount: 150000,
        scheduledDate: '2025-06-15',
        disbursedDate: '2025-06-15',
        isDisbursed: true,
        purpose: 'Farming infrastructure & solar-powered pumps'
      },
      {
        id: 'disb-32',
        grantId: 'grant-003',
        trancheNumber: 2,
        amount: 120000,
        scheduledDate: '2025-10-15',
        disbursedDate: '2025-10-16',
        isDisbursed: true,
        purpose: 'Seedlings, agricultural agronomist training & soil testing'
      },
      {
        id: 'disb-33',
        grantId: 'grant-003',
        trancheNumber: 3,
        amount: 80000,
        scheduledDate: '2026-04-15',
        disbursedDate: '2026-04-20',
        isDisbursed: true,
        purpose: 'Final impact audit, SGX disclosure metrics, and community festival'
      }
    ]
  },
  {
    id: 'grant-004',
    code: 'FND-EDU-2026-22',
    title: 'Neurodiversity Inclusion in Primary Classrooms',
    funderName: 'Temasek Life Sciences Trust & Donors',
    recipientName: 'Autism & Learning Diversity Association',
    category: 'Foundations',
    totalApprovedBudget: 620000,
    disbursedAmount: 200000,
    currency: 'SGD',
    startDate: '2026-03-01',
    endDate: '2027-02-28',
    efficacyRating: 88,
    status: 'Pending Disbursement',
    description:
      'Sensory-friendly toolkits, certified teacher shadow assistants, and speech therapy vouchers deployed across 20 primary schools.',
    sgxMetrics: {
      primarySdg: 'SDG 10: Reduced Inequalities',
      esgCategory: 'Social Impact',
      beneficiariesCount: 420,
      reportingYear: 2026,
      sgxCoreMetricCode: 'SGX-SOC-04'
    },
    deliverables: [
      {
        id: 'del-41',
        grantId: 'grant-004',
        title: 'Specialized Educator Certification Cohort 1',
        description: 'Training 40 allied educators in sensory de-escalation protocols.',
        metricLabel: 'Educators Trained',
        targetMetric: 40,
        currentMetric: 40,
        metricUnit: 'educators',
        deadline: '2026-05-30',
        verifiedAt: '2026-05-28',
        status: 'Verified',
        evidenceNotes: 'NIE trainer signed attendance and assessment rubrics.',
        proofFileName: 'nie_certifications_cohort_1.pdf'
      },
      {
        id: 'del-42',
        grantId: 'grant-004',
        title: 'Classroom Sensory Calming Corners Setup',
        description: 'Installation of acoustic baffles, weighted vests, and tactile equipment.',
        metricLabel: 'Schools Equipped',
        targetMetric: 20,
        currentMetric: 14,
        metricUnit: 'schools',
        deadline: '2026-09-30',
        status: 'Under Review',
        evidenceNotes: '14 schools completed and inspected; final 6 in procurement.'
      }
    ],
    disbursements: [
      {
        id: 'disb-41',
        grantId: 'grant-004',
        trancheNumber: 1,
        amount: 200000,
        scheduledDate: '2026-03-10',
        disbursedDate: '2026-03-15',
        isDisbursed: true,
        purpose: 'Course curriculum development and trainer retainers'
      },
      {
        id: 'disb-42',
        grantId: 'grant-004',
        trancheNumber: 2,
        amount: 220000,
        scheduledDate: '2026-09-15',
        isDisbursed: false,
        purpose: 'Sensory furniture manufacturing and logistics (Awaiting Del-42 verification)'
      },
      {
        id: 'disb-43',
        grantId: 'grant-004',
        trancheNumber: 3,
        amount: 200000,
        scheduledDate: '2027-01-15',
        isDisbursed: false,
        purpose: 'Longitudinal child development outcomes & year-end SGX report'
      }
    ]
  }
];
