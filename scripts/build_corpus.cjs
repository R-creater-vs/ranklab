const fs = require('fs');
const path = require('path');

const families = [
  { id: 'wifi-eduroam', topic: 'Campus Wireless Network', split: 'dev' },
  { id: 'vpn-globalprotect', topic: 'Remote Access VPN', split: 'dev' },
  { id: 'email-exchange', topic: 'University Email & Calendar', split: 'dev' },
  { id: 'password-sspr', topic: 'Account Security & Password', split: 'dev' },
  { id: 'print-papercut', topic: 'Campus Printing & Quotas', split: 'dev' },
  { id: 'lab-linux', topic: 'HPC & Linux Compute Labs', split: 'dev' },
  { id: 'mfa-duo', topic: 'Multi-Factor Authentication', split: 'dev' },
  { id: 'canvas-lms', topic: 'Canvas Learning Management', split: 'held-out' },
  { id: 'software-matlab', topic: 'Licensed Academic Software', split: 'held-out' },
  { id: 'dorm-ethernet', topic: 'Residential Network & Ethernet', split: 'held-out' },
  { id: 'library-proxy', topic: 'Library Proxy & Research Journals', split: 'held-out' },
  { id: 'account-guest', topic: 'Guest & Visitor Accounts', split: 'held-out' },
  { id: 'storage-onedrive', topic: 'Cloud Storage & Backups', split: 'held-out' },
  { id: 'zoom-virtual', topic: 'Video Conferencing & Classrooms', split: 'held-out' },
  { id: 'card-access', topic: 'Building & Lab Card Access', split: 'held-out' },
];

const documents = [];
let docCounter = 1;

for (const fam of families) {
  // Generate 8 documents per family = 15 * 8 = 120 documents
  // 1. Current canonical guide (v3.0)
  documents.push({
    docId: `doc-${String(docCounter++).padStart(3, '0')}`,
    familyId: fam.id,
    title: `Official Guide: Configuring ${fam.topic} (Current Standard)`,
    body: `Comprehensive step-by-step instructions for ${fam.topic}. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.`,
    version: '3.2',
    current: true,
    topic: fam.topic,
  });

  // 2. Near-duplicate mobile configuration
  documents.push({
    docId: `doc-${String(docCounter++).padStart(3, '0')}`,
    familyId: fam.id,
    title: `Mobile Setup for ${fam.topic} (iOS and Android)`,
    body: `How to install profiles, root certificates, and authenticator tokens for ${fam.topic} on smartphones and tablets. Requires your standard campus NetID credentials.`,
    version: '3.1',
    current: true,
    topic: fam.topic,
  });

  // 3. Troubleshooting & FAQ
  documents.push({
    docId: `doc-${String(docCounter++).padStart(3, '0')}`,
    familyId: fam.id,
    title: `Troubleshooting Common Connection Errors in ${fam.topic}`,
    body: `Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to ${fam.topic}. Check service status before contacting the helpdesk.`,
    version: '3.0',
    current: true,
    topic: fam.topic,
  });

  // 4. Obsolete legacy guide (v1.5)
  documents.push({
    docId: `doc-${String(docCounter++).padStart(3, '0')}`,
    familyId: fam.id,
    title: `[ARCHIVED] Legacy Instructions for ${fam.topic} (v1.5 Deprecated)`,
    body: `DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for ${fam.topic}. Retained strictly for legacy research systems and historical reference.`,
    version: '1.5',
    current: false,
    topic: fam.topic,
  });

  // 5. Advanced / Departmental policy
  documents.push({
    docId: `doc-${String(docCounter++).padStart(3, '0')}`,
    familyId: fam.id,
    title: `Departmental Admin Policies and Quota Limits for ${fam.topic}`,
    body: `Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for ${fam.topic}. Requires dean approval.`,
    version: '2.8',
    current: true,
    topic: fam.topic,
  });

  // 6. Security & Encryption specifications
  documents.push({
    docId: `doc-${String(docCounter++).padStart(3, '0')}`,
    familyId: fam.id,
    title: `Cryptographic Standards and Firewall Rules for ${fam.topic}`,
    body: `Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for ${fam.topic}. Technical reference for IT system administrators.`,
    version: '3.0',
    current: true,
    topic: fam.topic,
  });

  // 7. Quick Start Cheat Sheet
  documents.push({
    docId: `doc-${String(docCounter++).padStart(3, '0')}`,
    familyId: fam.id,
    title: `Quick Reference Card: 3-Step Setup for ${fam.topic}`,
    body: `Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for ${fam.topic}. Get connected in under 2 minutes.`,
    version: '3.2',
    current: true,
    topic: fam.topic,
  });

  // 8. Obsolete configuration v2.0
  documents.push({
    docId: `doc-${String(docCounter++).padStart(3, '0')}`,
    familyId: fam.id,
    title: `[OBSOLETE] Previous Generation Configuration for ${fam.topic} (v2.0)`,
    body: `Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for ${fam.topic} are no longer supported by campus infrastructure.`,
    version: '2.0',
    current: false,
    topic: fam.topic,
  });
}

// 30 Queries: 15 dev, 15 held-out
const queries = [
  // DEV QUERIES (7 intent families)
  { queryId: 'q-01', text: 'connect to campus eduroam wifi', intentFamily: 'wifi-eduroam', split: 'dev' },
  { queryId: 'q-02', text: 'install eduroam root certificate iphone', intentFamily: 'wifi-eduroam', split: 'dev' },
  { queryId: 'q-03', text: 'globalprotect vpn connection timeout error', intentFamily: 'vpn-globalprotect', split: 'dev' },
  { queryId: 'q-04', text: 'download vpn client for macos', intentFamily: 'vpn-globalprotect', split: 'dev' },
  { queryId: 'q-05', text: 'setup university outlook email on phone', intentFamily: 'email-exchange', split: 'dev' },
  { queryId: 'q-06', text: 'request exchange mailbox storage quota increase', intentFamily: 'email-exchange', split: 'dev' },
  { queryId: 'q-07', text: 'reset expired student password self service', intentFamily: 'password-sspr', split: 'dev' },
  { queryId: 'q-08', text: 'security questions forgot netid password', intentFamily: 'password-sspr', split: 'dev' },
  { queryId: 'q-09', text: 'how to add money to papercut print balance', intentFamily: 'print-papercut', split: 'dev' },
  { queryId: 'q-10', text: 'library wireless web print printer locations', intentFamily: 'print-papercut', split: 'dev' },
  { queryId: 'q-11', text: 'ssh login to engineering linux lab cluster', intentFamily: 'lab-linux', split: 'dev' },
  { queryId: 'q-12', text: 'slurm batch job submit gpu cuda cluster', intentFamily: 'lab-linux', split: 'dev' },
  { queryId: 'q-13', text: 'setup duo mobile push notifications new phone', intentFamily: 'mfa-duo', split: 'dev' },
  { queryId: 'q-14', text: 'bypass codes duo two factor travel', intentFamily: 'mfa-duo', split: 'dev' },
  { queryId: 'q-15', text: 'wifi slow disconnects in library troubleshooting', intentFamily: 'wifi-eduroam', split: 'dev' },

  // HELD-OUT QUERIES (8 intent families)
  { queryId: 'q-16', text: 'canvas lms login submit course assignment', intentFamily: 'canvas-lms', split: 'held-out' },
  { queryId: 'q-17', text: 'canvas syllabus file upload instructor permissions', intentFamily: 'canvas-lms', split: 'held-out' },
  { queryId: 'q-18', text: 'matlab campus license activation mathworks account', intentFamily: 'software-matlab', split: 'held-out' },
  { queryId: 'q-19', text: 'matlab network license server connection error', intentFamily: 'software-matlab', split: 'held-out' },
  { queryId: 'q-20', text: 'register ethernet mac address dorm wall port', intentFamily: 'dorm-ethernet', split: 'held-out' },
  { queryId: 'q-21', text: 'gaming console nintendo switch wired internet dorm', intentFamily: 'dorm-ethernet', split: 'held-out' },
  { queryId: 'q-22', text: 'off campus research journal ezproxy login', intentFamily: 'library-proxy', split: 'held-out' },
  { queryId: 'q-23', text: 'google scholar link library subscription access', intentFamily: 'library-proxy', split: 'held-out' },
  { queryId: 'q-24', text: 'sponsor guest visitor wifi conference account', intentFamily: 'account-guest', split: 'held-out' },
  { queryId: 'q-25', text: 'contractor temporary campus netid request', intentFamily: 'account-guest', split: 'held-out' },
  { queryId: 'q-26', text: 'sync onedrive student files sharepoint permissions', intentFamily: 'storage-onedrive', split: 'held-out' },
  { queryId: 'q-27', text: 'onedrive quota full backup local folder', intentFamily: 'storage-onedrive', split: 'held-out' },
  { queryId: 'q-28', text: 'zoom sso login with university credentials', intentFamily: 'zoom-virtual', split: 'held-out' },
  { queryId: 'q-29', text: 'request large zoom webinar 500 participants license', intentFamily: 'zoom-virtual', split: 'held-out' },
  { queryId: 'q-30', text: 'campus id card access denied research lab door', intentFamily: 'card-access', split: 'held-out' },
];

// Initial Judgments with intentional unjudged gaps
// Each query has some clear relevant docs (1), non-relevant docs (0), and unjudged docs (null)
const judgments = [];

for (const q of queries) {
  // Find docs matching the family
  const familyDocs = documents.filter((d) => d.familyId === q.intentFamily);
  const otherDocs = documents.filter((d) => d.familyId !== q.intentFamily);

  // Current canonical and quickstart are definitely relevant (1)
  const canonical = familyDocs.find((d) => d.version === '3.2' && d.current);
  if (canonical) {
    judgments.push({
      queryId: q.queryId,
      docId: canonical.docId,
      relevance: 1,
      assessor: 'lead_annotator',
      rationale: 'Official current canonical guide matching query intent',
      revision: 1,
    });
  }

  // Obsolete v1.5 is explicitly non-relevant (0)
  const obsolete = familyDocs.find((d) => d.version === '1.5');
  if (obsolete) {
    judgments.push({
      queryId: q.queryId,
      docId: obsolete.docId,
      relevance: 0,
      assessor: 'lead_annotator',
      rationale: 'Obsolete legacy instructions are misleading and non-functional',
      revision: 1,
    });
  }

  // Troubleshooter doc is intentionally UNJUDGED (null) to create genuine missing-evidence envelopes!
  const troubleshooter = familyDocs.find((d) => d.version === '3.0' && d.title.includes('Troubleshooting'));
  if (troubleshooter) {
    judgments.push({
      queryId: q.queryId,
      docId: troubleshooter.docId,
      relevance: null,
      assessor: 'unassigned',
      rationale: 'Pending technical review on whether troubleshooting guide is sufficient answer',
      revision: 0,
    });
  }

  // Mobile setup is also UNJUDGED (null) for mobile-sensitive queries
  const mobile = familyDocs.find((d) => d.version === '3.1');
  if (mobile) {
    judgments.push({
      queryId: q.queryId,
      docId: mobile.docId,
      relevance: null,
      assessor: 'unassigned',
      rationale: 'Pending domain verification for mobile vs desktop scope',
      revision: 0,
    });
  }

  // Random off-topic document judged non-relevant (0)
  const offTopic = otherDocs[Math.floor(Math.random() * otherDocs.length)];
  judgments.push({
    queryId: q.queryId,
    docId: offTopic.docId,
    relevance: 0,
    assessor: 'lead_annotator',
    rationale: 'Completely different campus IT domain',
    revision: 1,
  });
}

const outContent = `import { Document, Query, Judgment } from './types';

export const CAMPUS_DOCUMENTS: Document[] = ${JSON.stringify(documents, null, 2)};

export const CAMPUS_QUERIES: Query[] = ${JSON.stringify(queries, null, 2)};

export const INITIAL_JUDGMENTS: Judgment[] = ${JSON.stringify(judgments, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/domain/corpus.ts'), outContent, 'utf8');
console.log(`Successfully generated corpus.ts with ${documents.length} documents, ${queries.length} queries, and ${judgments.length} judgments.`);
