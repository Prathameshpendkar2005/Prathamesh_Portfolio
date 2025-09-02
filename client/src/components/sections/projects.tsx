import { TerminalWindow } from "@/components/ui/terminal-window";
import { Code } from "lucide-react";

const projects = [
  {
    id: "aws-security",
    title: "Secure Web Hosting on AWS EC2",
    description: "Deployed a web application on EC2 and S3 with custom IAM policies for least-privilege access and isolation.",
    tech: ["AWS EC2", "S3", "IAM", "VPC", "CloudFront"],
    details: [
      "Security Groups Configuration",
      "Route 53 DNS Setup",
      "WordPress Hardening"
    ]
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
    ]
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
    ]
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
    ]
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen py-20 px-4" data-testid="projects-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Code size={36} />
            Projects
          </h2>
          <p className="text-muted">Real-world cybersecurity implementations and research</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group" data-testid={`project-card-${project.id}`}>
              <TerminalWindow title={`${project.id}.sh`} hover>
                <div>
                  <h3 className="text-xl font-mono font-bold text-neon mb-3">{project.title}</h3>
                  <p className="text-muted mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-terminal px-3 py-1 rounded text-xs font-mono text-accent"
                        data-testid={`tech-tag-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.details.map((detail, index) => (
                      <p key={index} className="text-xs text-muted font-mono">
                        ├── {detail}
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
