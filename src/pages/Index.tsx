import { ConversationDemo } from "@/components/ConversationDemo";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import VoiceInterface from "@/components/VoiceInterface";
import { useChat } from "@/hooks/useChat";
import { MessageSquare, DollarSign, Zap, Home, CreditCard, Users } from "lucide-react";
import sophiaVideo from "@/assets/sophia-video.mp4";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { messages, isLoading, sendMessage } = useChat();

  const quickActions = [
    { icon: MessageSquare, label: "Loan Options" },
    { icon: DollarSign, label: "Affordability" },
    { icon: Zap, label: "Refinancing" },
    { icon: CreditCard, label: "Pre-Approval" },
    { icon: Home, label: "First-Time Buyers" },
    { icon: Users, label: "Down Payments" },
  ];

  return (
    <div className="h-screen flex" style={{ backgroundColor: '#fafafa' }}>
      {/* Left 2/3 - Content Area */}
      <div className="w-2/3 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground/80">Your Mortgage Journey Starts Here</h1>
          <p className="text-xl text-muted-foreground">Chat with Sophia to explore your options</p>
        </div>
      </div>

      {/* Right 1/3 - Sophia Panel */}
      <div className="w-1/3 bg-white border-l border-border/50 flex flex-col h-screen">
        {/* Header with Sophia */}
        <div className="flex-shrink-0 p-4 border-b border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              <video 
                src={sophiaVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Meet Sophia</h2>
              <p className="text-sm text-muted-foreground">Your AI Mortgage Assistant</p>
            </div>
          </div>
        </div>

        {/* Chat Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.length === 0 ? (
            <ConversationDemo />
          ) : (
            <ChatMessages messages={messages} isLoading={isLoading} />
          )}
        </div>

        {/* Input Area - Always Visible */}
        <div className="flex-shrink-0 p-4 border-t border-border/50 space-y-3">
          <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
          
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="justify-start text-xs h-8"
                onClick={() => sendMessage(`Tell me about ${action.label.toLowerCase()}`)}
              >
                <action.icon className="w-3 h-3 mr-1.5" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Interface */}
      <VoiceInterface onSpeakingChange={() => {}} />
    </div>
  );
};

export default Index;
