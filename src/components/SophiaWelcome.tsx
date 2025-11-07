import { useEffect, useState } from "react";
import sophiaVideo from "@/assets/sophia-video.mp4";

interface SophiaWelcomeProps {
  onComplete?: () => void;
}

export const SophiaWelcome = ({ onComplete }: SophiaWelcomeProps) => {
  const [showTyping, setShowTyping] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  
  const greetings = [
    "Hi there! 👋 I'm Sophia, your AI mortgage assistant. I'm here 24/7 to help you navigate your home buying journey!",
    "Welcome! 🏡 I'm Sophia, ready to help you find the perfect mortgage solution. Feel free to ask me anything!",
    "Hello! ✨ I'm Sophia, your personal mortgage guide. Whether you're a first-time buyer or refinancing, I'm here to help!",
  ];
  
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  useEffect(() => {
    // Show typing indicator for 2 seconds
    const typingTimer = setTimeout(() => {
      setShowTyping(false);
      setShowMessage(true);
    }, 2000);
    
    return () => clearTimeout(typingTimer);
  }, []);
  
  useEffect(() => {
    if (!showMessage) return;
    
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character
    
    const typeInterval = setInterval(() => {
      if (currentIndex < greeting.length) {
        setDisplayedText(greeting.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Call onComplete after message is fully typed
        setTimeout(() => {
          onComplete?.();
        }, 1000);
      }
    }, typingSpeed);
    
    return () => clearInterval(typeInterval);
  }, [showMessage, greeting, onComplete]);
  
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Sophia's Avatar and Introduction */}
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-lg animate-glow-pulse"></div>
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center overflow-hidden ring-2 ring-primary/40 shadow-lg shadow-primary/20">
            <video 
              src={sophiaVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1">
          {showTyping && (
            <div className="bg-card rounded-2xl px-4 py-3 shadow-soft border border-primary/10 animate-pulse">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-muted-foreground">Sophia is typing...</span>
              </div>
            </div>
          )}
          
          {showMessage && (
            <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-2xl px-4 py-3 shadow-lg border-2 border-primary/20 animate-fade-in">
              <p className="text-sm leading-relaxed text-foreground">
                {displayedText}
                {displayedText.length < greeting.length && (
                  <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse"></span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick action hints after message completes */}
      {showMessage && displayedText.length === greeting.length && (
        <div className="pl-15 animate-fade-in">
          <p className="text-xs text-muted-foreground mb-2">Quick actions you can try:</p>
          <div className="flex flex-wrap gap-2">
            <div className="text-xs px-3 py-1.5 bg-muted/50 rounded-full border border-primary/20">
              💰 Check current rates
            </div>
            <div className="text-xs px-3 py-1.5 bg-muted/50 rounded-full border border-primary/20">
              🏠 First-time buyer info
            </div>
            <div className="text-xs px-3 py-1.5 bg-muted/50 rounded-full border border-primary/20">
              🔄 Refinancing options
            </div>
          </div>
        </div>
      )}
    </div>
  );
};