import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus after a short delay
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 1500);

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;
    
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative bg-card rounded-full shadow-glow p-2 border-2 border-primary/20 focus-within:border-primary transition-colors">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-6"
            disabled={disabled}
          />
          <Button 
            type="submit" 
            size="icon"
            className="rounded-full w-12 h-12 bg-gradient-to-br from-primary to-accent hover:shadow-glow transition-all"
            disabled={!message.trim() || disabled}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        {!message && showCursor && !disabled && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-foreground animate-pulse"></div>
        )}
      </div>
    </form>
  );
};
