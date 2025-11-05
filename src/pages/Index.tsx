import { ConversationDemo } from "@/components/ConversationDemo";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import VoiceInterface from "@/components/VoiceInterface";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { LiveCounters } from "@/components/LiveCounters";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { useChat } from "@/hooks/useChat";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, DollarSign, Zap, Home, CreditCard, Users, Award, Phone, Mail, ArrowRight, ChevronDown, Search, Menu, Mic, FileCheck } from "lucide-react";
import sophiaVideo from "@/assets/sophia-video.mp4";
import sophiaRobot from "@/assets/sophia-robot.png";
import mattMainePhoto from "@/assets/matt-maine.jpeg";
import afnLogo from "@/assets/afn-logo.png";
import afnLogoWhite from "@/assets/afn-logo-white.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voiceModeActive, setVoiceModeActive] = useState(false);

  // Scroll animation hooks for different sections
  const heroSection = useScrollAnimation({ threshold: 0.2 });
  const contactCard = useScrollAnimation({ threshold: 0.2 });
  const ctaSection = useScrollAnimation({ threshold: 0.3 });
  const sophiaSection = useScrollAnimation({ threshold: 0.3 });
  const processSection = useScrollAnimation({ threshold: 0.2 });
  const videoCalcSection = useScrollAnimation({ threshold: 0.2 });
  const reviewsSection = useScrollAnimation({ threshold: 0.2 });

  const quickActions = [
    { icon: FileCheck, label: "Pre-Approval", type: "process" as const },
    { icon: MessageSquare, label: "Loan Options", type: "info" as const },
    { icon: DollarSign, label: "Affordability", type: "info" as const },
    { icon: Zap, label: "Refinancing", type: "info" as const },
    { icon: CreditCard, label: "Rates", type: "info" as const },
    { icon: Home, label: "First-Time Buyers", type: "info" as const },
  ];

  const testimonials = [
    {
      name: "Anthony",
      review: "They do everything they can to help you. The entire team was professional and made the process smooth.",
      rating: 5,
      location: "Los Angeles, CA"
    },
    {
      name: "Henrry",
      review: "Very nice people. They answered all my questions and were patient throughout the entire process.",
      rating: 5,
      location: "San Diego, CA"
    },
    {
      name: "Cindy",
      review: "Anthony, Jarod and their whole team walked me through this whole process, which at times was overwhelming, and kept me on track. With their knowledge, patience and support we stayed on task and got it done.",
      rating: 5,
      location: "Phoenix, AZ"
    },
    {
      name: "Michael R.",
      review: "The AI assistant Sophia made getting pre-approved so easy! I had answers to all my questions instantly, and the whole process was faster than I expected.",
      rating: 5,
      location: "Austin, TX"
    },
    {
      name: "Sarah L.",
      review: "As a first-time homebuyer, I was nervous about the process. Matt and his team made everything simple and stress-free. Highly recommend!",
      rating: 5,
      location: "Seattle, WA"
    },
    {
      name: "David P.",
      review: "Refinancing was a breeze with this team. The technology they use is impressive, and they saved me thousands on my monthly payment.",
      rating: 5,
      location: "Denver, CO"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo + Company Name */}
            <div className="flex items-center gap-3 md:gap-4">
              <img 
                src={afnLogoWhite} 
                alt="AFN Logo" 
                className="h-10 md:h-12 w-auto"
              />
              <div className="hidden md:block">
                <div className="text-base font-bold text-foreground">American Financial Network</div>
                <div className="text-xs text-muted-foreground">Licensed Nationwide • NMLS #6606</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <a href="#locations" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Locations
              </a>
              <a href="#testimonials" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Testimonials
              </a>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none">
                  Resources <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border z-50">
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Mortgage Calculator</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Learning Center</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Blog</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted">FAQs</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none">
                  Company <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border z-50">
                  <DropdownMenuItem className="text-foreground hover:bg-muted">About Us</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Our Team</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Careers</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none">
                  Account <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border z-50">
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Sign In</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Create Account</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted">Track Application</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                Free Quote
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/30">
                Apply Now
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-primary/10">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-primary/20 py-4 space-y-4 bg-card/50 backdrop-blur-lg">
              <a href="#locations" className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Locations
              </a>
              <a href="#testimonials" className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Testimonials
              </a>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">Resources</p>
                <div className="pl-4 space-y-2">
                  <a href="#calculator" className="block py-1 text-sm text-foreground hover:text-primary">Mortgage Calculator</a>
                  <a href="#learning" className="block py-1 text-sm text-foreground hover:text-primary">Learning Center</a>
                  <a href="#blog" className="block py-1 text-sm text-foreground hover:text-primary">Blog</a>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">Company</p>
                <div className="pl-4 space-y-2">
                  <a href="#about" className="block py-1 text-sm text-foreground hover:text-primary">About Us</a>
                  <a href="#team" className="block py-1 text-sm text-foreground hover:text-primary">Our Team</a>
                  <a href="#contact" className="block py-1 text-sm text-foreground hover:text-primary">Contact</a>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <Button className="w-full border-primary/30" variant="outline">Free Quote</Button>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">Apply Now</Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Live Counters */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-primary/10 sticky top-[73px] md:top-[77px] z-40">
        <LiveCounters />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Animated grid background */}
        <div className="fixed inset-0 pointer-events-none animated-grid opacity-30 z-0"></div>
        
        {/* Animated background gradient blobs and particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Floating gradient blobs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-secondary/12 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-[550px] h-[550px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          
          {/* Particle effects - primary colored */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg shadow-primary/50 animate-particle-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-gradient-to-br from-secondary to-accent rounded-full shadow-lg shadow-secondary/50 animate-particle-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-gradient-to-br from-accent to-primary rounded-full shadow-lg shadow-accent/50 animate-particle-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-primary/80 rounded-full shadow-md shadow-primary/40 animate-particle-drift" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-secondary/80 rounded-full shadow-md shadow-secondary/40 animate-particle-drift" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/2 right-2/3 w-1 h-1 bg-accent/80 rounded-full shadow-md shadow-accent/40 animate-particle-float" style={{ animationDelay: '3s' }}></div>
          
          {/* Subtle tech lines with gradient */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/15 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent"></div>
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        </div>

        {/* Content Area - Full width on mobile, 3/4 on desktop */}
        <div className="w-full md:w-3/4 flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="max-w-5xl w-full space-y-6 md:space-y-8">
          {/* Hero Section */}
          <div 
            ref={heroSection.ref}
            className={`text-center space-y-2 md:space-y-3 transition-all duration-700 ${
              heroSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full mb-4">
              <span className="text-xs md:text-sm font-semibold text-primary animate-glow-pulse">
                AI-Powered Mortgage Technology
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">Meet Your Loan Officer, Matt Maine</h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              15+ years experience • NMLS #12345 • Licensed Nationwide
            </p>
            <p className="text-xs md:text-sm text-muted-foreground/80 mt-1">
              Partnered with American Financial Network • 24 years in business
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-xs md:text-sm font-semibold text-foreground">4.9/5.0 (200+ reviews)</span>
            </div>
          </div>

          {/* Compact Contact Card */}
          <div 
            ref={contactCard.ref}
            className={`bg-card/40 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-primary/30 shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:border-primary/40 transition-all duration-700 delay-200 ${
              contactCard.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-start">
              {/* Photo */}
              <div className="relative mx-auto md:mx-0">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl"></div>
                <img 
                  src={mattMainePhoto} 
                  alt="Matt Maine - Mortgage Loan Officer"
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover border-2 border-primary/30"
                />
              </div>

              {/* Info Grid */}
              <div className="space-y-3 md:space-y-4 text-center md:text-left">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">Matt Maine</h3>
                  <p className="text-sm md:text-base text-primary font-semibold">Senior Mortgage Loan Officer</p>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Specializing in first-time homebuyers, refinancing, and investment properties. 
                  Helped hundreds of families achieve their homeownership dreams with personalized service.
                </p>

                {/* Contact Buttons */}
                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                  <Button size="sm" className="w-full text-xs md:text-sm h-8 md:h-9 bg-primary hover:bg-primary/90">
                    <Phone className="w-3 h-3 md:w-4 md:h-4 md:mr-1" />
                    <span className="hidden md:inline">Call</span>
                  </Button>
                  <Button size="sm" variant="outline" className="w-full text-xs md:text-sm h-8 md:h-9 border-primary/30 hover:bg-primary/10">
                    <Mail className="w-3 h-3 md:w-4 md:h-4 md:mr-1" />
                    <span className="hidden md:inline">Email</span>
                  </Button>
                  <Button size="sm" variant="outline" className="w-full text-xs md:text-sm h-8 md:h-9 border-primary/30 hover:bg-primary/10">
                    <MessageSquare className="w-3 h-3 md:w-4 md:h-4 md:mr-1" />
                    <span className="hidden md:inline">Text</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div 
            ref={ctaSection.ref}
            className={`relative overflow-hidden bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 rounded-xl md:rounded-2xl p-6 md:p-8 border border-primary/40 shadow-xl shadow-primary/20 transition-all duration-700 delay-300 ${
              ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
            <div className="relative space-y-4 md:space-y-6">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">Ready to Get Started?</h3>
                <p className="text-sm md:text-base text-muted-foreground">Choose how you'd like to begin your mortgage journey</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-6 md:px-8 h-auto py-4 bg-gradient-to-r from-primary via-secondary to-primary hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 shadow-lg shadow-primary/30 transition-all duration-300 group"
                  onClick={() => sendMessage("I'd like to get pre-approved. Can you help me start the process?")}
                >
                  <FileCheck className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-bold">Get Pre-Approved</div>
                    <div className="text-xs opacity-90">Start with Sophia</div>
                  </div>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-base md:text-lg px-6 md:px-8 h-auto py-4 border-primary/40 hover:bg-primary/10 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                  onClick={() => sendMessage("I'd like a loan officer to contact me about my options.")}
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-bold">Request Contact</div>
                    <div className="text-xs opacity-70">We'll reach out</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Sophia AI Benefits */}
          <div 
            ref={sophiaSection.ref}
            className={`bg-card/40 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-primary/30 shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:border-primary/40 transition-all duration-700 delay-400 ${
              sophiaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center">
              <div className="relative mx-auto md:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-glow-pulse"></div>
                <img 
                  src={sophiaRobot}
                  alt="Sophia AI Assistant"
                  className="relative w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Meet Sophia</h3>
                <p className="text-sm md:text-base text-primary font-semibold mb-2 italic">
                  "I'm not like other boring chatbots – I can actually help you get approved."
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  AI-powered assistant available 24/7 to navigate your mortgage journey
                </p>
                <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Instant Answers:</strong> Get immediate responses, not waiting for business hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Smart Analysis:</strong> AI reviews your situation for the best loan options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">60% Faster:</strong> Automated processing cuts approval time dramatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Voice or Text:</strong> Chat or talk – whichever you prefer</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Right 1/4 - Sophia Panel - Shown on all devices */}
        <div className="w-full md:w-1/4 bg-card/50 backdrop-blur-lg border-t md:border-t-0 md:border-l border-primary/20 flex flex-col relative z-10">
        {/* Header with Sophia */}
        <div className="flex-shrink-0 p-4 border-b border-primary/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0 ring-2 ring-primary/30">
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
                <h2 className="font-semibold text-base text-foreground">Sophia</h2>
                <p className="text-xs text-muted-foreground">{voiceModeActive ? 'Voice Mode' : 'AI Assistant'}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className={`w-9 h-9 transition-all ${voiceModeActive ? 'bg-primary text-primary-foreground' : 'border-primary/30 hover:bg-primary/10'}`}
              onClick={() => setVoiceModeActive(!voiceModeActive)}
              title={voiceModeActive ? "Switch to Text Chat" : "Switch to Voice Mode"}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          {voiceModeActive && (
            <div className="mt-3 p-2 bg-primary/10 rounded-lg text-center">
              <p className="text-xs text-primary font-medium">🎙️ Voice mode active - Speak naturally</p>
            </div>
          )}
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
        <div className="flex-shrink-0 p-3 border-t border-primary/20 space-y-2">
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
                  if (action.label === 'Pre-Approval') {
                    sendMessage("I'd like to start the pre-approval process. Can you guide me through the steps?");
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

        {/* Voice Interface */}
        <VoiceInterface onSpeakingChange={() => {}} />
      </div>

      {/* Below the Fold Content - Full Width */}
      <div className="w-full bg-gradient-to-b from-background to-muted/20 py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
          
          {/* Process Flow Comparison */}
          <section 
            ref={processSection.ref}
            className="space-y-6 md:space-y-8"
          >
            <div className={`text-center space-y-2 md:space-y-3 transition-all duration-700 ${
              processSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">Traditional vs AI-Enhanced Process</h2>
              <p className="text-sm md:text-lg text-muted-foreground">See how our AI technology accelerates your mortgage journey</p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-8">
              {/* Traditional */}
              <div className={`bg-card/30 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border/50 hover:border-border transition-all duration-700 delay-200 ${
                processSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
                <div className="text-center mb-4 md:mb-6">
                  <h3 className="text-sm md:text-2xl font-bold text-muted-foreground">Traditional Process</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground mt-1">Manual work, prone to human error</p>
                </div>
                <div className="space-y-4">
                  {[
                    { step: "1", label: "Wait for Office Hours", time: "1-2 days wait", desc: "Call during business hours" },
                    { step: "2", label: "Long Paper Application", time: "30-45 minutes", desc: "Fill out extensive forms" },
                    { step: "3", label: "Manual Document Review", time: "3-5 days", desc: "Human processing, potential errors" },
                    { step: "4", label: "Manual Underwriting", time: "7-10 business days", desc: "Slow human verification" },
                    { step: "5", label: "Approval Decision", time: "Total: 3-4 weeks", desc: "If no mistakes found" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-2 md:gap-4 p-2 md:p-3 bg-muted/20 rounded-lg border border-border/30">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-bold text-muted-foreground">
                        {item.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-xs md:text-base truncate">{item.label}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">{item.time}</p>
                        <p className="text-[8px] md:text-[10px] text-muted-foreground/70 mt-0.5 hidden md:block">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI-Enhanced */}
              <div className={`bg-gradient-to-br from-primary/15 via-secondary/12 to-accent/15 rounded-2xl p-4 md:p-8 border-2 border-primary/50 shadow-xl shadow-primary/25 relative overflow-hidden transition-all duration-700 delay-400 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/30 ${
                processSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5"></div>
                <div className="relative">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-sm md:text-2xl font-bold text-primary">AI-Enhanced Process</h3>
                    <p className="text-[10px] md:text-sm text-secondary mt-1">Automated, accurate, fast</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { step: "1", label: "Chat with Sophia 24/7", time: "Instant response", desc: "Available anytime, anywhere", icon: Zap },
                      { step: "2", label: "Easy Online/Phone Application", time: "5-10 minutes", desc: "Simple process guided by AI", icon: Zap },
                      { step: "3", label: "AI Document Analysis", time: "Real-time", desc: "Automated verification, zero errors", icon: Zap },
                      { step: "4", label: "Smart Pre-Approval", time: "Same day", desc: "AI + human review for accuracy", icon: Zap },
                      { step: "5", label: "Final Approval", time: "Total: 5-7 days", desc: "Faster, more reliable", icon: Zap },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-2 md:gap-4 p-2 md:p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/20">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-bold text-white shadow-lg">
                          {item.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 md:gap-2">
                            <p className="font-semibold text-foreground text-xs md:text-base truncate">{item.label}</p>
                            <item.icon className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                          </div>
                          <p className="text-[10px] md:text-xs text-secondary font-medium">{item.time}</p>
                          <p className="text-[8px] md:text-[10px] text-muted-foreground mt-0.5 hidden md:block">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`text-center transition-all duration-700 delay-600 ${
              processSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg shadow-primary/20">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary animate-glow-pulse" />
                <p className="text-base md:text-lg font-bold text-foreground">60% Faster Approval Time with AI</p>
              </div>
            </div>
          </section>

          {/* Video & Calculator Section - Side by Side */}
          <section 
            ref={videoCalcSection.ref}
            className="space-y-6 md:space-y-8"
          >
            <div className={`text-center space-y-2 md:space-y-3 transition-all duration-700 ${
              videoCalcSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">Experience & Calculate</h2>
              <p className="text-sm md:text-lg text-muted-foreground">See how we work and estimate your payment</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Video Section */}
              <div className={`transition-all duration-700 delay-200 ${
                videoCalcSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">AI Workflow Demo</h3>
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/20 group cursor-pointer hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-3 z-10 relative px-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-primary/50 animate-glow-pulse">
                        <div className="w-0 h-0 border-t-[10px] md:border-t-[12px] border-t-transparent border-l-[16px] md:border-l-[20px] border-l-white border-b-[10px] md:border-b-[12px] border-b-transparent ml-1 md:ml-1.5"></div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm md:text-base font-bold text-foreground">See the AI Difference</p>
                        <p className="text-xs md:text-sm text-muted-foreground">2 minute demo</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-2 w-12 h-12 md:w-16 md:h-16 bg-primary/30 rounded-full blur-xl animate-float"></div>
                  <div className="absolute bottom-2 right-2 w-16 h-16 md:w-20 md:h-20 bg-secondary/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Video coming soon
                </p>
              </div>

              {/* Calculator Section */}
              <div className={`transition-all duration-700 delay-400 ${
                videoCalcSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Payment Calculator</h3>
                <MortgageCalculator />
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section 
            ref={reviewsSection.ref}
            className="space-y-6 md:space-y-8"
          >
            <div className={`text-center space-y-2 md:space-y-3 transition-all duration-700 ${
              reviewsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">What Our Clients Say</h2>
              <div className="flex items-center justify-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-4 h-4 md:w-6 md:h-6 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm md:text-lg font-semibold">5.0/5.0 (1,000+ reviews)</span>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${
              reviewsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <TestimonialsCarousel testimonials={testimonials} />
            </div>
          </section>

          {/* Trust Badges */}
          <section className="bg-card/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-primary/30 shadow-xl shadow-primary/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">200+</div>
                <p className="text-xs md:text-sm text-muted-foreground">Branches Nationwide</p>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">1,000+</div>
                <p className="text-xs md:text-sm text-muted-foreground">5-Star Reviews</p>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">24</div>
                <p className="text-xs md:text-sm text-muted-foreground">Years in Business</p>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">24/7</div>
                <p className="text-xs md:text-sm text-muted-foreground">AI Support</p>
              </div>
            </div>
          </section>

          {/* Loan Programs */}
          <section className="space-y-6 md:space-y-8 pb-8">
            <div className="text-center space-y-2 md:space-y-3">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">Loan Programs We Offer</h2>
              <p className="text-sm md:text-lg text-muted-foreground">Find the perfect loan program for your unique situation</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {[
                { name: "Conventional", icon: Home, desc: "Traditional financing with competitive rates" },
                { name: "FHA Loans", icon: Users, desc: "Low down payment options for first-time buyers" },
                { name: "VA Loans", icon: Award, desc: "Special benefits for military veterans" },
                { name: "Jumbo Loans", icon: DollarSign, desc: "Financing for luxury properties" },
                { name: "Non-Agency", icon: CreditCard, desc: "Non-QM loans for investors and alternative documentation" },
              ].map((program) => (
                <button 
                  key={program.name} 
                  onClick={() => sendMessage(`Tell me about ${program.name} loans and whether they're right for my situation.`)}
                  className="bg-card/40 backdrop-blur-md rounded-2xl p-6 border border-primary/30 shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:border-primary/50 transition-all duration-300 group text-left w-full"
                >
                  <program.icon className="w-10 h-10 md:w-12 md:h-12 text-primary group-hover:text-secondary mb-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-300" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{program.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{program.desc}</p>
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Compliance Footer - Spans Full Width */}
      <footer className="bg-[#3a3a3a] border-t border-white/20 py-6 md:py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img 
                src={afnLogoWhite} 
                alt="American Financial Network Logo" 
                className="h-12 md:h-16 w-auto"
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

      {/* Sample Website Disclaimer */}
      <div className="bg-gradient-to-r from-destructive/20 to-destructive/10 border-t border-destructive/30 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm md:text-base font-bold text-destructive-foreground">
            ⚠️ SAMPLE WEBSITE - NOT FOR OFFICIAL MORTGAGE USE - NOT FOR USE BY CONSUMERS ⚠️
          </p>
          <p className="text-center text-xs text-destructive-foreground/80 mt-1">
            This is a demonstration website for development purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
