export type Project = {
  slug: 'resume' | 'onboarding' | 'shipnote' | 'fixit' | 'leads';
  index: string;
  name: string;
  subtitle: string;
  category: string;
  problem: string;
  solution: string;
  tags: readonly string[];
  status: string;
  /** Existing working live/demo link (preserved from the original site). */
  href: string;
  hrefLabel: string;
  /** Public source repository, when one exists. */
  repo?: string;
};

export const projects: readonly Project[] = [
  {
    slug: 'resume', index: '01', name: 'AI Resume Analyzer', subtitle: 'A clearer way to review resumes.',
    category: 'AI & WORKFLOW DESIGN',
    problem: 'Reviewing resumes means sorting through large amounts of unstructured information.',
    solution: 'A focused tool that organizes resume insights into a more usable, consistent review experience.',
    tags: ['AI-assisted analysis', 'Information organization', 'Hiring workflows'],
    status: 'Live project', href: 'https://resume-analyzer-ai.netlify.app/', hrefLabel: 'Open the project',
    repo: 'https://github.com/BronzeMik/ai-resume-analyzer'
  },
  {
    slug: 'onboarding', index: '02', name: 'Microsoft 365 Employee Onboarding Automation', subtitle: 'Make day one feel effortless.',
    category: 'BUSINESS AUTOMATION',
    problem: 'Employee setup means repeating the same administrative steps across several systems.',
    solution: 'A standardized workflow that coordinates onboarding activities in a Microsoft environment.',
    tags: ['Microsoft ecosystem', 'Process automation', 'Employee experience'],
    status: 'Project showcase',
    href: 'https://zapier.com/templates/details/it-onboarding-automation-7dc1c7?secret=MTp0ZW1wbGF0ZTpGQU5LdFpoYTlybm9TeDFwRFI3UzZGRFNPdWVKVGRUTFFRNDVRaHFxeXZJOjZsZTI3Yg',
    hrefLabel: 'View the workflow'
  },
  {
    slug: 'shipnote', index: '03', name: 'ShipNote — Social Media Automation', subtitle: 'Make your work worth sharing.',
    category: 'PRODUCT & CONTENT WORKFLOWS',
    problem: 'Sharing progress consistently takes time away from building.',
    solution: 'A workspace that turns software project activity into a repeatable publishing workflow.',
    tags: ['Content workflow', 'Product design', 'GitHub integration'],
    status: 'In development', href: 'https://shipnote-app-bcy7.vercel.app/', hrefLabel: 'Open the project',
    repo: 'https://github.com/MikailaBrownTech/shipnote-app'
  },
  {
    slug: 'fixit', index: '04', name: 'FixIt AI — Repair Manual and Article Finder', subtitle: 'Find the right fix, faster.',
    category: 'AI & KNOWLEDGE ACCESS',
    problem: 'Useful repair guidance is scattered across manuals and websites.',
    solution: 'A search-focused experience that brings relevant repair resources into one place.',
    tags: ['AI-assisted search', 'Knowledge discovery', 'Repair workflows'],
    status: 'Project showcase', href: 'https://incident-report-app-lime.vercel.app/', hrefLabel: 'Open the project'
  },
  {
    slug: 'leads', index: '05', name: 'Automated Lead Finder, Scoring and Outreach Generator', subtitle: 'Better research. More relevant outreach.',
    category: 'SALES AUTOMATION',
    problem: 'Prospect research and first-draft outreach are slow and inconsistent.',
    solution: 'A structured workflow that collects company information, assesses fit, and prepares outreach drafts for human review.',
    tags: ['Lead research', 'Prospect scoring', 'Human-reviewed outreach'],
    status: 'Portfolio project', href: 'https://propossal-generator.vercel.app/login', hrefLabel: 'Open the project',
    repo: 'https://github.com/MikailaBrownTech/Auto-Lead-Score-and-Email-Generator'
  }
];

export const certifications = [
  { group: 'CompTIA', items: [
    { name: 'CompTIA A+', desc: 'IT support & troubleshooting', icon: 'wrench' },
    { name: 'CompTIA Network+', desc: 'Networking & infrastructure', icon: 'network' },
    { name: 'CompTIA Security+', desc: 'Cybersecurity fundamentals', icon: 'lock' },
    { name: 'CompTIA Project+', desc: 'IT project management', icon: 'clipboard' },
    { name: 'CompTIA Linux+', desc: 'Linux systems administration', icon: 'terminal' }
  ]},
  { group: 'Amazon Web Services', items: [
    { name: 'AWS Certified Cloud Practitioner', desc: 'AWS cloud fundamentals', icon: 'cloud' }
  ]},
  { group: 'ITIL', items: [
    { name: 'ITIL 4 Foundation', desc: 'IT service management', icon: 'cap' }
  ]}
] as const;
