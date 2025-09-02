import { TerminalWindow } from "@/components/ui/terminal-window";
import { Cloud, UserCheck, Shield, Code, Wrench, Server } from "lucide-react";

const skillCategories = [
  {
    id: "cloud-security",
    title: "Cloud Security",
    icon: Cloud,
    skills: [
      { name: "AWS (EC2, S3, IAM)", level: 90 },
      { name: "Azure & GCP", level: 75 },
      { name: "Infrastructure as Code", level: 80 }
    ]
  },
  {
    id: "penetration-testing",
    title: "Penetration Testing",
    icon: UserCheck,
    skills: [
      { name: "Web App Security", level: 95 },
      { name: "Network Security", level: 85 },
      { name: "OWASP Top 10", level: 90 }
    ]
  },
  {
    id: "soc-monitoring",
    title: "SOC & Monitoring",
    icon: Shield,
    skills: [
      { name: "SIEM (ELK, Wazuh)", level: 85 },
      { name: "Incident Response", level: 80 },
      { name: "Threat Hunting", level: 75 }
    ]
  },
  {
    id: "programming",
    title: "Programming",
    icon: Code,
    skills: [
      { name: "Python", level: 85 },
      { name: "Bash Scripting", level: 90 },
      { name: "Java", level: 70 }
    ]
  },
  {
    id: "security-tools",
    title: "Security Tools",
    icon: Wrench,
    tools: ["Burp Suite", "Metasploit", "Nmap", "OWASP ZAP", "SQLMap", "Nikto", "WPScan", "FFUF"]
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: Server,
    skills: [
      { name: "Docker & Kubernetes", level: 80 },
      { name: "Linux Administration", level: 90 },
      { name: "Windows Admin", level: 75 }
    ]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen py-20 px-4" data-testid="skills-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Wrench size={36} />
            Skills & Technologies
          </h2>
          <p className="text-muted">Expertise across cybersecurity domains</p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} data-testid={`skill-category-${category.id}`}>
                <TerminalWindow title={category.id}>
                  <div>
                    <h3 className="text-lg font-mono font-bold text-accent mb-4 flex items-center gap-2">
                      <IconComponent size={20} />
                      {category.title}
                    </h3>
                    
                    {category.skills ? (
                      <div className="space-y-3">
                        {category.skills.map((skill) => (
                          <div key={skill.name} className="skill-item" data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-mono">{skill.name}</span>
                              <span className="text-neon">{skill.level}%</span>
                            </div>
                            <div className="skill-bar">
                              <div 
                                className="skill-progress" 
                                style={{ width: `${skill.level}%` }}
                                data-testid={`skill-progress-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {category.tools?.map((tool) => (
                          <span 
                            key={tool}
                            className="bg-terminal px-2 py-1 rounded text-xs font-mono text-neon"
                            data-testid={`tool-tag-${tool.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </TerminalWindow>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
