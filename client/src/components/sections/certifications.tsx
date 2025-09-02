import { TerminalWindow } from "@/components/ui/terminal-window";
import { Award, Cloud, UserCheck, Search } from "lucide-react";

const certifications = [
  {
    id: "aws-cert",
    title: "AWS Cloud Certification",
    provider: "SevenMentor",
    year: "2025",
    description: "Cloud Security & Infrastructure",
    status: "In Progress",
    statusColor: "bg-accent text-background",
    icon: Cloud
  },
  {
    id: "comptia-pentest",
    title: "CompTIA PenTest+",
    provider: "Udemy",
    year: "In Progress",
    description: "Penetration Testing & Vulnerability Assessment",
    status: "In Progress",
    statusColor: "bg-accent text-background",
    icon: UserCheck
  },
  {
    id: "dfe-cert",
    title: "Digital Forensics Essentials (DFE)",
    provider: "EC-Council",
    year: "March 2023",
    description: "Digital Forensics & Incident Response",
    status: "Certified",
    statusColor: "bg-neon text-background",
    icon: Search
  }
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="min-h-screen py-20 px-4" data-testid="certifications-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Award size={36} />
            Certifications
          </h2>
          <p className="text-muted">Professional cybersecurity credentials</p>
        </div>

        <div className="space-y-6">
          {certifications.map((cert) => {
            const IconComponent = cert.icon;
            return (
              <div key={cert.id} data-testid={`certification-${cert.id}`}>
                <TerminalWindow title={`${cert.id}.json`} hover>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl text-neon">
                        <IconComponent size={48} />
                      </div>
                      <div>
                        <h3 className="text-lg font-mono font-bold text-foreground">{cert.title}</h3>
                        <p className="text-muted">{cert.provider} • {cert.year}</p>
                        <p className="text-sm text-accent font-mono">{cert.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`${cert.statusColor} px-3 py-1 rounded font-mono text-sm`}>
                        {cert.status}
                      </div>
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
