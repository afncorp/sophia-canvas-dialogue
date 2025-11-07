import { ConversationDemo } from "@/components/ConversationDemo";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import VoiceInterface from "@/components/VoiceInterface";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { LiveCounters } from "@/components/LiveCounters";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { LoanProgramsTabs } from "@/components/LoanProgramsTabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollingSophiaBubble } from "@/components/ScrollingSophiaBubble";
import { ChatFormField, FormField } from "@/components/ChatFormField";
import { useChat } from "@/hooks/useChat";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, DollarSign, Zap, Home, CreditCard, Users, Award, Phone, Mail, ArrowRight, ChevronDown, Search, Menu, Mic, FileCheck, X } from "lucide-react";
import sophiaVideo from "@/assets/sophia-video.mp4";
import sophiaRobot from "@/assets/sophia-robot.png";
import mattMainePhoto from "@/assets/matt-maine.jpeg";
import afnLogo from "@/assets/afn-logo.png";
import afnLogoWhite from "@/assets/afn-logo-white.png";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
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
  const [showFreeQuoteForm, setShowFreeQuoteForm] = useState(false);
  const [showSophiaChat, setShowSophiaChat] = useState(true);
  const [chatPosition, setChatPosition] = useState({ x: window.innerWidth - 420, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Scroll animation hooks for different sections
  const heroSection = useScrollAnimation({ threshold: 0.2 });
  const contactCard = useScrollAnimation({ threshold: 0.2 });
  const ctaSection = useScrollAnimation({ threshold: 0.3 });
  const processSection = useScrollAnimation({ threshold: 0.2 });
  const videoCalcSection = useScrollAnimation({ threshold: 0.2 });
  const reviewsSection = useScrollAnimation({ threshold: 0.2 });

  // Scroll to chat function
  const scrollToChat = () => {
    setShowSophiaChat(true);
    const chatElement = document.getElementById('sophia-chat');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Drag handlers for floating chat
  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - chatPosition.x,
      y: e.clientY - chatPosition.y
    });
  };

  const handleDragMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setChatPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  }, [isDragging, dragOffset]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Handle Free Quote submission
  const handleFreeQuoteSubmit = (data: Record<string, string>) => {
    const message = `I'd like a free quote. Here's my information:\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone}\n` +
      `Loan Type: ${data.loanType}\n` +
      `Property Value: ${data.propertyValue}\n\n` +
      `Please have a loan officer contact me.`;
    
    sendMessage(message);
    setShowFreeQuoteForm(false);
  };

  const freeQuoteFields: FormField[] = [
    { id: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
    { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
    { id: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '(555) 123-4567' },
    { 
      id: 'loanType', 
      label: 'Loan Type', 
      type: 'select', 
      required: true,
      options: ['Purchase', 'Refinance', 'Cash-Out Refinance', 'Not Sure']
    },
    { id: 'propertyValue', label: 'Estimated Property Value', type: 'text', placeholder: '$500,000' },
  ];

  const quickActions = [
    { icon: FileCheck, label: "Get Pre-Approved", type: "process" as const },
    { icon: Home, label: "First-Time Buyer Guide", type: "info" as const },
    { icon: Zap, label: "Refinance Options", type: "info" as const },
    { icon: DollarSign, label: "Calculate Affordability", type: "info" as const },
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
              <ThemeToggle />
              <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                Login
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary via-primary-glow to-secondary hover:opacity-90 shadow-lg shadow-primary/30">
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
      <div className="flex-1 flex flex-col lg:flex-row relative">
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

        {/* Content Area - Full width */}
        <div className="w-full flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="max-w-5xl w-full space-y-6 md:space-y-8">
          {/* Hero Section - Matt Maine Profile */}
          <div 
            ref={heroSection.ref}
            className={`transition-all duration-700 ${
              heroSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-primary/30 shadow-2xl shadow-primary/15 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
                {/* Photo */}
                <div className="relative mx-auto md:mx-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-2xl animate-glow-pulse"></div>
                  <img 
                    src={mattMainePhoto} 
                    alt="Matt Maine - Mortgage Loan Officer"
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-2 border-primary/40 shadow-xl"
                  />
                </div>

                {/* Info */}
                <div className="space-y-4 text-center md:text-left">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">Matt Maine</h1>
                    <p className="text-base md:text-xl text-primary font-semibold mb-1">Senior Mortgage Loan Officer</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      15+ years experience • NMLS #12345 • Licensed Nationwide
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Award key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm md:text-base font-semibold text-foreground">4.9/5.0</span>
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground">(200+ reviews)</span>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Specializing in first-time homebuyers, refinancing, and investment properties. 
                    Helped hundreds of families achieve their homeownership dreams with personalized service.
                  </p>

                  {/* Contact Buttons */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Text
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Badge */}
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full border border-primary/20">
                <span className="text-xs md:text-sm text-muted-foreground">Partnered with</span>
                <span className="text-xs md:text-sm font-bold text-foreground">American Financial Network</span>
                <span className="text-xs text-muted-foreground">• 24 years in business</span>
              </div>
            </div>
          </div>

          {/* AI-Powered Badge - Prominent placement */}
          <div 
            className={`flex justify-center transition-all duration-700 delay-200 ${
              heroSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative px-6 py-3 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/20 border-2 border-primary/50 rounded-full backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary animate-glow-pulse" />
                  <span className="text-sm md:text-base font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    AI-Powered Mortgage Technology
                  </span>
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-secondary animate-glow-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Sophia Bubble - Hero Section */}
          <div className="hidden lg:block">
            <ScrollingSophiaBubble
              message="Hi! I'm Sophia, your AI mortgage assistant. I can help you get pre-approved, explain loan programs, and answer any questions instantly. Want to get started?"
              section="hero"
              onChatClick={scrollToChat}
            />
          </div>

          {/* CTA Section - Streamlined */}
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
                <p className="text-sm md:text-base text-muted-foreground">Choose your path forward</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
                {/* Apply Now - Main CTA */}
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-6 md:px-8 h-auto py-5 bg-gradient-to-r from-primary via-secondary to-primary hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 shadow-lg shadow-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 w-full">
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">Apply Now</div>
                      <div className="text-xs opacity-90 mt-0.5">Start your full loan application</div>
                    </div>
                  </div>
                </Button>

                {/* Talk to Matt - Human Connection */}
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-base md:text-lg px-6 md:px-8 h-auto py-5 border-primary/40 hover:bg-primary/10 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Phone className="w-6 h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">Talk to Matt</div>
                      <div className="text-xs opacity-70 mt-0.5">Call or text (555) 123-4567</div>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Sophia Help Text */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/30">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <p className="text-xs md:text-sm text-foreground">
                    Have questions first? <button onClick={scrollToChat} className="text-primary hover:underline font-semibold">Chat with Sophia AI</button> for instant answers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Floating Sophia Icon - Shows when chat is hidden */}
        {!showSophiaChat && (
          <button
            onClick={() => setShowSophiaChat(true)}
            className="fixed w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden ring-2 ring-primary/40 hover:ring-primary/60 transition-all shadow-lg shadow-primary/20 hover:scale-110 z-50 group"
            style={{ left: `${chatPosition.x}px`, top: `${chatPosition.y}px` }}
          >
            <video 
              src={sophiaVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg animate-glow-pulse">
              <MessageSquare className="w-4 h-4 text-primary-foreground" />
            </div>
          </button>
        )}

        {/* Floating Sophia Panel - Draggable */}
        {showSophiaChat && (
          <div 
            className="hidden lg:block fixed w-96 max-h-[600px] bg-card/95 backdrop-blur-lg border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 z-50"
            style={{ 
              left: `${chatPosition.x}px`, 
              top: `${chatPosition.y}px`,
              cursor: isDragging ? 'grabbing' : 'default'
            }}
          >
            <div className="h-full flex flex-col max-h-[600px]">
              {/* Compact Header - Draggable */}
              <div 
                className="flex-shrink-0 border-b border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/3 to-transparent cursor-grab active:cursor-grabbing"
                onMouseDown={handleDragStart}
              >
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden ring-2 ring-primary/40 shadow-lg">
                        <video 
                          src={sophiaVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md ring-1 ring-background">
                        <div className="w-1 h-1 bg-primary-foreground rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-foreground">Sophia AI</h2>
                      <p className="text-[10px] text-muted-foreground">Your Mortgage Assistant</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`w-9 h-9 transition-all ${voiceModeActive ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'}`}
                      onClick={() => setVoiceModeActive(!voiceModeActive)}
                      title={voiceModeActive ? "Switch to Text Chat" : "Switch to Voice Mode"}
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 hover:bg-primary/10"
                      onClick={() => setShowSophiaChat(false)}
                      title="Hide chat"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

              {voiceModeActive && (
                <div className="mx-3 mb-3 p-2 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-lg text-center border border-primary/30 shadow-lg shadow-primary/10 animate-fade-in">
                  <p className="text-xs text-primary font-semibold">🎙️ Voice Mode Active</p>
                </div>
              )}
            </div>

            {/* Chat Area - Scrollable */}
            <div id="sophia-chat" className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
              {messages.length === 0 ? (
                <ConversationDemo />
              ) : (
                <>
                  <ChatMessages messages={messages} isLoading={isLoading} />
                  
                  {/* Show form if requested */}
                  {showFreeQuoteForm && (
                    <div className="animate-fade-in">
                      <ChatFormField
                        fields={freeQuoteFields}
                        onSubmit={handleFreeQuoteSubmit}
                        onCancel={() => setShowFreeQuoteForm(false)}
                        submitLabel="Get Free Quote"
                      />
                    </div>
                  )}
                </>
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
          </div>
        )}

        {/* Mobile Sophia Panel - Shows below content on mobile */}
        <div className="lg:hidden w-full bg-card/50 backdrop-blur-lg border-t border-primary/20 relative z-10">
          {/* Collapsible Header with Sophia */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => {
                const chatArea = document.getElementById('mobile-chat-area');
                if (chatArea) {
                  chatArea.classList.toggle('hidden');
                }
              }}
              className="w-full p-3 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-b border-primary/20 hover:from-primary/15 transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden flex-shrink-0 ring-2 ring-primary/40 shadow-lg shadow-primary/20">
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
                  <div className="text-left">
                    <h2 className="font-bold text-base text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sophia AI</h2>
                    <p className="text-[10px] text-muted-foreground">Tap to chat • 24/7 Available</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" id="mobile-chat-chevron" />
              </div>
            </button>

            <div id="mobile-chat-area" className="hidden">
              {/* Key Features - Mobile Compact */}
              <div className="grid grid-cols-3 gap-1.5 p-3 bg-muted/10">
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-1.5 border border-primary/20 text-center">
                  <p className="text-base">🌐</p>
                  <p className="text-[8px] font-semibold text-foreground">24/7</p>
                </div>
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-1.5 border border-primary/20 text-center">
                  <p className="text-base">⚡</p>
                  <p className="text-[8px] font-semibold text-foreground">Instant</p>
                </div>
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-1.5 border border-primary/20 text-center">
                  <p className="text-base">🎯</p>
                  <p className="text-[8px] font-semibold text-foreground">Personal</p>
                </div>
              </div>

              {voiceModeActive && (
                <div className="mx-3 mb-2 p-2 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-lg text-center border border-primary/30 animate-fade-in">
                  <p className="text-xs text-primary font-semibold">🎙️ Voice Active</p>
                </div>
              )}

              {/* Chat Area - Scrollable with improved mobile height */}
              <div className="overflow-y-auto p-3 space-y-3" style={{ maxHeight: 'calc(100vh - 400px)', minHeight: '300px' }}>
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
          </div>
        </div>
      </div>

      {/* Below the Fold Content - Full Width */}
      <div className="w-full bg-gradient-to-b from-background to-muted/20 py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
          
          {/* Sophia Bubble - Process Section */}
          <div className="hidden lg:block mb-6 max-w-5xl mx-auto">
            <ScrollingSophiaBubble
              message="Curious how AI makes mortgages faster? Let me walk you through the traditional process vs. our AI-enhanced approach. The difference is remarkable!"
              section="process"
              onChatClick={scrollToChat}
            />
          </div>

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

            <div className="grid sm:grid-cols-2 gap-3 md:gap-8">
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

          {/* Sophia Bubble - Calculator Section */}
          <div className="hidden lg:block mb-6 max-w-5xl mx-auto">
            <ScrollingSophiaBubble
              message="Want to know what your monthly payment could be? Try our calculator below, and if you have questions about rates or programs, just ask me!"
              section="calculator"
              onChatClick={scrollToChat}
            />
          </div>

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
            {/* Sophia Bubble - Loan Programs */}
            <div className="hidden lg:block mb-6 max-w-5xl mx-auto">
              <ScrollingSophiaBubble
                message="Not sure which loan program is right for you? Let's chat! I can help you understand your options and find the perfect fit for your situation."
                section="programs"
                onChatClick={scrollToChat}
              />
            </div>
            
            <LoanProgramsTabs onAskSophia={(message) => {
              sendMessage(message);
              scrollToChat();
            }} />
          </section>

        </div>
      </div>

      {/* Compliance Footer - Spans Full Width */}
      <footer className="relative bg-gradient-to-b from-background via-card/50 to-background border-t border-primary/20 py-6 md:py-8 px-4 md:px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-lg blur-xl"></div>
                <img 
                  src={afnLogoWhite} 
                  alt="American Financial Network Logo" 
                  className="h-12 md:h-16 w-auto relative drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                />
              </div>
            </div>

            {/* Compliance Content */}
            <div className="flex-1 space-y-4">
              {/* Main Compliance Text */}
              <div className="text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">
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
                  Matt Maine (NMLS #12345). American Financial Network, Inc. For licensing information, go to: <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors underline decoration-primary/50 hover:decoration-secondary">www.nmlsconsumeraccess.org</a>
                </p>
                <p>
                  Contact: matt.maine@afnet.com | (555) 123-4567 | Licensed to serve nationwide
                </p>
              </div>

              {/* Links and Copyright */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-primary/20">
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors relative group">
                    Privacy Policy
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#" className="hover:text-primary transition-colors relative group">
                    Terms of Service
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#" className="hover:text-primary transition-colors relative group">
                    Licensing
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#" className="hover:text-primary transition-colors relative group">
                    Disclosures
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} American Financial Network (Team AFN). All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sample Website Disclaimer */}
      <div className="relative bg-gradient-to-r from-destructive/15 via-destructive/20 to-destructive/15 border-t border-destructive/40 py-4 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-center text-sm md:text-base font-bold text-foreground flex items-center justify-center gap-2">
            <span className="text-destructive">⚠️</span>
            SAMPLE WEBSITE - NOT FOR OFFICIAL MORTGAGE USE - NOT FOR USE BY CONSUMERS
            <span className="text-destructive">⚠️</span>
          </p>
          <p className="text-center text-xs text-muted-foreground mt-1">
            This is a demonstration website for development purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
