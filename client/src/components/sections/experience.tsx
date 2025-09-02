import { TerminalWindow } from "@/components/ui/terminal-window";
import { Briefcase } from "lucide-react";

const experiences = [
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

export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-20 px-4" data-testid="experience-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Briefcase size={36} />
            Professional Experience
          </h2>
          <p className="text-muted">Cybersecurity internships and hands-on experience</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} data-testid={`experience-${exp.id}`}>
              <TerminalWindow title={`${exp.id}.log`} hover>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-mono font-bold text-neon">{exp.title}</h3>
                      <p className="text-accent font-mono">{exp.company}</p>
                    </div>
                    <div className="text-muted font-mono text-sm">
                      {exp.duration}
                    </div>
                  </div>
                  
                  <div className={`${exp.achievements.length > 2 ? 'grid md:grid-cols-2 gap-4' : 'space-y-2'} text-sm`}>
                    {exp.achievements.map((achievement, index) => (
                      <p key={index} className="font-mono text-foreground">
                        <span className="text-neon">{'>'}</span> {achievement}
                      </p>
                    ))}
                  </div>
                </div>
              </TerminalWindow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
