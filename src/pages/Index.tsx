import { useState, useEffect } from "react";
import { SophiaCharacter } from "@/components/SophiaCharacter";
import { ConversationDemo } from "@/components/ConversationDemo";
import { SophiaMessage } from "@/components/SophiaMessage";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessages } from "@/components/ChatMessages";
import { useChat } from "@/hooks/useChat";
import { Sparkles, Brain, Zap, MessageSquare } from "lucide-react";

const sectionMessages: Record<string, string> = {
  capabilities: "I can help you understand different loan types, calculate affordability, and guide you through the mortgage process!",
  "use-cases": "Whether you're buying your first home or refinancing, I'm here to make the process simple and stress-free.",
  ready: "Ready to start your home buying journey? Let's find the perfect loan for you!"
};

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { messages, isLoading, sendMessage } = useChat();

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionEnter = (section: string) => {
    if (section !== "hero" && section !== currentSection) {
      setCurrentSection(section);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Sophia Character - follows scroll */}
      <SophiaCharacter scrollProgress={scrollProgress} onSectionEnter={handleSectionEnter} />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-6xl w-full ml-80">
          <div className="text-center mb-12 space-y-6">
            <h1 className="text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Meet Sophia
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your mortgage loan officer assistant, here to guide you home
            </p>
          </div>
          
          {/* Conversation Demo */}
          <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-border/50">
            <ConversationDemo />
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-6xl w-full ml-80">
          <h2 className="text-4xl font-bold mb-12 text-center">What I Can Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-glow transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Loan Expertise</h3>
              <p className="text-muted-foreground">
                I understand conventional, FHA, VA, and USDA loans, helping you find the best option for your situation.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-glow transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Affordability Calculator</h3>
              <p className="text-muted-foreground">
                I'll help you calculate what you can afford based on your income, savings, and credit profile.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-glow transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Process Guidance</h3>
              <p className="text-muted-foreground">
                From pre-approval to closing, I'll walk you through each step of the mortgage process.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-glow transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Refinance Options</h3>
              <p className="text-muted-foreground">
                Already own a home? I can help you explore refinancing to lower your rate or tap into equity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-6xl w-full ml-80">
          <h2 className="text-4xl font-bold mb-12 text-center">How You Can Use Me</h2>
          <div className="space-y-6">
            {[
              { title: "First-Time Home Buyers", desc: "Navigate the home buying process with confidence and understand your loan options" },
              { title: "Refinancing", desc: "Lower your monthly payment, reduce your interest rate, or access your home equity" },
              { title: "Pre-Approval Guidance", desc: "Get pre-approved faster by understanding exactly what documents and information you need" },
              { title: "Loan Comparison", desc: "Compare conventional, FHA, VA, and USDA loans to find your best fit" },
              { title: "Down Payment Planning", desc: "Explore down payment assistance programs and strategies to maximize your budget" }
            ].map((useCase, index) => (
              <div 
                key={index} 
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-glow hover:border-primary/30 transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Chat Section */}
      <section id="ready" className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-6xl w-full ml-80">
          <div className="text-center space-y-8">
            <h2 className="text-5xl font-bold">Ready to Find Your Dream Home?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's explore your mortgage options together. Ask me anything about home loans!
            </p>
            
            <div className="w-full max-w-3xl mx-auto pt-8">
              {messages.length > 0 && (
                <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-border/50 mb-6 max-h-[400px] overflow-y-auto">
                  <ChatMessages messages={messages} isLoading={isLoading} />
                </div>
              )}
              
              <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
              
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground pt-4 text-center">
                  Try asking: "What credit score do I need?" or "How much do I need for a down payment?"
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
