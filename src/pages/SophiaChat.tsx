import { useState } from "react";
import { Link } from "react-router-dom";
import { ConversationDemo } from "@/components/ConversationDemo";
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
    { icon: FileCheck, label: "Get Pre-Approved", type: "process" as const },
    { icon: Home, label: "First-Time Buyer Guide", type: "info" as const },
    { icon: Zap, label: "Refinance Options", type: "info" as const },
    { icon: DollarSign, label: "Calculate Affordability", type: "info" as const },
  ];

  const smartPrompts = [
    "What's my estimated payment?",
    "Check today's rates",
    "Can I qualify with FHA?",
    "Pre-approve me now",
    "Connect me to Matt",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-primary/20 sticky top-0 z-50">
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

      {/* Sophia Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-b border-primary/20 p-4">
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

        {/* Key Features */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-card/60 backdrop-blur-sm rounded-lg p-2 border border-primary/20 text-center">
            <p className="text-lg">🌐</p>
            <p className="text-[10px] font-semibold text-foreground">24/7 Available</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-lg p-2 border border-primary/20 text-center">
            <p className="text-lg">⚡</p>
            <p className="text-[10px] font-semibold text-foreground">Instant Answers</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-lg p-2 border border-primary/20 text-center">
            <p className="text-lg">🎯</p>
            <p className="text-[10px] font-semibold text-foreground">Personalized</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <ConversationDemo />
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t border-primary/20 space-y-3 bg-card/50 backdrop-blur-lg">
        {/* Smart Prompt Pills */}
        <div className="flex flex-wrap gap-1.5">
          {smartPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="px-2.5 py-1 text-[10px] bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full transition-all hover:scale-105"
            >
              {prompt}
            </button>
          ))}
        </div>
        
        <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
        
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant={action.type === 'process' ? 'default' : 'outline'}
              size="sm"
              className={`justify-start text-xs h-8 px-2.5 ${
                action.type === 'process' 
                  ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-semibold' 
                  : 'border-primary/20 hover:bg-primary/10'
              }`}
              onClick={() => {
                if (action.label === 'Get Pre-Approved') {
                  sendMessage("I'd like to get pre-approved for a mortgage. Can you guide me through the process and collect my information?");
                } else if (action.label === 'First-Time Buyer Guide') {
                  sendMessage("I'm a first-time homebuyer. Can you explain the process and what I need to know?");
                } else if (action.label === 'Refinance Options') {
                  sendMessage("I'm interested in refinancing my mortgage. What are my options and how does it work?");
                } else if (action.label === 'Calculate Affordability') {
                  sendMessage("How much home can I afford? Can you help me calculate what I can borrow based on my income?");
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
