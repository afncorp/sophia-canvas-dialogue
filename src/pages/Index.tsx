import { useState, useEffect } from "react";
import { SophiaCharacter } from "@/components/SophiaCharacter";
import { ConversationDemo } from "@/components/ConversationDemo";
import { SophiaMessage } from "@/components/SophiaMessage";
import { ChatInput } from "@/components/ChatInput";
import { Sparkles, Brain, Zap, MessageSquare } from "lucide-react";

const sectionMessages: Record<string, string> = {
  capabilities: "Let me show you what I can do! I'm great at understanding context and providing detailed answers.",
  "use-cases": "I can help with so many different tasks - from research to creative writing!",
  ready: "Ready to chat? I'm here to help you with whatever you need!"
};

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("");
  const [showMessage, setShowMessage] = useState(false);

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
      
      {/* Sophia's contextual messages */}
      <SophiaMessage 
        message={sectionMessages[currentSection] || ""} 
        show={showMessage && currentSection !== "hero"}
      />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-6xl w-full ml-80">
          <div className="text-center mb-12 space-y-6">
            <h1 className="text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Meet Sophia
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your intelligent AI assistant, ready to help with anything
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
              <h3 className="text-xl font-semibold mb-3">Smart Understanding</h3>
              <p className="text-muted-foreground">
                I understand context, nuance, and can engage in meaningful conversations about complex topics.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-glow transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Creative Solutions</h3>
              <p className="text-muted-foreground">
                From brainstorming ideas to writing content, I help you create amazing things.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-glow transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Answers</h3>
              <p className="text-muted-foreground">
                Get quick, accurate responses to your questions with detailed explanations when needed.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-glow transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Natural Conversation</h3>
              <p className="text-muted-foreground">
                Chat with me like you would with a colleague - I'm here to listen and help.
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
              { title: "Research & Analysis", desc: "Deep dive into topics, analyze data, and get comprehensive insights" },
              { title: "Content Creation", desc: "Write articles, social media posts, marketing copy, and more" },
              { title: "Learning & Education", desc: "Understand complex concepts, get explanations, and explore new subjects" },
              { title: "Planning & Strategy", desc: "Develop plans, brainstorm strategies, and organize your thoughts" },
              { title: "Problem Solving", desc: "Work through challenges and find creative solutions together" }
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
            <h2 className="text-5xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm here and ready to help. Just type your question or tell me what you need!
            </p>
            <div className="pt-8">
              <ChatInput />
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              Try asking me about anything - research, writing, planning, or just chat!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
