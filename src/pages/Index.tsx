import { ConversationDemo } from "@/components/ConversationDemo";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import VoiceInterface from "@/components/VoiceInterface";
import { useChat } from "@/hooks/useChat";
import { MessageSquare, DollarSign, Zap, Home, CreditCard, Users, Award, Phone, Mail, ArrowRight } from "lucide-react";
import sophiaVideo from "@/assets/sophia-video.mp4";
import sophiaRobot from "@/assets/sophia-robot.png";
import mattMainePhoto from "@/assets/matt-maine.jpeg";
import afnLogo from "@/assets/afn-logo.png";
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
      {/* Header */}
      <header className="bg-white border-b border-border/50 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <img 
            src={afnLogo} 
            alt="American Financial Network Logo" 
            className="h-16 w-auto"
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left 3/4 - Content Area */}
        <div className="w-3/4 flex items-center justify-center p-8">
        <div className="max-w-5xl w-full space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-foreground">Meet Your Loan Officer, Matt Maine</h2>
            <p className="text-lg text-muted-foreground">
              15+ years experience • NMLS #12345 • Licensed Nationwide
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9/5.0 (200+ reviews)</span>
            </div>
          </div>

          {/* Compact Contact Card */}
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
              {/* Photo */}
              <img 
                src={mattMainePhoto} 
                alt="Matt Maine - Mortgage Loan Officer"
                className="w-32 h-32 rounded-xl object-cover shadow-soft mx-auto md:mx-0"
              />

              {/* Info Grid */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Matt Maine</h3>
                  <p className="text-base text-primary font-semibold">Senior Mortgage Loan Officer</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Specializing in first-time homebuyers, refinancing, and investment properties. 
                  Helped hundreds of families achieve their homeownership dreams with personalized service.
                </p>

                {/* Contact Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" className="w-full">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Text
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-4">Get pre-approved in minutes with our streamlined process</p>
            <Button size="lg" className="text-lg px-8">
              Start Your Application
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Sophia AI Benefits */}
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
              <img 
                src={sophiaRobot}
                alt="Sophia AI Assistant"
                className="w-24 h-24 object-contain mx-auto md:mx-0"
              />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Meet Sophia - Your AI Assistant</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our AI-powered assistant is here 24/7 to help you navigate the mortgage process
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Instant Answers:</strong> Get immediate responses to your mortgage questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Smart Recommendations:</strong> AI analyzes your situation to suggest the best loan options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Faster Processing:</strong> Automated document analysis cuts approval time by 60%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Always Available:</strong> Unlike traditional lenders, Sophia never sleeps</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Right 1/4 - Sophia Panel */}
        <div className="w-1/4 bg-white border-l border-border/50 flex flex-col">
        {/* Header with Sophia */}
        <div className="flex-shrink-0 p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
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
              <h2 className="font-semibold text-base">Sophia</h2>
              <p className="text-xs text-muted-foreground">AI Assistant</p>
            </div>
          </div>
        </div>

        {/* Chat Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
          {messages.length === 0 ? (
            <ConversationDemo />
          ) : (
            <ChatMessages messages={messages} isLoading={isLoading} />
          )}
        </div>

        {/* Input Area - Always Visible */}
        <div className="flex-shrink-0 p-3 border-t border-border/50 space-y-2">
          <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
          
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="justify-start text-[10px] h-7 px-2"
                onClick={() => sendMessage(`Tell me about ${action.label.toLowerCase()}`)}
              >
                <action.icon className="w-3 h-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        </div>

        {/* Voice Interface */}
        <VoiceInterface onSpeakingChange={() => {}} />
      </div>

      {/* Compliance Footer - Spans Full Width */}
      <footer className="bg-[#3a3a3a] border-t border-white/20 py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src={afnLogo} 
                alt="American Financial Network Logo" 
                className="h-16 w-auto"
              />
            </div>

            {/* Compliance Content */}
            <div className="flex-1 space-y-4">
              {/* Main Compliance Text */}
              <div className="text-xs text-white/70 space-y-2">
                <p className="font-semibold text-white">
                  Equal Housing Opportunity | NMLS #12345 | Licensed Mortgage Loan Officer
                </p>
                <p>
                  This is not an offer to enter into an agreement. Not all customers will qualify. Information, rates, and programs are subject to change without prior notice. 
                  All products are subject to credit and property approval. Not all products are available in all states or for all loan amounts. Other restrictions and limitations apply.
                </p>
                <p>
                  Licensed by the Department of Financial Protection and Innovation under the California Residential Mortgage Lending Act. 
                  Loans made or arranged pursuant to a California Residential Mortgage Lending Act License.
                </p>
                <p>
                  Matt Maine (NMLS #12345). American Financial Network, Inc. For licensing information, go to: <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">www.nmlsconsumeraccess.org</a>
                </p>
                <p>
                  Contact: matt.maine@afnet.com | (555) 123-4567 | Licensed to serve nationwide
                </p>
              </div>

              {/* Links and Copyright */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-4 text-xs text-white/70">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Licensing</a>
                  <a href="#" className="hover:text-white transition-colors">Disclosures</a>
                </div>
                <p className="text-xs text-white/70">
                  © {new Date().getFullYear()} American Financial Network (Team AFN). All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
