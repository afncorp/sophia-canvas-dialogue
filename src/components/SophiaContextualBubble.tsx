import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import sophiaVideo from "@/assets/sophia-video.mp4";

interface SophiaContextualBubbleProps {
  message: string;
  onClick: () => void;
  position?: 'left' | 'right';
}

export const SophiaContextualBubble = ({ 
  message, 
  onClick,
  position = 'right' 
}: SophiaContextualBubbleProps) => {
  return (
    <div 
      className={`flex items-start gap-3 ${position === 'left' ? 'flex-row' : 'flex-row-reverse'} animate-fade-in cursor-pointer group`}
      onClick={onClick}
    >
      {/* Sophia Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden ring-2 ring-primary/40 group-hover:ring-primary/60 transition-all shadow-lg shadow-primary/20">
          <video 
            src={sophiaVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg animate-glow-pulse">
          <MessageSquare className="w-3 h-3 text-primary-foreground" />
        </div>
      </div>

      {/* Speech Bubble */}
      <div className={`max-w-xs bg-gradient-to-br from-card to-card/80 backdrop-blur-md border border-primary/30 rounded-2xl p-4 shadow-xl shadow-primary/10 group-hover:shadow-primary/20 group-hover:border-primary/50 transition-all ${
        position === 'left' ? 'rounded-tl-sm' : 'rounded-tr-sm'
      }`}>
        <p className="text-sm text-foreground leading-relaxed">
          {message}
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 text-xs text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto"
        >
          Chat with me →
        </Button>
      </div>
    </div>
  );
};
