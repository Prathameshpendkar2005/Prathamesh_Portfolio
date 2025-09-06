import { useEffect } from "react";
import { Shield, Lock, Server, Bug, Network } from "lucide-react";

export function ParallaxBackground() {
  useEffect(() => {
    // Cloud layers animation
    const cloudLayers = document.querySelectorAll('.cloud-layer');
    cloudLayers.forEach((layer, index) => {
      const element = layer as HTMLElement;
      element.style.animationDelay = `${-index * 3}s`;
      element.style.opacity = `${0.1 - index * 0.02}`;
    });

    // Firewall icons animation
    const firewallIcons = document.querySelectorAll('.firewall-icon');
    firewallIcons.forEach((icon, index) => {
      const element = icon as HTMLElement;
      element.style.animationDelay = `${-index * 2}s`;
    });
  }, []);

  return (
    <>
      {/* Cloud Layers */}
      <div className="parallax-layer cloud-layer"></div>
      <div className="parallax-layer cloud-layer"></div>
      <div className="parallax-layer cloud-layer"></div>

      {/* Firewall Icons */}
      <div className="firewall-icon fixed top-[10%] left-[5%] text-4xl text-neon opacity-10 animate-float pointer-events-none">
        <Shield />
      </div>
      <div className="firewall-icon fixed top-[25%] right-[8%] text-3xl text-neon opacity-10 animate-float pointer-events-none" style={{ animationDelay: '-2s' }}>
        <Lock />
      </div>
      <div className="firewall-icon fixed top-[60%] left-[12%] text-5xl text-neon opacity-10 animate-float pointer-events-none" style={{ animationDelay: '-4s' }}>
        <Network />
      </div>
      <div className="firewall-icon fixed top-[80%] right-[15%] text-3xl text-neon opacity-10 animate-float pointer-events-none" style={{ animationDelay: '-1s' }}>
        <Bug />
      </div>
      <div className="firewall-icon fixed top-[45%] right-[25%] text-4xl text-neon opacity-10 animate-float pointer-events-none" style={{ animationDelay: '-3s' }}>
        <Server />
      </div>
    </>
  );
}
