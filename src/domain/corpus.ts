import type { Document, Query, Judgment } from './types.ts';

export const CAMPUS_DOCUMENTS: Document[] = [
  {
    "docId": "doc-001",
    "familyId": "wifi-eduroam",
    "title": "Official Guide: Configuring Campus Wireless Network (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Campus Wireless Network. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Campus Wireless Network"
  },
  {
    "docId": "doc-002",
    "familyId": "wifi-eduroam",
    "title": "Mobile Setup for Campus Wireless Network (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Campus Wireless Network on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Campus Wireless Network"
  },
  {
    "docId": "doc-003",
    "familyId": "wifi-eduroam",
    "title": "Troubleshooting Common Connection Errors in Campus Wireless Network",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Campus Wireless Network. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Campus Wireless Network"
  },
  {
    "docId": "doc-004",
    "familyId": "wifi-eduroam",
    "title": "[ARCHIVED] Legacy Instructions for Campus Wireless Network (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Campus Wireless Network. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Campus Wireless Network"
  },
  {
    "docId": "doc-005",
    "familyId": "wifi-eduroam",
    "title": "Departmental Admin Policies and Quota Limits for Campus Wireless Network",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Campus Wireless Network. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Campus Wireless Network"
  },
  {
    "docId": "doc-006",
    "familyId": "wifi-eduroam",
    "title": "Cryptographic Standards and Firewall Rules for Campus Wireless Network",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Campus Wireless Network. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Campus Wireless Network"
  },
  {
    "docId": "doc-007",
    "familyId": "wifi-eduroam",
    "title": "Quick Reference Card: 3-Step Setup for Campus Wireless Network",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Campus Wireless Network. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Campus Wireless Network"
  },
  {
    "docId": "doc-008",
    "familyId": "wifi-eduroam",
    "title": "[OBSOLETE] Previous Generation Configuration for Campus Wireless Network (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Campus Wireless Network are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Campus Wireless Network"
  },
  {
    "docId": "doc-009",
    "familyId": "vpn-globalprotect",
    "title": "Official Guide: Configuring Remote Access VPN (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Remote Access VPN. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Remote Access VPN"
  },
  {
    "docId": "doc-010",
    "familyId": "vpn-globalprotect",
    "title": "Mobile Setup for Remote Access VPN (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Remote Access VPN on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Remote Access VPN"
  },
  {
    "docId": "doc-011",
    "familyId": "vpn-globalprotect",
    "title": "Troubleshooting Common Connection Errors in Remote Access VPN",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Remote Access VPN. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Remote Access VPN"
  },
  {
    "docId": "doc-012",
    "familyId": "vpn-globalprotect",
    "title": "[ARCHIVED] Legacy Instructions for Remote Access VPN (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Remote Access VPN. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Remote Access VPN"
  },
  {
    "docId": "doc-013",
    "familyId": "vpn-globalprotect",
    "title": "Departmental Admin Policies and Quota Limits for Remote Access VPN",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Remote Access VPN. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Remote Access VPN"
  },
  {
    "docId": "doc-014",
    "familyId": "vpn-globalprotect",
    "title": "Cryptographic Standards and Firewall Rules for Remote Access VPN",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Remote Access VPN. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Remote Access VPN"
  },
  {
    "docId": "doc-015",
    "familyId": "vpn-globalprotect",
    "title": "Quick Reference Card: 3-Step Setup for Remote Access VPN",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Remote Access VPN. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Remote Access VPN"
  },
  {
    "docId": "doc-016",
    "familyId": "vpn-globalprotect",
    "title": "[OBSOLETE] Previous Generation Configuration for Remote Access VPN (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Remote Access VPN are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Remote Access VPN"
  },
  {
    "docId": "doc-017",
    "familyId": "email-exchange",
    "title": "Official Guide: Configuring University Email & Calendar (Current Standard)",
    "body": "Comprehensive step-by-step instructions for University Email & Calendar. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "University Email & Calendar"
  },
  {
    "docId": "doc-018",
    "familyId": "email-exchange",
    "title": "Mobile Setup for University Email & Calendar (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for University Email & Calendar on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "University Email & Calendar"
  },
  {
    "docId": "doc-019",
    "familyId": "email-exchange",
    "title": "Troubleshooting Common Connection Errors in University Email & Calendar",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to University Email & Calendar. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "University Email & Calendar"
  },
  {
    "docId": "doc-020",
    "familyId": "email-exchange",
    "title": "[ARCHIVED] Legacy Instructions for University Email & Calendar (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for University Email & Calendar. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "University Email & Calendar"
  },
  {
    "docId": "doc-021",
    "familyId": "email-exchange",
    "title": "Departmental Admin Policies and Quota Limits for University Email & Calendar",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for University Email & Calendar. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "University Email & Calendar"
  },
  {
    "docId": "doc-022",
    "familyId": "email-exchange",
    "title": "Cryptographic Standards and Firewall Rules for University Email & Calendar",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for University Email & Calendar. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "University Email & Calendar"
  },
  {
    "docId": "doc-023",
    "familyId": "email-exchange",
    "title": "Quick Reference Card: 3-Step Setup for University Email & Calendar",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for University Email & Calendar. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "University Email & Calendar"
  },
  {
    "docId": "doc-024",
    "familyId": "email-exchange",
    "title": "[OBSOLETE] Previous Generation Configuration for University Email & Calendar (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for University Email & Calendar are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "University Email & Calendar"
  },
  {
    "docId": "doc-025",
    "familyId": "password-sspr",
    "title": "Official Guide: Configuring Account Security & Password (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Account Security & Password. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Account Security & Password"
  },
  {
    "docId": "doc-026",
    "familyId": "password-sspr",
    "title": "Mobile Setup for Account Security & Password (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Account Security & Password on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Account Security & Password"
  },
  {
    "docId": "doc-027",
    "familyId": "password-sspr",
    "title": "Troubleshooting Common Connection Errors in Account Security & Password",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Account Security & Password. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Account Security & Password"
  },
  {
    "docId": "doc-028",
    "familyId": "password-sspr",
    "title": "[ARCHIVED] Legacy Instructions for Account Security & Password (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Account Security & Password. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Account Security & Password"
  },
  {
    "docId": "doc-029",
    "familyId": "password-sspr",
    "title": "Departmental Admin Policies and Quota Limits for Account Security & Password",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Account Security & Password. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Account Security & Password"
  },
  {
    "docId": "doc-030",
    "familyId": "password-sspr",
    "title": "Cryptographic Standards and Firewall Rules for Account Security & Password",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Account Security & Password. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Account Security & Password"
  },
  {
    "docId": "doc-031",
    "familyId": "password-sspr",
    "title": "Quick Reference Card: 3-Step Setup for Account Security & Password",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Account Security & Password. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Account Security & Password"
  },
  {
    "docId": "doc-032",
    "familyId": "password-sspr",
    "title": "[OBSOLETE] Previous Generation Configuration for Account Security & Password (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Account Security & Password are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Account Security & Password"
  },
  {
    "docId": "doc-033",
    "familyId": "print-papercut",
    "title": "Official Guide: Configuring Campus Printing & Quotas (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Campus Printing & Quotas. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Campus Printing & Quotas"
  },
  {
    "docId": "doc-034",
    "familyId": "print-papercut",
    "title": "Mobile Setup for Campus Printing & Quotas (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Campus Printing & Quotas on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Campus Printing & Quotas"
  },
  {
    "docId": "doc-035",
    "familyId": "print-papercut",
    "title": "Troubleshooting Common Connection Errors in Campus Printing & Quotas",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Campus Printing & Quotas. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Campus Printing & Quotas"
  },
  {
    "docId": "doc-036",
    "familyId": "print-papercut",
    "title": "[ARCHIVED] Legacy Instructions for Campus Printing & Quotas (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Campus Printing & Quotas. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Campus Printing & Quotas"
  },
  {
    "docId": "doc-037",
    "familyId": "print-papercut",
    "title": "Departmental Admin Policies and Quota Limits for Campus Printing & Quotas",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Campus Printing & Quotas. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Campus Printing & Quotas"
  },
  {
    "docId": "doc-038",
    "familyId": "print-papercut",
    "title": "Cryptographic Standards and Firewall Rules for Campus Printing & Quotas",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Campus Printing & Quotas. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Campus Printing & Quotas"
  },
  {
    "docId": "doc-039",
    "familyId": "print-papercut",
    "title": "Quick Reference Card: 3-Step Setup for Campus Printing & Quotas",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Campus Printing & Quotas. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Campus Printing & Quotas"
  },
  {
    "docId": "doc-040",
    "familyId": "print-papercut",
    "title": "[OBSOLETE] Previous Generation Configuration for Campus Printing & Quotas (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Campus Printing & Quotas are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Campus Printing & Quotas"
  },
  {
    "docId": "doc-041",
    "familyId": "lab-linux",
    "title": "Official Guide: Configuring HPC & Linux Compute Labs (Current Standard)",
    "body": "Comprehensive step-by-step instructions for HPC & Linux Compute Labs. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "HPC & Linux Compute Labs"
  },
  {
    "docId": "doc-042",
    "familyId": "lab-linux",
    "title": "Mobile Setup for HPC & Linux Compute Labs (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for HPC & Linux Compute Labs on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "HPC & Linux Compute Labs"
  },
  {
    "docId": "doc-043",
    "familyId": "lab-linux",
    "title": "Troubleshooting Common Connection Errors in HPC & Linux Compute Labs",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to HPC & Linux Compute Labs. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "HPC & Linux Compute Labs"
  },
  {
    "docId": "doc-044",
    "familyId": "lab-linux",
    "title": "[ARCHIVED] Legacy Instructions for HPC & Linux Compute Labs (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for HPC & Linux Compute Labs. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "HPC & Linux Compute Labs"
  },
  {
    "docId": "doc-045",
    "familyId": "lab-linux",
    "title": "Departmental Admin Policies and Quota Limits for HPC & Linux Compute Labs",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for HPC & Linux Compute Labs. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "HPC & Linux Compute Labs"
  },
  {
    "docId": "doc-046",
    "familyId": "lab-linux",
    "title": "Cryptographic Standards and Firewall Rules for HPC & Linux Compute Labs",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for HPC & Linux Compute Labs. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "HPC & Linux Compute Labs"
  },
  {
    "docId": "doc-047",
    "familyId": "lab-linux",
    "title": "Quick Reference Card: 3-Step Setup for HPC & Linux Compute Labs",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for HPC & Linux Compute Labs. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "HPC & Linux Compute Labs"
  },
  {
    "docId": "doc-048",
    "familyId": "lab-linux",
    "title": "[OBSOLETE] Previous Generation Configuration for HPC & Linux Compute Labs (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for HPC & Linux Compute Labs are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "HPC & Linux Compute Labs"
  },
  {
    "docId": "doc-049",
    "familyId": "mfa-duo",
    "title": "Official Guide: Configuring Multi-Factor Authentication (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Multi-Factor Authentication. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Multi-Factor Authentication"
  },
  {
    "docId": "doc-050",
    "familyId": "mfa-duo",
    "title": "Mobile Setup for Multi-Factor Authentication (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Multi-Factor Authentication on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Multi-Factor Authentication"
  },
  {
    "docId": "doc-051",
    "familyId": "mfa-duo",
    "title": "Troubleshooting Common Connection Errors in Multi-Factor Authentication",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Multi-Factor Authentication. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Multi-Factor Authentication"
  },
  {
    "docId": "doc-052",
    "familyId": "mfa-duo",
    "title": "[ARCHIVED] Legacy Instructions for Multi-Factor Authentication (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Multi-Factor Authentication. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Multi-Factor Authentication"
  },
  {
    "docId": "doc-053",
    "familyId": "mfa-duo",
    "title": "Departmental Admin Policies and Quota Limits for Multi-Factor Authentication",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Multi-Factor Authentication. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Multi-Factor Authentication"
  },
  {
    "docId": "doc-054",
    "familyId": "mfa-duo",
    "title": "Cryptographic Standards and Firewall Rules for Multi-Factor Authentication",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Multi-Factor Authentication. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Multi-Factor Authentication"
  },
  {
    "docId": "doc-055",
    "familyId": "mfa-duo",
    "title": "Quick Reference Card: 3-Step Setup for Multi-Factor Authentication",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Multi-Factor Authentication. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Multi-Factor Authentication"
  },
  {
    "docId": "doc-056",
    "familyId": "mfa-duo",
    "title": "[OBSOLETE] Previous Generation Configuration for Multi-Factor Authentication (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Multi-Factor Authentication are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Multi-Factor Authentication"
  },
  {
    "docId": "doc-057",
    "familyId": "canvas-lms",
    "title": "Official Guide: Configuring Canvas Learning Management (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Canvas Learning Management. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Canvas Learning Management"
  },
  {
    "docId": "doc-058",
    "familyId": "canvas-lms",
    "title": "Mobile Setup for Canvas Learning Management (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Canvas Learning Management on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Canvas Learning Management"
  },
  {
    "docId": "doc-059",
    "familyId": "canvas-lms",
    "title": "Troubleshooting Common Connection Errors in Canvas Learning Management",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Canvas Learning Management. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Canvas Learning Management"
  },
  {
    "docId": "doc-060",
    "familyId": "canvas-lms",
    "title": "[ARCHIVED] Legacy Instructions for Canvas Learning Management (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Canvas Learning Management. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Canvas Learning Management"
  },
  {
    "docId": "doc-061",
    "familyId": "canvas-lms",
    "title": "Departmental Admin Policies and Quota Limits for Canvas Learning Management",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Canvas Learning Management. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Canvas Learning Management"
  },
  {
    "docId": "doc-062",
    "familyId": "canvas-lms",
    "title": "Cryptographic Standards and Firewall Rules for Canvas Learning Management",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Canvas Learning Management. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Canvas Learning Management"
  },
  {
    "docId": "doc-063",
    "familyId": "canvas-lms",
    "title": "Quick Reference Card: 3-Step Setup for Canvas Learning Management",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Canvas Learning Management. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Canvas Learning Management"
  },
  {
    "docId": "doc-064",
    "familyId": "canvas-lms",
    "title": "[OBSOLETE] Previous Generation Configuration for Canvas Learning Management (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Canvas Learning Management are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Canvas Learning Management"
  },
  {
    "docId": "doc-065",
    "familyId": "software-matlab",
    "title": "Official Guide: Configuring Licensed Academic Software (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Licensed Academic Software. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Licensed Academic Software"
  },
  {
    "docId": "doc-066",
    "familyId": "software-matlab",
    "title": "Mobile Setup for Licensed Academic Software (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Licensed Academic Software on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Licensed Academic Software"
  },
  {
    "docId": "doc-067",
    "familyId": "software-matlab",
    "title": "Troubleshooting Common Connection Errors in Licensed Academic Software",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Licensed Academic Software. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Licensed Academic Software"
  },
  {
    "docId": "doc-068",
    "familyId": "software-matlab",
    "title": "[ARCHIVED] Legacy Instructions for Licensed Academic Software (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Licensed Academic Software. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Licensed Academic Software"
  },
  {
    "docId": "doc-069",
    "familyId": "software-matlab",
    "title": "Departmental Admin Policies and Quota Limits for Licensed Academic Software",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Licensed Academic Software. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Licensed Academic Software"
  },
  {
    "docId": "doc-070",
    "familyId": "software-matlab",
    "title": "Cryptographic Standards and Firewall Rules for Licensed Academic Software",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Licensed Academic Software. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Licensed Academic Software"
  },
  {
    "docId": "doc-071",
    "familyId": "software-matlab",
    "title": "Quick Reference Card: 3-Step Setup for Licensed Academic Software",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Licensed Academic Software. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Licensed Academic Software"
  },
  {
    "docId": "doc-072",
    "familyId": "software-matlab",
    "title": "[OBSOLETE] Previous Generation Configuration for Licensed Academic Software (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Licensed Academic Software are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Licensed Academic Software"
  },
  {
    "docId": "doc-073",
    "familyId": "dorm-ethernet",
    "title": "Official Guide: Configuring Residential Network & Ethernet (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Residential Network & Ethernet. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Residential Network & Ethernet"
  },
  {
    "docId": "doc-074",
    "familyId": "dorm-ethernet",
    "title": "Mobile Setup for Residential Network & Ethernet (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Residential Network & Ethernet on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Residential Network & Ethernet"
  },
  {
    "docId": "doc-075",
    "familyId": "dorm-ethernet",
    "title": "Troubleshooting Common Connection Errors in Residential Network & Ethernet",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Residential Network & Ethernet. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Residential Network & Ethernet"
  },
  {
    "docId": "doc-076",
    "familyId": "dorm-ethernet",
    "title": "[ARCHIVED] Legacy Instructions for Residential Network & Ethernet (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Residential Network & Ethernet. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Residential Network & Ethernet"
  },
  {
    "docId": "doc-077",
    "familyId": "dorm-ethernet",
    "title": "Departmental Admin Policies and Quota Limits for Residential Network & Ethernet",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Residential Network & Ethernet. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Residential Network & Ethernet"
  },
  {
    "docId": "doc-078",
    "familyId": "dorm-ethernet",
    "title": "Cryptographic Standards and Firewall Rules for Residential Network & Ethernet",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Residential Network & Ethernet. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Residential Network & Ethernet"
  },
  {
    "docId": "doc-079",
    "familyId": "dorm-ethernet",
    "title": "Quick Reference Card: 3-Step Setup for Residential Network & Ethernet",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Residential Network & Ethernet. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Residential Network & Ethernet"
  },
  {
    "docId": "doc-080",
    "familyId": "dorm-ethernet",
    "title": "[OBSOLETE] Previous Generation Configuration for Residential Network & Ethernet (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Residential Network & Ethernet are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Residential Network & Ethernet"
  },
  {
    "docId": "doc-081",
    "familyId": "library-proxy",
    "title": "Official Guide: Configuring Library Proxy & Research Journals (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Library Proxy & Research Journals. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Library Proxy & Research Journals"
  },
  {
    "docId": "doc-082",
    "familyId": "library-proxy",
    "title": "Mobile Setup for Library Proxy & Research Journals (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Library Proxy & Research Journals on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Library Proxy & Research Journals"
  },
  {
    "docId": "doc-083",
    "familyId": "library-proxy",
    "title": "Troubleshooting Common Connection Errors in Library Proxy & Research Journals",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Library Proxy & Research Journals. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Library Proxy & Research Journals"
  },
  {
    "docId": "doc-084",
    "familyId": "library-proxy",
    "title": "[ARCHIVED] Legacy Instructions for Library Proxy & Research Journals (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Library Proxy & Research Journals. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Library Proxy & Research Journals"
  },
  {
    "docId": "doc-085",
    "familyId": "library-proxy",
    "title": "Departmental Admin Policies and Quota Limits for Library Proxy & Research Journals",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Library Proxy & Research Journals. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Library Proxy & Research Journals"
  },
  {
    "docId": "doc-086",
    "familyId": "library-proxy",
    "title": "Cryptographic Standards and Firewall Rules for Library Proxy & Research Journals",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Library Proxy & Research Journals. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Library Proxy & Research Journals"
  },
  {
    "docId": "doc-087",
    "familyId": "library-proxy",
    "title": "Quick Reference Card: 3-Step Setup for Library Proxy & Research Journals",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Library Proxy & Research Journals. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Library Proxy & Research Journals"
  },
  {
    "docId": "doc-088",
    "familyId": "library-proxy",
    "title": "[OBSOLETE] Previous Generation Configuration for Library Proxy & Research Journals (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Library Proxy & Research Journals are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Library Proxy & Research Journals"
  },
  {
    "docId": "doc-089",
    "familyId": "account-guest",
    "title": "Official Guide: Configuring Guest & Visitor Accounts (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Guest & Visitor Accounts. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Guest & Visitor Accounts"
  },
  {
    "docId": "doc-090",
    "familyId": "account-guest",
    "title": "Mobile Setup for Guest & Visitor Accounts (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Guest & Visitor Accounts on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Guest & Visitor Accounts"
  },
  {
    "docId": "doc-091",
    "familyId": "account-guest",
    "title": "Troubleshooting Common Connection Errors in Guest & Visitor Accounts",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Guest & Visitor Accounts. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Guest & Visitor Accounts"
  },
  {
    "docId": "doc-092",
    "familyId": "account-guest",
    "title": "[ARCHIVED] Legacy Instructions for Guest & Visitor Accounts (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Guest & Visitor Accounts. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Guest & Visitor Accounts"
  },
  {
    "docId": "doc-093",
    "familyId": "account-guest",
    "title": "Departmental Admin Policies and Quota Limits for Guest & Visitor Accounts",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Guest & Visitor Accounts. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Guest & Visitor Accounts"
  },
  {
    "docId": "doc-094",
    "familyId": "account-guest",
    "title": "Cryptographic Standards and Firewall Rules for Guest & Visitor Accounts",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Guest & Visitor Accounts. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Guest & Visitor Accounts"
  },
  {
    "docId": "doc-095",
    "familyId": "account-guest",
    "title": "Quick Reference Card: 3-Step Setup for Guest & Visitor Accounts",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Guest & Visitor Accounts. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Guest & Visitor Accounts"
  },
  {
    "docId": "doc-096",
    "familyId": "account-guest",
    "title": "[OBSOLETE] Previous Generation Configuration for Guest & Visitor Accounts (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Guest & Visitor Accounts are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Guest & Visitor Accounts"
  },
  {
    "docId": "doc-097",
    "familyId": "storage-onedrive",
    "title": "Official Guide: Configuring Cloud Storage & Backups (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Cloud Storage & Backups. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Cloud Storage & Backups"
  },
  {
    "docId": "doc-098",
    "familyId": "storage-onedrive",
    "title": "Mobile Setup for Cloud Storage & Backups (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Cloud Storage & Backups on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Cloud Storage & Backups"
  },
  {
    "docId": "doc-099",
    "familyId": "storage-onedrive",
    "title": "Troubleshooting Common Connection Errors in Cloud Storage & Backups",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Cloud Storage & Backups. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Cloud Storage & Backups"
  },
  {
    "docId": "doc-100",
    "familyId": "storage-onedrive",
    "title": "[ARCHIVED] Legacy Instructions for Cloud Storage & Backups (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Cloud Storage & Backups. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Cloud Storage & Backups"
  },
  {
    "docId": "doc-101",
    "familyId": "storage-onedrive",
    "title": "Departmental Admin Policies and Quota Limits for Cloud Storage & Backups",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Cloud Storage & Backups. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Cloud Storage & Backups"
  },
  {
    "docId": "doc-102",
    "familyId": "storage-onedrive",
    "title": "Cryptographic Standards and Firewall Rules for Cloud Storage & Backups",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Cloud Storage & Backups. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Cloud Storage & Backups"
  },
  {
    "docId": "doc-103",
    "familyId": "storage-onedrive",
    "title": "Quick Reference Card: 3-Step Setup for Cloud Storage & Backups",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Cloud Storage & Backups. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Cloud Storage & Backups"
  },
  {
    "docId": "doc-104",
    "familyId": "storage-onedrive",
    "title": "[OBSOLETE] Previous Generation Configuration for Cloud Storage & Backups (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Cloud Storage & Backups are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Cloud Storage & Backups"
  },
  {
    "docId": "doc-105",
    "familyId": "zoom-virtual",
    "title": "Official Guide: Configuring Video Conferencing & Classrooms (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Video Conferencing & Classrooms. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Video Conferencing & Classrooms"
  },
  {
    "docId": "doc-106",
    "familyId": "zoom-virtual",
    "title": "Mobile Setup for Video Conferencing & Classrooms (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Video Conferencing & Classrooms on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Video Conferencing & Classrooms"
  },
  {
    "docId": "doc-107",
    "familyId": "zoom-virtual",
    "title": "Troubleshooting Common Connection Errors in Video Conferencing & Classrooms",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Video Conferencing & Classrooms. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Video Conferencing & Classrooms"
  },
  {
    "docId": "doc-108",
    "familyId": "zoom-virtual",
    "title": "[ARCHIVED] Legacy Instructions for Video Conferencing & Classrooms (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Video Conferencing & Classrooms. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Video Conferencing & Classrooms"
  },
  {
    "docId": "doc-109",
    "familyId": "zoom-virtual",
    "title": "Departmental Admin Policies and Quota Limits for Video Conferencing & Classrooms",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Video Conferencing & Classrooms. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Video Conferencing & Classrooms"
  },
  {
    "docId": "doc-110",
    "familyId": "zoom-virtual",
    "title": "Cryptographic Standards and Firewall Rules for Video Conferencing & Classrooms",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Video Conferencing & Classrooms. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Video Conferencing & Classrooms"
  },
  {
    "docId": "doc-111",
    "familyId": "zoom-virtual",
    "title": "Quick Reference Card: 3-Step Setup for Video Conferencing & Classrooms",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Video Conferencing & Classrooms. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Video Conferencing & Classrooms"
  },
  {
    "docId": "doc-112",
    "familyId": "zoom-virtual",
    "title": "[OBSOLETE] Previous Generation Configuration for Video Conferencing & Classrooms (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Video Conferencing & Classrooms are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Video Conferencing & Classrooms"
  },
  {
    "docId": "doc-113",
    "familyId": "card-access",
    "title": "Official Guide: Configuring Building & Lab Card Access (Current Standard)",
    "body": "Comprehensive step-by-step instructions for Building & Lab Card Access. All students, faculty, and staff should follow these current standards for authentication, client software, and security protocols across Windows, macOS, iOS, and Linux.",
    "version": "3.2",
    "current": true,
    "topic": "Building & Lab Card Access"
  },
  {
    "docId": "doc-114",
    "familyId": "card-access",
    "title": "Mobile Setup for Building & Lab Card Access (iOS and Android)",
    "body": "How to install profiles, root certificates, and authenticator tokens for Building & Lab Card Access on smartphones and tablets. Requires your standard campus NetID credentials.",
    "version": "3.1",
    "current": true,
    "topic": "Building & Lab Card Access"
  },
  {
    "docId": "doc-115",
    "familyId": "card-access",
    "title": "Troubleshooting Common Connection Errors in Building & Lab Card Access",
    "body": "Solutions for timeout errors, invalid certificate warnings, bad password lockouts, and network adapter resets related to Building & Lab Card Access. Check service status before contacting the helpdesk.",
    "version": "3.0",
    "current": true,
    "topic": "Building & Lab Card Access"
  },
  {
    "docId": "doc-116",
    "familyId": "card-access",
    "title": "[ARCHIVED] Legacy Instructions for Building & Lab Card Access (v1.5 Deprecated)",
    "body": "DO NOT USE: This documentation describes retired campus servers and older TLS 1.0 protocols for Building & Lab Card Access. Retained strictly for legacy research systems and historical reference.",
    "version": "1.5",
    "current": false,
    "topic": "Building & Lab Card Access"
  },
  {
    "docId": "doc-117",
    "familyId": "card-access",
    "title": "Departmental Admin Policies and Quota Limits for Building & Lab Card Access",
    "body": "Guidelines for department coordinators regarding elevated permissions, custom gateway routing, and increased usage allocations for Building & Lab Card Access. Requires dean approval.",
    "version": "2.8",
    "current": true,
    "topic": "Building & Lab Card Access"
  },
  {
    "docId": "doc-118",
    "familyId": "card-access",
    "title": "Cryptographic Standards and Firewall Rules for Building & Lab Card Access",
    "body": "Network port definitions, cipher suites (AES-256-GCM), and campus boundary firewall policies governing traffic for Building & Lab Card Access. Technical reference for IT system administrators.",
    "version": "3.0",
    "current": true,
    "topic": "Building & Lab Card Access"
  },
  {
    "docId": "doc-119",
    "familyId": "card-access",
    "title": "Quick Reference Card: 3-Step Setup for Building & Lab Card Access",
    "body": "Fast setup summary for orientation week: 1. Download installer. 2. Enter NetID@campus.edu. 3. Accept security prompt for Building & Lab Card Access. Get connected in under 2 minutes.",
    "version": "3.2",
    "current": true,
    "topic": "Building & Lab Card Access"
  },
  {
    "docId": "doc-120",
    "familyId": "card-access",
    "title": "[OBSOLETE] Previous Generation Configuration for Building & Lab Card Access (v2.0)",
    "body": "Notice: Replaced by version 3.0 in Fall 2024. Manual IP and DNS server overrides for Building & Lab Card Access are no longer supported by campus infrastructure.",
    "version": "2.0",
    "current": false,
    "topic": "Building & Lab Card Access"
  }
];

export const CAMPUS_QUERIES: Query[] = [
  {
    "queryId": "q-01",
    "text": "connect to campus eduroam wifi",
    "intentFamily": "wifi-eduroam",
    "split": "dev"
  },
  {
    "queryId": "q-02",
    "text": "install eduroam root certificate iphone",
    "intentFamily": "wifi-eduroam",
    "split": "dev"
  },
  {
    "queryId": "q-03",
    "text": "globalprotect vpn connection timeout error",
    "intentFamily": "vpn-globalprotect",
    "split": "dev"
  },
  {
    "queryId": "q-04",
    "text": "download vpn client for macos",
    "intentFamily": "vpn-globalprotect",
    "split": "dev"
  },
  {
    "queryId": "q-05",
    "text": "setup university outlook email on phone",
    "intentFamily": "email-exchange",
    "split": "dev"
  },
  {
    "queryId": "q-06",
    "text": "request exchange mailbox storage quota increase",
    "intentFamily": "email-exchange",
    "split": "dev"
  },
  {
    "queryId": "q-07",
    "text": "reset expired student password self service",
    "intentFamily": "password-sspr",
    "split": "dev"
  },
  {
    "queryId": "q-08",
    "text": "security questions forgot netid password",
    "intentFamily": "password-sspr",
    "split": "dev"
  },
  {
    "queryId": "q-09",
    "text": "how to add money to papercut print balance",
    "intentFamily": "print-papercut",
    "split": "dev"
  },
  {
    "queryId": "q-10",
    "text": "library wireless web print printer locations",
    "intentFamily": "print-papercut",
    "split": "dev"
  },
  {
    "queryId": "q-11",
    "text": "ssh login to engineering linux lab cluster",
    "intentFamily": "lab-linux",
    "split": "dev"
  },
  {
    "queryId": "q-12",
    "text": "slurm batch job submit gpu cuda cluster",
    "intentFamily": "lab-linux",
    "split": "dev"
  },
  {
    "queryId": "q-13",
    "text": "setup duo mobile push notifications new phone",
    "intentFamily": "mfa-duo",
    "split": "dev"
  },
  {
    "queryId": "q-14",
    "text": "bypass codes duo two factor travel",
    "intentFamily": "mfa-duo",
    "split": "dev"
  },
  {
    "queryId": "q-15",
    "text": "wifi slow disconnects in library troubleshooting",
    "intentFamily": "wifi-eduroam",
    "split": "dev"
  },
  {
    "queryId": "q-16",
    "text": "canvas lms login submit course assignment",
    "intentFamily": "canvas-lms",
    "split": "held-out"
  },
  {
    "queryId": "q-17",
    "text": "canvas syllabus file upload instructor permissions",
    "intentFamily": "canvas-lms",
    "split": "held-out"
  },
  {
    "queryId": "q-18",
    "text": "matlab campus license activation mathworks account",
    "intentFamily": "software-matlab",
    "split": "held-out"
  },
  {
    "queryId": "q-19",
    "text": "matlab network license server connection error",
    "intentFamily": "software-matlab",
    "split": "held-out"
  },
  {
    "queryId": "q-20",
    "text": "register ethernet mac address dorm wall port",
    "intentFamily": "dorm-ethernet",
    "split": "held-out"
  },
  {
    "queryId": "q-21",
    "text": "gaming console nintendo switch wired internet dorm",
    "intentFamily": "dorm-ethernet",
    "split": "held-out"
  },
  {
    "queryId": "q-22",
    "text": "off campus research journal ezproxy login",
    "intentFamily": "library-proxy",
    "split": "held-out"
  },
  {
    "queryId": "q-23",
    "text": "google scholar link library subscription access",
    "intentFamily": "library-proxy",
    "split": "held-out"
  },
  {
    "queryId": "q-24",
    "text": "sponsor guest visitor wifi conference account",
    "intentFamily": "account-guest",
    "split": "held-out"
  },
  {
    "queryId": "q-25",
    "text": "contractor temporary campus netid request",
    "intentFamily": "account-guest",
    "split": "held-out"
  },
  {
    "queryId": "q-26",
    "text": "sync onedrive student files sharepoint permissions",
    "intentFamily": "storage-onedrive",
    "split": "held-out"
  },
  {
    "queryId": "q-27",
    "text": "onedrive quota full backup local folder",
    "intentFamily": "storage-onedrive",
    "split": "held-out"
  },
  {
    "queryId": "q-28",
    "text": "zoom sso login with university credentials",
    "intentFamily": "zoom-virtual",
    "split": "held-out"
  },
  {
    "queryId": "q-29",
    "text": "request large zoom webinar 500 participants license",
    "intentFamily": "zoom-virtual",
    "split": "held-out"
  },
  {
    "queryId": "q-30",
    "text": "campus id card access denied research lab door",
    "intentFamily": "card-access",
    "split": "held-out"
  }
];

export const INITIAL_JUDGMENTS: Judgment[] = [
  {
    "queryId": "q-01",
    "docId": "doc-001",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-01",
    "docId": "doc-004",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-01",
    "docId": "doc-003",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-01",
    "docId": "doc-002",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-01",
    "docId": "doc-096",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-02",
    "docId": "doc-001",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-02",
    "docId": "doc-004",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-02",
    "docId": "doc-003",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-02",
    "docId": "doc-002",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-02",
    "docId": "doc-111",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-03",
    "docId": "doc-009",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-03",
    "docId": "doc-012",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-03",
    "docId": "doc-011",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-03",
    "docId": "doc-010",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-03",
    "docId": "doc-045",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-04",
    "docId": "doc-009",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-04",
    "docId": "doc-012",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-04",
    "docId": "doc-011",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-04",
    "docId": "doc-010",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-04",
    "docId": "doc-060",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-05",
    "docId": "doc-017",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-05",
    "docId": "doc-020",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-05",
    "docId": "doc-019",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-05",
    "docId": "doc-018",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-05",
    "docId": "doc-035",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-06",
    "docId": "doc-017",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-06",
    "docId": "doc-020",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-06",
    "docId": "doc-019",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-06",
    "docId": "doc-018",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-06",
    "docId": "doc-006",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-07",
    "docId": "doc-025",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-07",
    "docId": "doc-028",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-07",
    "docId": "doc-027",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-07",
    "docId": "doc-026",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-07",
    "docId": "doc-084",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-08",
    "docId": "doc-025",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-08",
    "docId": "doc-028",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-08",
    "docId": "doc-027",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-08",
    "docId": "doc-026",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-08",
    "docId": "doc-057",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-09",
    "docId": "doc-033",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-09",
    "docId": "doc-036",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-09",
    "docId": "doc-035",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-09",
    "docId": "doc-034",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-09",
    "docId": "doc-096",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-10",
    "docId": "doc-033",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-10",
    "docId": "doc-036",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-10",
    "docId": "doc-035",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-10",
    "docId": "doc-034",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-10",
    "docId": "doc-041",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-11",
    "docId": "doc-041",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-11",
    "docId": "doc-044",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-11",
    "docId": "doc-043",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-11",
    "docId": "doc-042",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-11",
    "docId": "doc-087",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-12",
    "docId": "doc-041",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-12",
    "docId": "doc-044",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-12",
    "docId": "doc-043",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-12",
    "docId": "doc-042",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-12",
    "docId": "doc-119",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-13",
    "docId": "doc-049",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-13",
    "docId": "doc-052",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-13",
    "docId": "doc-051",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-13",
    "docId": "doc-050",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-13",
    "docId": "doc-040",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-14",
    "docId": "doc-049",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-14",
    "docId": "doc-052",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-14",
    "docId": "doc-051",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-14",
    "docId": "doc-050",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-14",
    "docId": "doc-112",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-15",
    "docId": "doc-001",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-15",
    "docId": "doc-004",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-15",
    "docId": "doc-003",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-15",
    "docId": "doc-002",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-15",
    "docId": "doc-098",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-16",
    "docId": "doc-057",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-16",
    "docId": "doc-060",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-16",
    "docId": "doc-059",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-16",
    "docId": "doc-058",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-16",
    "docId": "doc-099",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-17",
    "docId": "doc-057",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-17",
    "docId": "doc-060",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-17",
    "docId": "doc-059",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-17",
    "docId": "doc-058",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-17",
    "docId": "doc-008",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-18",
    "docId": "doc-065",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-18",
    "docId": "doc-068",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-18",
    "docId": "doc-067",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-18",
    "docId": "doc-066",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-18",
    "docId": "doc-075",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-19",
    "docId": "doc-065",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-19",
    "docId": "doc-068",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-19",
    "docId": "doc-067",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-19",
    "docId": "doc-066",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-19",
    "docId": "doc-060",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-20",
    "docId": "doc-073",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-20",
    "docId": "doc-076",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-20",
    "docId": "doc-075",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-20",
    "docId": "doc-074",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-20",
    "docId": "doc-038",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-21",
    "docId": "doc-073",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-21",
    "docId": "doc-076",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-21",
    "docId": "doc-075",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-21",
    "docId": "doc-074",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-21",
    "docId": "doc-023",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-22",
    "docId": "doc-081",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-22",
    "docId": "doc-084",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-22",
    "docId": "doc-083",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-22",
    "docId": "doc-082",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-22",
    "docId": "doc-022",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-23",
    "docId": "doc-081",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-23",
    "docId": "doc-084",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-23",
    "docId": "doc-083",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-23",
    "docId": "doc-082",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-23",
    "docId": "doc-100",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-24",
    "docId": "doc-089",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-24",
    "docId": "doc-092",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-24",
    "docId": "doc-091",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-24",
    "docId": "doc-090",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-24",
    "docId": "doc-044",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-25",
    "docId": "doc-089",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-25",
    "docId": "doc-092",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-25",
    "docId": "doc-091",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-25",
    "docId": "doc-090",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-25",
    "docId": "doc-086",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-26",
    "docId": "doc-097",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-26",
    "docId": "doc-100",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-26",
    "docId": "doc-099",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-26",
    "docId": "doc-098",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-26",
    "docId": "doc-090",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-27",
    "docId": "doc-097",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-27",
    "docId": "doc-100",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-27",
    "docId": "doc-099",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-27",
    "docId": "doc-098",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-27",
    "docId": "doc-029",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-28",
    "docId": "doc-105",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-28",
    "docId": "doc-108",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-28",
    "docId": "doc-107",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-28",
    "docId": "doc-106",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-28",
    "docId": "doc-099",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-29",
    "docId": "doc-105",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-29",
    "docId": "doc-108",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-29",
    "docId": "doc-107",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-29",
    "docId": "doc-106",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-29",
    "docId": "doc-092",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  },
  {
    "queryId": "q-30",
    "docId": "doc-113",
    "relevance": 1,
    "assessor": "lead_annotator",
    "rationale": "Official current canonical guide matching query intent",
    "revision": 1
  },
  {
    "queryId": "q-30",
    "docId": "doc-116",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Obsolete legacy instructions are misleading and non-functional",
    "revision": 1
  },
  {
    "queryId": "q-30",
    "docId": "doc-115",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending technical review on whether troubleshooting guide is sufficient answer",
    "revision": 0
  },
  {
    "queryId": "q-30",
    "docId": "doc-114",
    "relevance": null,
    "assessor": "unassigned",
    "rationale": "Pending domain verification for mobile vs desktop scope",
    "revision": 0
  },
  {
    "queryId": "q-30",
    "docId": "doc-048",
    "relevance": 0,
    "assessor": "lead_annotator",
    "rationale": "Completely different campus IT domain",
    "revision": 1
  }
];
