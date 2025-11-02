import { useEffect, useState } from "react";
import sophiaVideo from "@/assets/sophia-video.mp4";

interface SophiaCharacterProps {
  scrollProgress: number;
  onSectionEnter?: (section: string) => void;
}

export const SophiaCharacter = ({ scrollProgress, onSectionEnter }: SophiaCharacterProps) => {
  const [position, setPosition] = useState(0);
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    // Calculate Sophia's position based on scroll
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollProgress / maxScroll;
    const newPosition = scrollPercentage * 70; // Move down up to 70vh
    setPosition(newPosition);

    // Detect which section we're in
    const sections = ["hero", "capabilities", "use-cases", "ready"];
    const sectionThresholds = [0, 0.25, 0.5, 0.75];
    
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollPercentage >= sectionThresholds[i]) {
        if (currentSection !== sections[i]) {
          setCurrentSection(sections[i]);
          onSectionEnter?.(sections[i]);
        }
        break;
      }
    }
  }, [scrollProgress, currentSection, onSectionEnter]);

  return (
    <div 
      className="fixed left-8 transition-all duration-700 ease-out z-50 pointer-events-none"
      style={{ 
        top: `${20 + position}vh`,
        transform: 'translateY(-50%)'
      }}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-3xl opacity-40 animate-pulse">
          <div className="w-full h-full bg-primary rounded-full"></div>
        </div>
        
        {/* Sophia video */}
        <video 
          src={sophiaVideo}
          autoPlay
          loop
          muted
          playsInline
          className="relative w-64 h-auto drop-shadow-2xl animate-float"
        />
      </div>
    </div>
  );
};
