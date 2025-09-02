import { useEffect } from "react";
import { useGSAP } from "@/hooks/use-gsap";
import { Navigation } from "@/components/ui/navigation";
import { ParallaxBackground } from "@/components/background/parallax-background";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { CertificationsSection } from "@/components/sections/certifications";
import { ExperienceSection } from "@/components/sections/experience";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  const { gsap, ScrollTrigger, loaded } = useGSAP();

  useEffect(() => {
    if (!loaded || !gsap || !ScrollTrigger) return;

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(section.children, 
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate skill bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
      const width = (bar as HTMLElement).style.width;
      gsap.fromTo(bar,
        { width: 0 },
        {
          width: width,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effect for cloud layers
    gsap.utils.toArray('.cloud-layer').forEach((layer: any, index: number) => {
      gsap.to(layer, {
        yPercent: -50 * (index + 1),
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Parallax effect for firewall icons
    gsap.utils.toArray('.firewall-icon').forEach((icon: any, index: number) => {
      gsap.to(icon, {
        y: -100 * (index + 1),
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [gsap, ScrollTrigger, loaded]);

  return (
    <div className="relative">
      {/* SEO Meta Tags */}
      <title>Prathamesh Pendkar - Cybersecurity Professional | Penetration Tester & Security Analyst</title>
      <meta name="description" content="Cybersecurity professional specializing in penetration testing, vulnerability assessment, and cloud security. AWS certified with hands-on experience in SOC monitoring, digital forensics, and security automation." />
      
      {/* Background Elements */}
      <ParallaxBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
