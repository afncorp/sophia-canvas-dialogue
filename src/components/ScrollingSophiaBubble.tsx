import { useEffect, useState, useRef } from "react";
import { MessageSquare } from "lucide-react";
import sophiaVideo from "@/assets/sophia-video.mp4";

interface ScrollingSophiaBubbleProps {
  message: string;
  section: string;
  onChatClick: () => void;
}

export const ScrollingSophiaBubble = ({ 
  message, 
  section, 
  onChatClick 
}: ScrollingSophiaBubbleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (bubbleRef.current) {
      observer.observe(bubbleRef.current);
    }

    return () => {
      if (bubbleRef.current) {
        observer.unobserve(bubbleRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={bubbleRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
    >
      <div 
        className="flex items-start gap-3 animate-fade-in cursor-pointer group max-w-md"
        onClick={onChatClick}
      >
        {/* Sophia Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-xl animate-glow-pulse"></div>
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden ring-2 ring-primary/40 group-hover:ring-primary/60 transition-all shadow-lg shadow-primary/20 group-hover:shadow-primary/30">
            <video 
              src={sophiaVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg animate-glow-pulse ring-2 ring-background">
            <MessageSquare className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="flex-1 max-w-xs bg-gradient-to-br from-card to-card/80 backdrop-blur-md border border-primary/30 rounded-2xl rounded-tl-sm p-4 shadow-xl shadow-primary/10 group-hover:shadow-primary/20 group-hover:border-primary/50 transition-all">
          <p className="text-sm text-foreground leading-relaxed">
            {message}
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
            <span>Chat with me</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};
