import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { Project, SkillCategory, Certification, Experience, GalleryItem } from "../shared/schema";

// Portfolio data
const projects: Project[] = [
  {
    id: "aws-security",
    title: "Secure Web Hosting on AWS EC2",
    description: "Deployed a web application on EC2 and S3 with custom IAM policies for least-privilege access and isolation.",
    tech: ["AWS EC2", "S3", "IAM", "VPC", "CloudFront"],
    details: [
      "Security Groups Configuration",
      "Route 53 DNS Setup", 
      "WordPress Hardening"
    ],
    githubUrl: "https://github.com/Prathameshpendkar2005/Projects.git"
  },
  {
    id: "recon-automation",
    title: "Recon Automation Bash Script",
    description: "Automated reconnaissance and vulnerability scanning with endpoint enumeration and comprehensive reporting.",
    tech: ["Bash", "Nmap", "OWASP ZAP", "FFUF", "WPScan"],
    details: [
      "Subdomain Enumeration",
      "Port Scanning & Detection",
      "Automated Report Generation"
    ],
    githubUrl: "https://github.com/Prathameshpendkar2005/Projects.git"
  },
  {
    id: "tscm-design",
    title: "TSCM Product Design",
    description: "Built a hardware-assisted tool to detect hidden surveillance devices with access control integration.",
    tech: ["Embedded Systems", "RF Detection", "Security Engineering"],
    details: [
      "RF Signal Analysis",
      "Hardware Integration",
      "35% Detection Accuracy Improvement"
    ],
    githubUrl: "https://github.com/Prathameshpendkar2005/Projects.git"
  },
  {
    id: "vulnerability-lab",
    title: "Web Vulnerability Testing Lab",
    description: "Created a comprehensive lab to simulate and exploit OWASP Top 10 vulnerabilities for VAPT practice.",
    tech: ["OWASP Juice Shop", "bWAPP", "Metasploit", "Docker"],
    details: [
      "OWASP Top 10 Simulations",
      "Exploitation Frameworks",
      "Containerized Environment"
    ],
    githubUrl: "https://github.com/Prathameshpendkar2005/Projects.git"
  }
];

const skillCategories: SkillCategory[] = [
  {
    id: "cloud-security",
    title: "Cloud Security",
    icon: "Cloud",
    tools: [
      { name: "AWS", icon: "Cloud", wikipediaUrl: "https://en.wikipedia.org/wiki/Amazon_Web_Services" },
      { name: "EC2", icon: "Server", wikipediaUrl: "https://en.wikipedia.org/wiki/Amazon_Elastic_Compute_Cloud" },
      { name: "S3", icon: "Database", wikipediaUrl: "https://en.wikipedia.org/wiki/Amazon_S3" },
      { name: "VPC", icon: "Network", wikipediaUrl: "https://en.wikipedia.org/wiki/Amazon_Virtual_Private_Cloud" },
      { name: "IAM", icon: "UserCheck", wikipediaUrl: "https://en.wikipedia.org/wiki/AWS_Identity_and_Access_Management" },
      { name: "Azure Cloud", icon: "Cloud", wikipediaUrl: "https://en.wikipedia.org/wiki/Microsoft_Azure" },
      { name: "Google Cloud Platform", icon: "Cloud", wikipediaUrl: "https://en.wikipedia.org/wiki/Google_Cloud_Platform" },
      { name: "CloudFront", icon: "Network", wikipediaUrl: "https://en.wikipedia.org/wiki/Amazon_CloudFront" },
      { name: "WAF", icon: "Shield", wikipediaUrl: "https://en.wikipedia.org/wiki/Web_application_firewall" }
    ]
  },
  {
    id: "vapt-tools",
    title: "VAPT Tools",
    icon: "Search",
    tools: [
      { name: "Nmap", icon: "Search", wikipediaUrl: "https://en.wikipedia.org/wiki/Nmap" },
      { name: "Naabu", icon: "Network", wikipediaUrl: "https://en.wikipedia.org/wiki/Port_scanner" },
      { name: "Burp Suite", icon: "Bug", wikipediaUrl: "https://en.wikipedia.org/wiki/Burp_Suite" },
      { name: "OWASP ZAP", icon: "Shield", wikipediaUrl: "https://en.wikipedia.org/wiki/OWASP_ZAP" },
      { name: "SQLMap", icon: "Database", wikipediaUrl: "https://en.wikipedia.org/wiki/Sqlmap" },
      { name: "Nikto", icon: "Search", wikipediaUrl: "https://en.wikipedia.org/wiki/Nikto_(vulnerability_scanner)" },
      { name: "Kali Linux", icon: "Terminal", wikipediaUrl: "https://en.wikipedia.org/wiki/Kali_Linux" },
      { name: "Metasploit", icon: "Bug", wikipediaUrl: "https://en.wikipedia.org/wiki/Metasploit" }
    ]
  },
  {
    id: "soc-siem",
    title: "SOC / SIEM",
    icon: "Monitor",
    tools: [
      { name: "Elasticsearch", icon: "Database", wikipediaUrl: "https://en.wikipedia.org/wiki/Elasticsearch" },
      { name: "Logstash", icon: "Settings", wikipediaUrl: "https://en.wikipedia.org/wiki/Logstash" },
      { name: "Kibana", icon: "BarChart", wikipediaUrl: "https://en.wikipedia.org/wiki/Kibana" },
      { name: "Wazuh SIEM", icon: "Shield", wikipediaUrl: "https://en.wikipedia.org/wiki/Wazuh" },
      { name: "Microsoft Sentinel", icon: "Monitor", wikipediaUrl: "https://en.wikipedia.org/wiki/Microsoft_Sentinel" },
      { name: "Zabbix Monitoring", icon: "Monitor", wikipediaUrl: "https://en.wikipedia.org/wiki/Zabbix" },
      { name: "Prometheus", icon: "BarChart", wikipediaUrl: "https://en.wikipedia.org/wiki/Prometheus_(software)" },
      { name: "Splunk", icon: "Database", wikipediaUrl: "https://en.wikipedia.org/wiki/Splunk" },
      { name: "Fleet Server", icon: "Server", wikipediaUrl: "https://en.wikipedia.org/wiki/Elastic_Stack" },
      { name: "Grafana", icon: "BarChart", wikipediaUrl: "https://en.wikipedia.org/wiki/Grafana" }
    ]
  },
  {
    id: "devops-automation",
    title: "DevOps & Automation",
    icon: "Settings",
    tools: [
      { name: "Docker", icon: "Container", wikipediaUrl: "https://en.wikipedia.org/wiki/Docker_(software)" },
      { name: "Kubernetes", icon: "Layers", wikipediaUrl: "https://en.wikipedia.org/wiki/Kubernetes" },
      { name: "Python", icon: "Code", wikipediaUrl: "https://en.wikipedia.org/wiki/Python_(programming_language)" },
      { name: "Bash", icon: "Terminal", wikipediaUrl: "https://en.wikipedia.org/wiki/Bash_(Unix_shell)" },
      { name: "Git", icon: "GitBranch", wikipediaUrl: "https://en.wikipedia.org/wiki/Git" },
      { name: "Terraform", icon: "Settings", wikipediaUrl: "https://en.wikipedia.org/wiki/Terraform_(software)" },
      { name: "Ansible", icon: "Settings", wikipediaUrl: "https://en.wikipedia.org/wiki/Ansible_(software)" },
      { name: "Infrastructure as Code", icon: "Code", wikipediaUrl: "https://en.wikipedia.org/wiki/Infrastructure_as_code" }
    ]
  }
];

const certifications: Certification[] = [
  {
    id: "aws-cert",
    title: "AWS Cloud Certification",
    provider: "SevenMentor",
    year: "2025",
    description: "Cloud Security & Infrastructure",
    status: "In Progress",
    statusColor: "bg-accent text-background",
    icon: "Cloud"
  },
  {
    id: "comptia-pentest",
    title: "CompTIA PenTest+",
    provider: "Udemy",
    year: "In Progress",
    description: "Penetration Testing & Vulnerability Assessment",
    status: "In Progress",
    statusColor: "bg-accent text-background",
    icon: "UserCheck"
  },
  {
    id: "dfe-cert",
    title: "Digital Forensics Essentials (DFE)",
    provider: "EC-Council",
    year: "March 2023",
    description: "Digital Forensics & Incident Response",
    status: "Certified",
    statusColor: "bg-neon text-background",
    icon: "Search"
  }
];

const galleryItems: GalleryItem[] = [
  {
    id: "projects-screenshot",
    title: "Cybersecurity Projects Portfolio",
    description: "Screenshot showcasing secure web hosting, recon automation, TSCM design, and vulnerability testing lab projects",
    imagePath: "@assets/image_1756967533758.png",
    category: "project",
    date: "2025"
  },
  {
    id: "team-photo",
    title: "Professional Team Collaboration",
    description: "Working with cybersecurity professionals and colleagues during internship experience",
    imagePath: "@assets/WhatsApp Image 2024-08-07 at 21.11.15_3b95bb5b_1756967707430.jpg",
    category: "team",
    date: "August 2024"
  },
  {
    id: "arapl-certificate",
    title: "ARAPL Vulnerability Management Certificate",
    description: "Certificate from ARAPL for completion of vulnerability management and penetration testing internship program",
    imagePath: "@assets/ARAPL_1756967719523.jpg",
    category: "certificate",
    date: "September 2023"
  },
  {
    id: "techblue-certificate",
    title: "TechBlue Technology Workshop Certificate",
    description: "Certificate of participation for 2-day TechBlue Technology Workshop on volume forecasting and database security",
    imagePath: "@assets/image_1756967840745.png",
    category: "certificate",
    date: "2023"
  },
  {
    id: "digital-forensics-certificate",
    title: "Digital Forensics Essentials (DFE) - EC-Council",
    description: "EC-Council certified Digital Forensics Essentials course completion certificate - enhancing incident response capabilities",
    imagePath: "@assets/Digital_forensics_essentials_1756967862712.png",
    category: "certificate",
    date: "June 2024"
  },
  {
    id: "bloggerscon-certificate",
    title: "BloggersCon Security Analyst Internship",
    description: "Certificate of completion for Security Analyst Internship at BloggersCon Vision Pvt Ltd, focusing on bug bounty and VAPT",
    imagePath: "@assets/Prathamesh_Pendkar_1756967941797.png",
    category: "certificate",
    date: "August 2025"
  }
];

const experiences: Experience[] = [
  {
    id: "imperative",
    title: "Cybersecurity Intern",
    company: "Imperative (Cyber Secured India)",
    duration: "Aug 2025 - Nov 2025",
    achievements: [
      "SOC/NOC Lab Deployment: Built modular ELK + Wazuh + Zabbix stack using Docker with static IPs",
      "Health Check Automation: Scripted health checks for Elasticsearch, Kibana, Fleet Server, and Zabbix agents",
      "Remote Infrastructure: Validated uptime across Docker containers, connected to Thane office via VPN"
    ]
  },
  {
    id: "bloggerscon",
    title: "Security Analyst Intern",
    company: "Bloggerscon Vision Pvt. Ltd",
    duration: "Feb 2025 - Aug 2025",
    achievements: [
      "Found 5-8 bugs: XSS, IDOR, CSRF, Open Redirect",
      "Recon Automation: 40% speed improvement",
      "Subdomain Enumeration: 500+ endpoints",
      "Delivered 20+ PoC reports with VRT mapping"
    ]
  },
  {
    id: "hacktify",
    title: "Cybersecurity Intern",
    company: "Hacktify Cyber Security",
    duration: "Feb 2025 - Mar 2025",
    achievements: [
      "Bug Bounty VAPT: Found 5-7 web app vulnerabilities (XSS, SQLi, IDOR, CSRF, Broken Auth)",
      "Hacktify CTF: Solved 5 exploitation challenges, simulating real-world bounty tasks"
    ]
  },
  {
    id: "cybersec-corp",
    title: "Digital Forensics Intern",
    company: "Cybersecurity Corporation",
    duration: "Jun 2024 - Aug 2024",
    achievements: [
      "Forensics: 10+ disk imaging cases with Autopsy",
      "Incident Response: 5+ investigations supported",
      "TSCM: 35% detection accuracy improvement",
      "Reporting: 25% faster incident resolution"
    ]
  },
  {
    id: "arapl",
    title: "Vulnerability Management Analyst",
    company: "ARAPL, Pune",
    duration: "Jun 2023 - Aug 2023",
    achievements: [
      "Lab Setup: Simulated 5 vulnerabilities using DVWA, Juice Shop, WebGoat",
      "Vulnerability Scanning: Detected 30+ issues with OWASP ZAP",
      "Reporting: Improved dev patch adoption by 20%"
    ]
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio API routes
  app.get("/api/projects", (req, res) => {
    res.json(projects);
  });

  app.get("/api/skills", (req, res) => {
    res.json(skillCategories);
  });

  app.get("/api/certifications", (req, res) => {
    res.json(certifications);
  });

  app.get("/api/experience", (req, res) => {
    res.json(experiences);
  });

  app.get("/api/gallery", (req, res) => {
    res.json(galleryItems);
  });

  // Generate ATS-friendly resume PDF
  app.get("/api/resume/download", (req, res) => {
    try {
      // Set headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Prathamesh_Pendkar_ATS_Resume.pdf"');

      // ATS-friendly resume HTML template
      const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Prathamesh Pendkar - Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: #000;
      margin: 20px;
      max-width: 8.5in;
    }
    h1 { font-size: 18px; margin: 0 0 5px 0; font-weight: bold; }
    h2 { font-size: 14px; margin: 15px 0 8px 0; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 2px; }
    h3 { font-size: 12px; margin: 8px 0 3px 0; font-weight: bold; }
    p { margin: 2px 0; }
    ul { margin: 3px 0; padding-left: 15px; }
    li { margin: 1px 0; }
    .header { text-align: center; margin-bottom: 15px; }
    .contact { font-size: 10px; margin: 3px 0; }
    .section { margin-bottom: 12px; }
    .job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
    .company { font-weight: bold; }
    .date { font-style: italic; font-size: 10px; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-category { flex: 1; min-width: 200px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>PRATHAMESH SANTOSH PENDKAR</h1>
    <div class="contact">Email: prathameshpendkar@gmail.com | Phone: +91-8390088075 | Location: Pune, India</div>
    <div class="contact">LinkedIn: linkedin.com/in/prathamesh-pendkar | GitHub: github.com/Prathameshpendkar2005</div>
  </div>

  <div class="section">
    <h2>PROFESSIONAL SUMMARY</h2>
    <p>Cybersecurity professional with expertise in penetration testing, vulnerability assessment, and cloud security. Proven track record in SOC monitoring, digital forensics, and security automation. AWS certified with hands-on experience in bug bounty programs and VAPT methodologies.</p>
  </div>

  <div class="section">
    <h2>EDUCATION</h2>
    <div class="job-header">
      <div><strong>Bachelor of Technology in Computer Science & Engineering</strong></div>
      <div class="date">Expected 2026</div>
    </div>
    <p>Symbiosis Skills & Professional University, Pune | CGPA: 8.9/10</p>
  </div>

  <div class="section">
    <h2>PROFESSIONAL EXPERIENCE</h2>
    
    <h3>Cybersecurity Intern | Imperative (Cyber Secured India)</h3>
    <div class="date">August 2025 - November 2025</div>
    <ul>
      <li>SOC/NOC Lab Deployment: Built modular ELK + Wazuh + Zabbix stack using Docker with static IPs</li>
      <li>Health Check Automation: Scripted health checks for Elasticsearch, Kibana, Fleet Server, and Zabbix agents</li>
      <li>Remote Infrastructure: Validated uptime across Docker containers, connected to Thane office via VPN</li>
    </ul>

    <h3>Security Analyst Intern | Bloggerscon Vision Pvt. Ltd</h3>
    <div class="date">February 2025 - August 2025</div>
    <ul>
      <li>Found 5-8 bugs: XSS, IDOR, CSRF, Open Redirect</li>
      <li>Recon Automation: 40% speed improvement</li>
      <li>Subdomain Enumeration: 500+ endpoints</li>
      <li>Delivered 20+ PoC reports with VRT mapping</li>
    </ul>

    <h3>Cybersecurity Intern | Hacktify Cyber Security</h3>
    <div class="date">February 2025 - March 2025</div>
    <ul>
      <li>Bug Bounty VAPT: Found 5-7 web app vulnerabilities (XSS, SQLi, IDOR, CSRF, Broken Auth)</li>
      <li>Hacktify CTF: Solved 5 exploitation challenges, simulating real-world bounty tasks</li>
    </ul>

    <h3>Digital Forensics Intern | Cybersecurity Corporation</h3>
    <div class="date">June 2024 - August 2024</div>
    <ul>
      <li>Forensics: 10+ disk imaging cases with Autopsy</li>
      <li>Incident Response: 5+ investigations supported</li>
      <li>TSCM: 35% detection accuracy improvement</li>
      <li>Reporting: 25% faster incident resolution</li>
    </ul>

    <h3>Vulnerability Management Analyst | ARAPL, Pune</h3>
    <div class="date">June 2023 - August 2023</div>
    <ul>
      <li>Lab Setup: Simulated 5 vulnerabilities using DVWA, Juice Shop, WebGoat</li>
      <li>Vulnerability Scanning: Detected 30+ issues with OWASP ZAP</li>
      <li>Reporting: Improved dev patch adoption by 20%</li>
    </ul>
  </div>

  <div class="section">
    <h2>TECHNICAL SKILLS</h2>
    <div class="skills-grid">
      <div class="skill-category">
        <strong>Cloud Security:</strong> AWS, EC2, S3, VPC, IAM, Azure, GCP, CloudFront, WAF
      </div>
      <div class="skill-category">
        <strong>VAPT Tools:</strong> Nmap, Naabu, Burp Suite, OWASP ZAP, SQLMap, Nikto, Kali Linux, Metasploit
      </div>
      <div class="skill-category">
        <strong>SOC/SIEM:</strong> Elasticsearch, Logstash, Kibana, Wazuh, Microsoft Sentinel, Zabbix, Prometheus, Splunk, Grafana
      </div>
      <div class="skill-category">
        <strong>DevOps:</strong> Docker, Kubernetes, Python, Bash, Git, Terraform, Ansible, Infrastructure as Code
      </div>
    </div>
  </div>

  <div class="section">
    <h2>CERTIFICATIONS</h2>
    <ul>
      <li><strong>Digital Forensics Essentials (DFE)</strong> - EC-Council (March 2023)</li>
      <li><strong>AWS Cloud Certification</strong> - SevenMentor (In Progress)</li>
      <li><strong>CompTIA PenTest+</strong> - Udemy (In Progress)</li>
    </ul>
  </div>

  <div class="section">
    <h2>KEY PROJECTS</h2>
    
    <h3>Secure Web Hosting on AWS EC2</h3>
    <p>Deployed web application on EC2 and S3 with custom IAM policies for least-privilege access and isolation. Technologies: AWS EC2, S3, IAM, VPC, CloudFront</p>
    
    <h3>Recon Automation Bash Script</h3>
    <p>Automated reconnaissance and vulnerability scanning with endpoint enumeration and comprehensive reporting. Technologies: Bash, Nmap, OWASP ZAP, FFUF, WPScan</p>
    
    <h3>TSCM Product Design</h3>
    <p>Built hardware-assisted tool to detect hidden surveillance devices with access control integration. Achieved 35% detection accuracy improvement.</p>
    
    <h3>Web Vulnerability Testing Lab</h3>
    <p>Created comprehensive lab to simulate and exploit OWASP Top 10 vulnerabilities for VAPT practice. Technologies: OWASP Juice Shop, bWAPP, Metasploit, Docker</p>
  </div>
</body>
</html>`;

      // Return HTML for now - we'll convert to PDF on the frontend
      res.setHeader('Content-Type', 'text/html');
      res.send(resumeHTML);

    } catch (error) {
      console.error('Error generating resume:', error);
      res.status(500).json({ error: 'Failed to generate resume' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
