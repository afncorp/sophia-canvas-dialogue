import { useState } from "react";
import { Link } from "react-router-dom";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, FileCheck, Home, Zap, DollarSign } from "lucide-react";
import sophiaVideo from "@/assets/sophia-video.mp4";
import afnLogoWhite from "@/assets/afn-logo-white.png";

const SophiaChat = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [voiceModeActive, setVoiceModeActive] = useState(false);

  const quickActions = [
    { icon: Zap, label: "Market Update" },
    { icon: Home, label: "My Neighborhood" },
    { icon: FileCheck, label: "Guidelines" },
    { icon: DollarSign, label: "Refi Benefit" },
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
      {/* Fixed Header */}
      <header className="flex-shrink-0 bg-card/50 backdrop-blur-lg border-b border-primary/20 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <img 
            src={afnLogoWhite} 
            alt="AFN Logo" 
            className="h-8 w-auto"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`w-9 h-9 transition-all ${voiceModeActive ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'}`}
            onClick={() => setVoiceModeActive(!voiceModeActive)}
            title={voiceModeActive ? "Switch to Text Chat" : "Switch to Voice Mode"}
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Fixed Sophia Header */}
      <div className="flex-shrink-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-b border-primary/20 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden ring-2 ring-primary/40 shadow-lg">
              <video 
                src={sophiaVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md ring-1 ring-background">
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">Sophia AI</h1>
            <p className="text-xs text-muted-foreground">Your Mortgage Assistant • 24/7 Available</p>
          </div>
        </div>

        {voiceModeActive && (
          <div className="mt-3 p-2 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-lg text-center border border-primary/30 animate-fade-in">
            <p className="text-xs text-primary font-semibold">🎙️ Voice Mode Active</p>
          </div>
        )}
      </div>

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 overflow-hidden ring-1 ring-primary/40">
              <video 
                src={sophiaVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-muted/50 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%] border border-primary/10">
              <p className="text-sm text-foreground">
                Hi! I'm Sophia, your AI mortgage assistant. How can I help you today?
              </p>
            </div>
          </div>
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}
      </div>

      {/* Fixed Input Area */}
      <div className="flex-shrink-0 p-4 border-t border-primary/20 space-y-3 bg-card/50 backdrop-blur-lg">
        <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
        
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              className="justify-start text-xs h-8 px-2.5 border-primary/20 hover:bg-primary/10"
              onClick={() => {
                if (action.label === 'Market Update') {
                  sendMessage("Give me today's mortgage market update. What's happening with rates and what should I know?");
                } else if (action.label === 'My Neighborhood') {
                  sendMessage("I want to understand my neighborhood's real estate market. Can you help me analyze property values and trends in my area?");
                } else if (action.label === 'Guidelines') {
                  sendMessage("Help me understand lending guidelines. What are the requirements for different loan programs?");
                } else if (action.label === 'Refi Benefit') {
                  sendMessage("Help me calculate if refinancing makes sense for me. What would be my potential savings?");
                } else {
                  sendMessage(`Tell me about ${action.label.toLowerCase()}`);
                }
              }}
            >
              <action.icon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
              <span className="truncate">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SophiaChat;
