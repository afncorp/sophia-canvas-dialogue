import { ConversationDemo } from "@/components/ConversationDemo";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import VoiceInterface from "@/components/VoiceInterface";
import { useChat } from "@/hooks/useChat";
import { MessageSquare, DollarSign, Zap, Home, CreditCard, Users, Award, Phone, Mail, ArrowRight } from "lucide-react";
import sophiaVideo from "@/assets/sophia-video.mp4";
import sophiaRobot from "@/assets/sophia-robot.png";
import mattMainePhoto from "@/assets/matt-maine.jpeg";
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
      <div className="w-2/3 flex items-center justify-center p-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-5xl font-bold text-foreground/80">Meet Your Loan Officer, Matt Maine</h1>
            <p className="text-xl text-muted-foreground">
              His AI-powered assistant Sophia is here to get you started. 
              <span className="block mt-2">Prefer a human? We're just one click away.</span>
            </p>
          </div>

          {/* Loan Officer Section */}
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-border/50">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Photo */}
              <div className="flex-shrink-0">
                <img 
                  src={mattMainePhoto} 
                  alt="Matt Maine - Mortgage Loan Officer"
                  className="w-48 h-48 rounded-2xl object-cover shadow-soft"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-1">Matt Maine</h2>
                  <p className="text-lg text-primary font-semibold">Senior Mortgage Loan Officer</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
                    <Award className="w-5 h-5" />
                    <span>NMLS #12345 • Licensed in Multiple States</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
                    <Phone className="w-5 h-5" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
                    <Mail className="w-5 h-5" />
                    <span>matt.maine@example.com</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  With over 15 years of experience in mortgage lending, Matt specializes in helping first-time homebuyers, 
                  refinancing, and investment properties. His commitment to personalized service and expertise in navigating 
                  complex loan scenarios has helped hundreds of families achieve their homeownership dreams.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Phone className="w-4 h-4 mr-2" />
                    Talk to Matt Directly
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </div>

            {/* Sophia Section */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <img 
                    src={sophiaRobot}
                    alt="Sophia AI Assistant"
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-foreground mb-2">Hi! I am Sophia 👋</h3>
                  <p className="text-lg text-muted-foreground">
                    Ask me anything to get started! I'm here 24/7 to answer your mortgage questions and help you 
                    find the perfect loan.
                  </p>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <ArrowRight className="w-20 h-20 text-primary animate-pulse" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right 1/3 - Sophia Panel */}
      <div className="w-1/3 bg-white border-l border-border/50 flex flex-col h-screen">
        {/* Header with Sophia */}
        <div className="flex-shrink-0 p-6 border-b border-border/50">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
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
              <h2 className="font-semibold text-xl">Meet Sophia</h2>
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
