import { CanvasNote, CanvasSection } from '../types/canvas';

export const CANVAS_BANNER_TEXT =
  'Grant Tracker : A web/app service that helps organisations that donates funds to monitor the efficacy of the funds for reporting purposes.';

export const CANVAS_SECTIONS: CanvasSection[] = [
  {
    id: 'key_partners',
    title: 'Key partners',
    promptQuestion: 'What are your key partners to get competitive advantage?',
    defaultColor: 'blue',
    gridArea: 'partners',
    description: 'Alliances that optimize operations and reduce business risks.'
  },
  {
    id: 'key_activities',
    title: 'Key activities',
    promptQuestion: 'What are the key steps to move ahead to your customers?',
    defaultColor: 'light-blue',
    gridArea: 'activities',
    description: 'Most crucial operational actions needed to deliver value.'
  },
  {
    id: 'key_resources',
    title: 'Key resources',
    promptQuestion: 'What resources do you need to make your idea work?',
    defaultColor: 'blue',
    gridArea: 'resources',
    description: 'Strategic assets, talent, technology, and capital required.'
  },
  {
    id: 'key_propositions',
    title: 'Key propositions',
    promptQuestion: "How will you make your customers' life happier?",
    defaultColor: 'yellow',
    gridArea: 'propositions',
    description: 'The bundle of products and services creating customer value.'
  },
  {
    id: 'customer_relationships',
    title: 'Customer relationships',
    promptQuestion: 'How often will you interact with your customers?',
    defaultColor: 'orange',
    gridArea: 'relationships',
    description: 'Types of relationships established with customer segments.'
  },
  {
    id: 'channels',
    title: 'Channels',
    promptQuestion: 'How are you going to reach your customers?',
    defaultColor: 'orange',
    gridArea: 'channels',
    description: 'How the organization communicates and reaches customer segments.'
  },
  {
    id: 'customer_segments',
    title: 'Customer segments',
    promptQuestion: 'Who are your customers? Describe your target audience in a couple of words.',
    defaultColor: 'yellow',
    gridArea: 'segments',
    description: 'The organizations and institutions the service aims to serve.'
  },
  {
    id: 'cost_structure',
    title: 'Cost Structure',
    promptQuestion: 'How much are you planning to spend on the product development and marketing for a certain period?',
    defaultColor: 'green',
    gridArea: 'costs',
    description: 'All major operational, legal, and engineering cost drivers.'
  },
  {
    id: 'revenue_streams',
    title: 'Revenue Streams',
    promptQuestion: 'How much are you planning to earn in a certain period? Compare your costs and revenues.',
    defaultColor: 'light-green',
    gridArea: 'revenues',
    description: 'The cash generated from each customer segment and add-on.'
  }
];

export const INITIAL_CANVAS_NOTES: CanvasNote[] = [
  // Key Partners
  {
    id: 'note-p1',
    sectionId: 'key_partners',
    text: 'Government agencies',
    color: 'blue',
    tilt: 'tilt-1',
    votes: { cyan: 2, green: 3 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-p2',
    sectionId: 'key_partners',
    text: 'cloud services',
    color: 'blue',
    tilt: 'tilt-2',
    votes: { cyan: 1, green: 1 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-p3',
    sectionId: 'key_partners',
    text: 'Compliance advisors',
    color: 'blue',
    tilt: 'tilt-3',
    votes: { cyan: 3, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-p4',
    sectionId: 'key_partners',
    text: 'Accounting systems/partners',
    color: 'blue',
    tilt: 'tilt-1',
    votes: { cyan: 1, green: 2 },
    createdAt: '2026-03-01'
  },

  // Key Activities
  {
    id: 'note-a1',
    sectionId: 'key_activities',
    text: 'Buidling and maintaining the product',
    color: 'light-blue',
    tilt: 'tilt-2',
    votes: { cyan: 2, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-a2',
    sectionId: 'key_activities',
    text: 'Data security',
    color: 'light-blue',
    tilt: 'tilt-3',
    votes: { cyan: 4, green: 3 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-a3',
    sectionId: 'key_activities',
    text: 'Sales, marketing, onboarding, customer support',
    color: 'light-blue',
    tilt: 'tilt-1',
    votes: { cyan: 1, green: 1 },
    createdAt: '2026-03-01'
  },

  // Key Resources
  {
    id: 'note-r1',
    sectionId: 'key_resources',
    text: 'Continuous development of platform and services',
    color: 'blue',
    tilt: 'tilt-1',
    votes: { cyan: 1, green: 1 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-r2',
    sectionId: 'key_resources',
    text: 'Physical assets (servers, computers, high speed Internet connection)',
    color: 'blue',
    tilt: 'tilt-2',
    votes: { cyan: 0, green: 1 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-r3',
    sectionId: 'key_resources',
    text: 'Cloud infrastructure',
    color: 'blue',
    tilt: 'tilt-3',
    votes: { cyan: 2, green: 1 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-r4',
    sectionId: 'key_resources',
    text: 'Data storage, compliance, security',
    color: 'blue',
    tilt: 'tilt-1',
    votes: { cyan: 3, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-r5',
    sectionId: 'key_resources',
    text: 'Domain expertise in grants, education, non-profit, finance',
    color: 'blue',
    tilt: 'tilt-2',
    votes: { cyan: 3, green: 4 },
    createdAt: '2026-03-01'
  },

  // Key Propositions (Value Propositions)
  {
    id: 'note-vp1',
    sectionId: 'key_propositions',
    text: 'reduce the manual tracking',
    color: 'yellow',
    tilt: 'tilt-1',
    votes: { cyan: 4, green: 3 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-vp2',
    sectionId: 'key_propositions',
    text: 'Faster disbursement of information',
    color: 'yellow',
    tilt: 'tilt-2',
    votes: { cyan: 3, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-vp3',
    sectionId: 'key_propositions',
    text: 'One consolidated view of key information',
    color: 'yellow',
    tilt: 'tilt-3',
    votes: { cyan: 5, green: 4 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-vp4',
    sectionId: 'key_propositions',
    text: 'Reduce human errors',
    color: 'yellow',
    tilt: 'tilt-1',
    votes: { cyan: 2, green: 3 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-vp5',
    sectionId: 'key_propositions',
    text: 'Track budget and outcome efficiently',
    color: 'yellow',
    tilt: 'tilt-2',
    votes: { cyan: 4, green: 5 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-vp6',
    sectionId: 'key_propositions',
    text: 'record of deliverables',
    color: 'yellow',
    tilt: 'tilt-3',
    votes: { cyan: 3, green: 3 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-vp7',
    sectionId: 'key_propositions',
    text: 'track on the use of grant',
    color: 'yellow',
    tilt: 'tilt-1',
    votes: { cyan: 2, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-vp8',
    sectionId: 'key_propositions',
    text: 'Board reports + Sustainability reports for SGX companies : PR + monitor impact',
    color: 'yellow',
    tilt: 'tilt-2',
    votes: { cyan: 6, green: 5 },
    createdAt: '2026-03-01'
  },

  // Customer Relationships
  {
    id: 'note-cr1',
    sectionId: 'customer_relationships',
    text: 'monthly',
    color: 'orange',
    tilt: 'tilt-1',
    votes: { cyan: 1, green: 0 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-cr2',
    sectionId: 'customer_relationships',
    text: 'Initial onboarding',
    color: 'orange',
    tilt: 'tilt-2',
    votes: { cyan: 2, green: 1 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-cr3',
    sectionId: 'customer_relationships',
    text: 'Self-service chatbot',
    color: 'orange',
    tilt: 'tilt-3',
    votes: { cyan: 3, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-cr4',
    sectionId: 'customer_relationships',
    text: 'User community for best practices',
    color: 'orange',
    tilt: 'tilt-1',
    votes: { cyan: 2, green: 3 },
    createdAt: '2026-03-01'
  },

  // Channels
  {
    id: 'note-ch1',
    sectionId: 'channels',
    text: 'Direct: homepage',
    color: 'orange',
    tilt: 'tilt-1',
    votes: { cyan: 2, green: 1 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-ch2',
    sectionId: 'channels',
    text: 'Indirect: referral through users',
    color: 'orange',
    tilt: 'tilt-2',
    votes: { cyan: 3, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-ch3',
    sectionId: 'channels',
    text: 'Government agency network',
    color: 'orange',
    tilt: 'tilt-3',
    votes: { cyan: 4, green: 3 },
    createdAt: '2026-03-01'
  },

  // Customer Segments
  {
    id: 'note-cs1',
    sectionId: 'customer_segments',
    text: 'Government agencies',
    color: 'yellow',
    tilt: 'tilt-1',
    votes: { cyan: 3, green: 4 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-cs2',
    sectionId: 'customer_segments',
    text: 'Foundations',
    color: 'yellow',
    tilt: 'tilt-2',
    votes: { cyan: 4, green: 3 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-cs3',
    sectionId: 'customer_segments',
    text: 'Schools',
    color: 'yellow',
    tilt: 'tilt-3',
    votes: { cyan: 2, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-cs4',
    sectionId: 'customer_segments',
    text: 'Non profit organisations',
    color: 'yellow',
    tilt: 'tilt-1',
    votes: { cyan: 4, green: 4 },
    createdAt: '2026-03-01'
  },

  // Cost Structure
  {
    id: 'note-cost1',
    sectionId: 'cost_structure',
    text: 'Cloud hosting and security',
    color: 'green',
    tilt: 'tilt-1',
    votes: { cyan: 2, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-cost2',
    sectionId: 'cost_structure',
    text: 'Sales and marketing',
    color: 'green',
    tilt: 'tilt-2',
    votes: { cyan: 1, green: 1 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-cost3',
    sectionId: 'cost_structure',
    text: 'Legal and compliance',
    color: 'green',
    tilt: 'tilt-3',
    votes: { cyan: 3, green: 3 },
    createdAt: '2026-03-01'
  },

  // Revenue Streams
  {
    id: 'note-rev1',
    sectionId: 'revenue_streams',
    text: 'tier-subscription',
    color: 'light-green',
    tilt: 'tilt-1',
    votes: { cyan: 3, green: 4 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-rev2',
    sectionId: 'revenue_streams',
    text: 'Paid add ons, customization',
    color: 'light-green',
    tilt: 'tilt-2',
    votes: { cyan: 2, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-rev3',
    sectionId: 'revenue_streams',
    text: 'Onboarding fee',
    color: 'light-green',
    tilt: 'tilt-3',
    votes: { cyan: 1, green: 2 },
    createdAt: '2026-03-01'
  },
  {
    id: 'note-rev4',
    sectionId: 'revenue_streams',
    text: 'technical support',
    color: 'light-green',
    tilt: 'tilt-1',
    votes: { cyan: 2, green: 1 },
    createdAt: '2026-03-01'
  }
];
