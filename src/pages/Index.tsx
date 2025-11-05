import { ConversationDemo } from "@/components/ConversationDemo";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import VoiceInterface from "@/components/VoiceInterface";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { useChat } from "@/hooks/useChat";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, DollarSign, Zap, Home, CreditCard, Users, Award, Phone, Mail, ArrowRight, ChevronDown, Search, Menu } from "lucide-react";
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

  // Scroll animation hooks for different sections
  const heroSection = useScrollAnimation({ threshold: 0.2 });
  const contactCard = useScrollAnimation({ threshold: 0.2 });
  const ctaSection = useScrollAnimation({ threshold: 0.3 });
  const sophiaSection = useScrollAnimation({ threshold: 0.3 });
  const processSection = useScrollAnimation({ threshold: 0.2 });
  const videoSection = useScrollAnimation({ threshold: 0.2 });
  const calculatorSection = useScrollAnimation({ threshold: 0.2 });
  const reviewsSection = useScrollAnimation({ threshold: 0.2 });

  const quickActions = [
    { icon: MessageSquare, label: "Loan Options" },
    { icon: DollarSign, label: "Affordability" },
    { icon: Zap, label: "Refinancing" },
    { icon: CreditCard, label: "Pre-Approval" },
    { icon: Home, label: "First-Time Buyers" },
    { icon: Users, label: "Down Payments" },
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Animated background gradient */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
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
            className={`bg-card/50 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-700 delay-200 ${
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
            className={`relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl md:rounded-2xl p-6 md:p-8 text-center border border-primary/30 transition-all duration-700 delay-300 ${
              ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">Ready to Get Started?</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">Get pre-approved in minutes with our streamlined AI-powered process</p>
              <Button size="lg" className="text-base md:text-lg px-6 md:px-8 w-full md:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/30">
                Start Your Application
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sophia AI Benefits */}
          <div 
            ref={sophiaSection.ref}
            className={`bg-card/50 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-primary/20 shadow-lg transition-all duration-700 delay-400 ${
              sophiaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center">
              <div className="relative mx-auto md:mx-0">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-glow-pulse"></div>
                <img 
                  src={sophiaRobot}
                  alt="Sophia AI Assistant"
                  className="relative w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Meet Sophia - Your AI Assistant</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  Our AI-powered assistant is here 24/7 to help you navigate the mortgage process
                </p>
                <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Instant Answers:</strong> Get immediate responses to your mortgage questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Smart Recommendations:</strong> AI analyzes your situation to suggest the best loan options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Faster Processing:</strong> Automated document analysis cuts approval time by 60%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Always Available:</strong> Unlike traditional lenders, Sophia never sleeps</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Right 1/4 - Sophia Panel - Hidden on mobile, shown as sidebar on desktop */}
        <div className="hidden md:flex md:w-1/4 bg-card/50 backdrop-blur-lg border-l border-primary/20 flex-col relative z-10">
        {/* Header with Sophia */}
        <div className="flex-shrink-0 p-4 border-b border-primary/20">
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
        <div className="flex-shrink-0 p-3 border-t border-primary/20 space-y-2">
          <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
          
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="justify-start text-[10px] h-7 px-2 border-primary/20 hover:bg-primary/10"
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

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Traditional */}
              <div className={`bg-card/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border transition-all duration-700 delay-200 ${
                processSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-muted-foreground">Traditional Process</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">The old way</p>
                </div>
                <div className="space-y-4">
                  {[
                    { step: "1", label: "Initial Consultation", time: "1-2 days wait" },
                    { step: "2", label: "Document Collection", time: "3-5 days" },
                    { step: "3", label: "Manual Review", time: "5-7 business days" },
                    { step: "4", label: "Underwriting", time: "7-10 business days" },
                    { step: "5", label: "Approval Decision", time: "Total: 3-4 weeks" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 p-3 bg-muted/20 rounded-lg border border-border/30">
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 text-sm font-bold text-muted-foreground">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI-Enhanced */}
              <div className={`bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 rounded-2xl p-6 md:p-8 border-2 border-primary/40 shadow-lg shadow-primary/20 relative overflow-hidden transition-all duration-700 delay-400 ${
                processSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-primary">AI-Enhanced Process</h3>
                    <p className="text-xs md:text-sm text-secondary mt-1">The modern way</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { step: "1", label: "Chat with Sophia", time: "Instant response", icon: Zap },
                      { step: "2", label: "Smart Document Upload", time: "Minutes", icon: Zap },
                      { step: "3", label: "AI Analysis & Verification", time: "Real-time", icon: Zap },
                      { step: "4", label: "Automated Pre-Approval", time: "Same day", icon: Zap },
                      { step: "5", label: "Final Approval", time: "Total: 5-7 days", icon: Zap },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4 p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/20">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-sm font-bold text-white shadow-lg">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{item.label}</p>
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-xs text-secondary font-medium">{item.time}</p>
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

          {/* AI Workflow Video Placeholder */}
          <section 
            ref={videoSection.ref}
            className="space-y-6 md:space-y-8"
          >
            <div className={`text-center space-y-2 md:space-y-3 transition-all duration-700 ${
              videoSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">See Our AI Workflow in Action</h2>
              <p className="text-sm md:text-lg text-muted-foreground">Watch how our AI technology transforms the mortgage process</p>
            </div>

            <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
              videoSection.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/20 group cursor-pointer hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                {/* Video placeholder background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 z-10 relative">
                    {/* Play button */}
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-2xl shadow-primary/50 animate-glow-pulse">
                      <div className="w-0 h-0 border-t-[12px] md:border-t-[16px] border-t-transparent border-l-[20px] md:border-l-[26px] border-l-white border-b-[12px] md:border-b-[16px] border-b-transparent ml-1.5 md:ml-2"></div>
                    </div>
                    <div className="space-y-2 px-4">
                      <p className="text-lg md:text-xl font-bold text-foreground">Traditional vs AI-Enhanced Workflow</p>
                      <p className="text-sm md:text-base text-muted-foreground">See the comparison in under 2 minutes</p>
                    </div>
                  </div>
                </div>
                
                {/* Animated decorative elements */}
                <div className="absolute top-4 left-4 w-16 h-16 md:w-24 md:h-24 bg-primary/30 rounded-full blur-2xl animate-float"></div>
                <div className="absolute bottom-4 right-4 w-20 h-20 md:w-32 md:h-32 bg-secondary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 md:w-40 md:h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
              </div>
              
              <p className="text-center text-xs md:text-sm text-muted-foreground mt-4">
                Video coming soon - showcasing our AI-powered mortgage process
              </p>
            </div>
          </section>

          {/* Calculator Section */}
          <section 
            ref={calculatorSection.ref}
            className="space-y-6 md:space-y-8"
          >
            <div className={`text-center space-y-2 md:space-y-3 transition-all duration-700 ${
              calculatorSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">Calculate Your Monthly Payment</h2>
              <p className="text-sm md:text-lg text-muted-foreground">Get an instant estimate of your mortgage costs</p>
            </div>

            <div className={`bg-card/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-primary/20 shadow-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              calculatorSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Home Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input type="number" placeholder="500,000" className="w-full pl-8 pr-4 py-3 bg-muted/20 border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Down Payment</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input type="number" placeholder="100,000" className="w-full pl-8 pr-4 py-3 bg-muted/20 border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Interest Rate</label>
                    <div className="relative">
                      <input type="number" step="0.01" placeholder="6.5" className="w-full px-4 py-3 bg-muted/20 border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Loan Term</label>
                    <select className="w-full px-4 py-3 bg-muted/20 border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                      <option>30 Years</option>
                      <option>20 Years</option>
                      <option>15 Years</option>
                      <option>10 Years</option>
                    </select>
                  </div>
                </div>
                <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">Calculate Payment</Button>
                <div className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border-2 border-primary/30 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Payment</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">$2,528</p>
                  <p className="text-xs text-muted-foreground mt-2">Principal & Interest only. Excludes taxes and insurance.</p>
                </div>
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
          <section className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-primary/20 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">200+</div>
                <p className="text-xs md:text-sm text-muted-foreground">Branches Nationwide</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">1,000+</div>
                <p className="text-xs md:text-sm text-muted-foreground">5-Star Reviews</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">15+</div>
                <p className="text-xs md:text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">24/7</div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: "Conventional", icon: Home, desc: "Traditional financing with competitive rates" },
                { name: "FHA Loans", icon: Users, desc: "Low down payment options for first-time buyers" },
                { name: "VA Loans", icon: Award, desc: "Special benefits for military veterans" },
                { name: "Jumbo Loans", icon: DollarSign, desc: "Financing for luxury properties" },
              ].map((program) => (
                <div key={program.name} className="bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-primary/20 shadow-lg hover:shadow-primary/20 hover:border-primary/40 transition-all group">
                  <program.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{program.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">{program.desc}</p>
                  <Button variant="outline" size="sm" className="w-full border-primary/30 hover:bg-primary/10">Learn More</Button>
                </div>
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
    </div>
  );
};

export default Index;
