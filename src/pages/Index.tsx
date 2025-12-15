import { Link } from "react-router-dom";
import { ConversationDemo } from "@/components/ConversationDemo";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import VoiceInterface from "@/components/VoiceInterface";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { LiveCounters } from "@/components/LiveCounters";
import { MortgageCalculator } from "@/components/calculator";
import { LoanProgramsTabs } from "@/components/LoanProgramsTabs";
import { ThemeToggle } from "@/components/ThemeToggle";

import { ChatFormField, FormField } from "@/components/ChatFormField";
import { useChat } from "@/hooks/useChat";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, DollarSign, Zap, Home, CreditCard, Users, Award, Phone, Mail, ArrowRight, ChevronDown, Search, Menu, Mic, FileCheck, X, UserPlus, Download } from "lucide-react";
import pathAppIcon from "@/assets/path-app-icon.png";
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
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Scroll animation hooks for different sections
  const heroSection = useScrollAnimation({ threshold: 0.2 });
  const contactCard = useScrollAnimation({ threshold: 0.2 });
  const ctaSection = useScrollAnimation({ threshold: 0.3 });
  const processSection = useScrollAnimation({ threshold: 0.2 });
  const videoCalcSection = useScrollAnimation({ threshold: 0.2 });
  const reviewsSection = useScrollAnimation({ threshold: 0.2 });

  // Scroll to chat function
  const scrollToChat = () => {
    const chatElement = document.getElementById('sophia-chat');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
    { icon: Zap, label: "Market Update", type: "info" as const },
    { icon: Home, label: "My Neighborhood", type: "info" as const },
    { icon: FileCheck, label: "Guidelines", type: "info" as const },
    { icon: DollarSign, label: "Refi Benefit", type: "info" as const },
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
              <Button size="sm" className="bg-gradient-to-r from-primary via-primary-glow to-secondary hover:opacity-90 shadow-lg shadow-primary/30">
                Apply Now
              </Button>
              <ThemeToggle />
            </div>

            {/* Mobile Header Actions */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
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
              <Link to="/sophia" className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Sophia AI
              </Link>
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
              <div className="pt-4 space-y-2 border-t border-primary/20">
                <Button className="w-full border-primary/30" variant="outline">Free Quote</Button>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">Apply Now</Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Live Counters */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-primary/10">
        <LiveCounters />
      </div>


      {/* Main Layout - Content (75%) + Fixed Chat Sidebar (25%) */}
      <div className="flex-1 flex relative min-h-0">
        {/* Animated background gradient blobs only - no grid/dots/particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Floating gradient blobs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-secondary/12 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-[550px] h-[550px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Scrollable Content Area - 75% on desktop, full on mobile */}
        <div className="w-full lg:w-3/4 p-4 md:p-8 relative z-10">
        <div className="max-w-4xl mx-auto w-full space-y-6 md:space-y-8">
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
                  <div className="flex flex-col md:flex-row gap-2 items-center md:justify-start">
                    <div className="flex gap-2 justify-center w-full md:w-auto">
                      <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 px-3 md:px-4 flex-1 md:flex-none">
                        <Phone className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Call</span>
                        <span className="md:hidden">Call</span>
                      </Button>
                      <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 px-3 md:px-4 flex-1 md:flex-none">
                        <Mail className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Email</span>
                        <span className="md:hidden">Email</span>
                      </Button>
                      <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 px-3 md:px-4 flex-1 md:flex-none">
                        <MessageSquare className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Text</span>
                        <span className="md:hidden">Text</span>
                      </Button>
                    </div>
                    {/* Save Contact - Bronze Button */}
                    <Button 
                      size="lg" 
                      className="relative overflow-hidden border-2 border-primary/60 shadow-lg shadow-primary/20 px-4 md:px-5 w-full md:w-auto"
                      style={{
                        background: 'linear-gradient(145deg, hsl(40 55% 65%), hsl(38 45% 50%), hsl(35 40% 40%))',
                      }}
                      onClick={() => {
                        const vcfContent = `BEGIN:VCARD
VERSION:3.0
FN:Matt Maine
N:Maine;Matt;;;
ORG:American Financial Network
TITLE:Senior Mortgage Loan Officer
TEL;TYPE=WORK,VOICE:(555) 123-4567
EMAIL:matt.maine@afnet.com
URL:https://www.afn.com
NOTE:NMLS #12345 - Your trusted mortgage professional
END:VCARD`;
                        const blob = new Blob([vcfContent], { type: 'text/vcard' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'Matt_Maine_Contact.vcf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                      <UserPlus className="w-4 h-4 mr-2 text-primary-foreground" />
                      <span className="text-primary-foreground font-semibold">Save Contact</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Badge */}
            <div className="flex justify-center mt-4">
              <div className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full border border-primary/20">
                <span className="text-sm text-muted-foreground">Partnered with</span>
                <span className="text-sm font-bold text-foreground">American Financial Network</span>
                <span className="text-xs text-muted-foreground">• 24 years in business</span>
              </div>
              {/* Mobile version - stacked layout */}
              <div className="flex md:hidden flex-col items-center gap-1 px-5 py-3 bg-card/60 backdrop-blur-sm rounded-xl border border-primary/20">
                <span className="text-xs text-muted-foreground">Partnered with</span>
                <span className="text-sm font-bold text-foreground">American Financial Network</span>
                <span className="text-xs text-primary/80 font-medium">24 years in business</span>
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
        </div>
        </div>

        {/* Fixed Chat Sidebar - 25% on desktop, hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/4 fixed right-0 top-[117px] bottom-0 flex-col bg-card/95 backdrop-blur-lg border-l border-primary/30 z-40 rounded-l-2xl overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 border-b border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/3 to-transparent">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden ring-2 ring-primary/40 shadow-lg">
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
                    <h2 className="font-bold text-foreground">Sophia AI</h2>
                    <p className="text-xs text-muted-foreground">Your Mortgage Assistant</p>
                  </div>
                </div>
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

              {voiceModeActive && (
                <div className="mx-4 mb-3 p-2 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-lg text-center border border-primary/30 shadow-lg shadow-primary/10 animate-fade-in">
                  <p className="text-xs text-primary font-semibold">🎙️ Voice Mode Active</p>
                </div>
              )}
            </div>

            {/* Chat Area - Scrollable */}
            <div id="sophia-chat" className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
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
            <div className="flex-shrink-0 p-4 border-t border-primary/20 space-y-3 bg-card/50">
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
        </div>

      </div>

      {/* Below the Fold Content - 75% width on desktop to avoid chat sidebar */}
      <div className="w-full lg:w-3/4 bg-gradient-to-b from-background to-muted/20 py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-20">
          

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


          {/* GIF Placeholder for AI Process */}
          <section className="flex justify-center">
            <div className="w-full max-w-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl border-2 border-dashed border-primary/30 p-8 md:p-12 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">AI Process Demo GIF</h4>
                <p className="text-sm text-muted-foreground">Placeholder for animated GIF showing how AI helps the mortgage process</p>
              </div>
            </div>
          </section>

          {/* Calculator Section Only */}
          <section 
            ref={videoCalcSection.ref}
            className="space-y-6"
          >
            <div className={`transition-all duration-700 ${
              videoCalcSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <MortgageCalculator />
            </div>
          </section>

          {/* Loan Programs */}
          <section className="space-y-6 md:space-y-8">
            <LoanProgramsTabs onAskSophia={(message) => {
              sendMessage(message);
              scrollToChat();
            }} />
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

          {/* CTA Section - Ready to Get Started */}
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

          {/* Mobile-only App Download Section */}
          <div className="lg:hidden bg-card/50 backdrop-blur-md rounded-xl p-4 border border-primary/20 shadow-lg">
            <div className="flex items-center gap-4">
              <img 
                src={pathAppIcon} 
                alt="Path Mobile App" 
                className="w-16 h-16 rounded-xl shadow-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-bold text-foreground text-lg">Get the Path App</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    Apply for loan
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    Interact during process
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    Access docs & payment
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <a 
                href="https://apps.apple.com/app/path-mortgage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-foreground text-background rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                App Store
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.path.mortgage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-foreground text-background rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                Google Play
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Compliance Footer - 75% width on desktop */}
      <footer className="relative bg-gradient-to-b from-background via-card/50 to-background border-t border-primary/20 py-6 md:py-8 px-4 md:px-8 overflow-hidden lg:w-3/4">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src={afnLogoWhite} 
                alt="American Financial Network Logo" 
                className="h-10 md:h-12 w-auto"
              />
            </div>

            {/* Simple Footer Content */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <p className="text-xs text-muted-foreground">
                Equal Housing Opportunity | © {new Date().getFullYear()} American Financial Network (Team AFN). All rights reserved.
              </p>
              <Link 
                to="/licensing" 
                className="text-xs text-primary hover:text-secondary transition-colors inline-block"
              >
                Licensing & Disclosures
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-primary/30 py-3 px-4 z-40 lg:hidden">
        <div className="flex items-center justify-center gap-3 max-w-lg mx-auto">
          <Link 
            to="/sophia"
            className="flex-1"
          >
            <Button 
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Sophia AI
            </Button>
          </Link>
          <Button 
            size="sm"
            variant="outline"
            className="flex-1 border-primary/40 hover:bg-primary/10 gap-2"
          >
            Apply Now
          </Button>
          <Button 
            size="sm"
            variant="ghost"
            className="gap-2"
          >
            <Phone className="w-4 h-4" />
            Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
