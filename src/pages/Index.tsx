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

      {/* Below the Fold Content - Full Width */}
      <div className="w-full bg-gradient-to-b from-background to-muted/20 py-16 px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Process Flow Comparison */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-foreground">Traditional vs AI-Enhanced Process</h2>
              <p className="text-lg text-muted-foreground">See how our AI technology accelerates your mortgage journey</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="bg-muted/40 rounded-2xl p-8 border-2 border-border">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-muted-foreground">Traditional Process</h3>
                  <p className="text-sm text-muted-foreground mt-1">The old way</p>
                </div>
                <div className="space-y-4">
                  {[
                    { step: "1", label: "Initial Consultation", time: "1-2 days wait" },
                    { step: "2", label: "Document Collection", time: "3-5 days" },
                    { step: "3", label: "Manual Review", time: "5-7 business days" },
                    { step: "4", label: "Underwriting", time: "7-10 business days" },
                    { step: "5", label: "Approval Decision", time: "Total: 3-4 weeks" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 p-3 bg-background/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-sm font-bold">
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
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border-2 border-primary/30 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary">AI-Enhanced Process</h3>
                  <p className="text-sm text-primary/80 mt-1">The modern way</p>
                </div>
                <div className="space-y-4">
                  {[
                    { step: "1", label: "Chat with Sophia", time: "Instant response", icon: Zap },
                    { step: "2", label: "Smart Document Upload", time: "Minutes", icon: Zap },
                    { step: "3", label: "AI Analysis & Verification", time: "Real-time", icon: Zap },
                    { step: "4", label: "Automated Pre-Approval", time: "Same day", icon: Zap },
                    { step: "5", label: "Final Approval", time: "Total: 5-7 days", icon: Zap },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 p-3 bg-white/80 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{item.label}</p>
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-xs text-primary font-medium">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-8 py-4">
                <Zap className="w-6 h-6 text-primary" />
                <p className="text-lg font-bold text-foreground">60% Faster Approval Time with AI</p>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-foreground">Calculate Your Monthly Payment</h2>
              <p className="text-lg text-muted-foreground">Get an instant estimate of your mortgage costs</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft border border-border/50 max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Home Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input type="number" placeholder="500,000" className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Down Payment</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input type="number" placeholder="100,000" className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Interest Rate</label>
                    <div className="relative">
                      <input type="number" step="0.01" placeholder="6.5" className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Loan Term</label>
                    <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>30 Years</option>
                      <option>20 Years</option>
                      <option>15 Years</option>
                      <option>10 Years</option>
                    </select>
                  </div>
                </div>
                <Button size="lg" className="w-full">Calculate Payment</Button>
                <div className="p-6 bg-primary/5 rounded-xl border-2 border-primary/20 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Payment</p>
                  <p className="text-4xl font-bold text-primary">$2,528</p>
                  <p className="text-xs text-muted-foreground mt-2">Principal & Interest only. Excludes taxes and insurance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-foreground">What Our Clients Say</h2>
              <div className="flex items-center justify-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-6 h-6 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-lg font-semibold">5.0/5.0 (1,000+ reviews)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Anthony",
                  review: "They do everything they can to help you. The entire team was professional and made the process smooth.",
                  rating: 5,
                },
                {
                  name: "Henrry",
                  review: "Very nice people. They answered all my questions and were patient throughout the entire process.",
                  rating: 5,
                },
                {
                  name: "Cindy",
                  review: "Anthony, Jarod and their whole team walked me through this whole process, which at times was overwhelming, and kept me on track. With their knowledge, patience and support we stayed on task and got it done.",
                  rating: 5,
                },
              ].map((testimonial) => (
                <div key={testimonial.name} className="bg-white rounded-2xl p-6 shadow-soft border border-border/50">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Award key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{testimonial.review}"</p>
                  <p className="font-semibold text-foreground">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Trust Badges */}
          <section className="bg-white rounded-2xl p-8 shadow-soft border border-border/50">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">200+</div>
                <p className="text-sm text-muted-foreground">Branches Nationwide</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">1,000+</div>
                <p className="text-sm text-muted-foreground">5-Star Reviews</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">15+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">24/7</div>
                <p className="text-sm text-muted-foreground">AI Support</p>
              </div>
            </div>
          </section>

          {/* Loan Programs */}
          <section className="space-y-8 pb-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-foreground">Loan Programs We Offer</h2>
              <p className="text-lg text-muted-foreground">Find the perfect loan program for your unique situation</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Conventional", icon: Home, desc: "Traditional financing with competitive rates" },
                { name: "FHA Loans", icon: Users, desc: "Low down payment options for first-time buyers" },
                { name: "VA Loans", icon: Award, desc: "Special benefits for military veterans" },
                { name: "Jumbo Loans", icon: DollarSign, desc: "Financing for luxury properties" },
              ].map((program) => (
                <div key={program.name} className="bg-white rounded-2xl p-6 shadow-soft border border-border/50 hover:border-primary/50 transition-colors">
                  <program.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{program.name}</h3>
                  <p className="text-sm text-muted-foreground">{program.desc}</p>
                  <Button variant="outline" size="sm" className="w-full mt-4">Learn More</Button>
                </div>
              ))}
            </div>
          </section>

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
