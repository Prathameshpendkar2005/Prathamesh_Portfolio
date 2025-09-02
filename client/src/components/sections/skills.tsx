import { TerminalWindow } from "@/components/ui/terminal-window";
import { 
  Cloud, UserCheck, Shield, Code, Wrench, Server, Database, 
  Network, Layers, BarChart, Monitor, Search, Bug, 
  Terminal, Container, GitBranch, Settings
} from "lucide-react";

const skillCategories = [
  {
    id: "cloud-security",
    title: "Cloud Security",
    icon: Cloud,
    tools: [
      { name: "AWS", icon: Cloud },
      { name: "EC2", icon: Server },
      { name: "S3", icon: Database },
      { name: "VPC", icon: Network },
      { name: "IAM", icon: UserCheck },
      { name: "Azure Cloud", icon: Cloud },
      { name: "Google Cloud Platform", icon: Cloud },
      { name: "CloudFront", icon: Network },
      { name: "WAF", icon: Shield }
    ]
  },
  {
    id: "vapt-tools",
    title: "VAPT Tools",
    icon: Search,
    tools: [
      { name: "Nmap", icon: Search },
      { name: "Naabu", icon: Network },
      { name: "Burp Suite", icon: Bug },
      { name: "OWASP ZAP", icon: Shield },
      { name: "SQLMap", icon: Database },
      { name: "Nikto", icon: Search },
      { name: "Kali Linux", icon: Terminal },
      { name: "Metasploit", icon: Bug }
    ]
  },
  {
    id: "soc-siem",
    title: "SOC / SIEM",
    icon: Monitor,
    tools: [
      { name: "Elasticsearch", icon: Database },
      { name: "Logstash", icon: Settings },
      { name: "Kibana", icon: BarChart },
      { name: "Wazuh SIEM", icon: Shield },
      { name: "Microsoft Sentinel", icon: Monitor },
      { name: "Zabbix Monitoring", icon: Monitor },
      { name: "Prometheus", icon: BarChart },
      { name: "Splunk", icon: Database },
      { name: "Fleet Server", icon: Server },
      { name: "Grafana", icon: BarChart }
    ]
  },
  {
    id: "devops-automation",
    title: "DevOps & Automation",
    icon: Settings,
    tools: [
      { name: "Docker", icon: Container },
      { name: "Kubernetes", icon: Layers },
      { name: "Python", icon: Code },
      { name: "Bash", icon: Terminal },
      { name: "Git", icon: GitBranch },
      { name: "Terraform", icon: Settings },
      { name: "Ansible", icon: Settings },
      { name: "Infrastructure as Code", icon: Code }
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

        <div className="grid lg:grid-cols-2 gap-8">
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
                    
                    <div className="grid grid-cols-2 gap-3">
                      {category.tools?.map((tool) => {
                        const ToolIcon = tool.icon;
                        return (
                          <div 
                            key={tool.name}
                            className="flex items-center gap-2 bg-terminal px-3 py-2 rounded text-sm font-mono text-neon hover:bg-border transition-colors"
                            data-testid={`tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <ToolIcon size={16} />
                            <span>{tool.name}</span>
                          </div>
                        );
                      })}
                    </div>
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
