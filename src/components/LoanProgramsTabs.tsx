import { useState } from "react";
import { Home, Users, Award, DollarSign, CreditCard, MessageSquare, CheckCircle, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface LoanProgram {
  id: string;
  name: string;
  icon: typeof Home;
  description: string;
  keyFeatures: string[];
  bestFor: string[];
}

interface LoanProgramsTabsProps {
  onAskSophia?: (message: string) => void;
}

export const LoanProgramsTabs = ({ onAskSophia }: LoanProgramsTabsProps) => {
  const [activeTab, setActiveTab] = useState("conventional");

  const loanPrograms: LoanProgram[] = [
    {
      id: "conventional",
      name: "Conventional Loans",
      icon: Home,
      description: "Traditional financing with competitive rates and flexible terms for qualified borrowers",
      keyFeatures: [
        "Down payments as low as 3% for first-time buyers",
        "Fixed-rate or adjustable-rate options",
        "Loan amounts up to conforming limits ($766,550)",
        "No mortgage insurance with 20% down"
      ],
      bestFor: [
        "Buyers with good to excellent credit (620+)",
        "Stable income and employment history",
        "Primary residences, second homes, or investment properties"
      ]
    },
    {
      id: "fha",
      name: "FHA Loans",
      icon: Users,
      description: "Government-backed loans designed for first-time homebuyers with lower credit requirements",
      keyFeatures: [
        "Down payments as low as 3.5%",
        "Lower credit score requirements (580+)",
        "Flexible debt-to-income ratios",
        "Gift funds allowed for down payment"
      ],
      bestFor: [
        "First-time homebuyers",
        "Buyers with limited savings",
        "Those rebuilding credit",
        "Self-employed borrowers"
      ]
    },
    {
      id: "va",
      name: "VA Loans",
      icon: Award,
      description: "Zero-down payment loans exclusively for military veterans, active duty service members, and eligible spouses",
      keyFeatures: [
        "No down payment required",
        "No private mortgage insurance (PMI)",
        "Competitive interest rates",
        "Limited closing costs"
      ],
      bestFor: [
        "Active duty military personnel",
        "Veterans and reservists",
        "Eligible surviving spouses",
        "Those seeking no down payment options"
      ]
    },
    {
      id: "jumbo",
      name: "Jumbo Loans",
      icon: DollarSign,
      description: "Financing for luxury properties exceeding conforming loan limits",
      keyFeatures: [
        "Loan amounts over $766,550",
        "Competitive rates for high-value properties",
        "Flexible terms and structures",
        "Options for second homes and investments"
      ],
      bestFor: [
        "High-income borrowers",
        "Luxury home purchases",
        "High-cost real estate markets",
        "Strong credit profiles (700+)"
      ]
    },
    {
      id: "non-agency",
      name: "Non-Agency Loans",
      icon: CreditCard,
      description: "Non-QM loans for investors, self-employed borrowers, and those with alternative documentation needs",
      keyFeatures: [
        "Bank statement programs available",
        "Asset-based qualification options",
        "Flexible documentation requirements",
        "Programs for unique financial situations"
      ],
      bestFor: [
        "Self-employed professionals",
        "Real estate investors",
        "Foreign nationals",
        "Those with non-traditional income"
      ]
    }
  ];

  const activeProgram = loanPrograms.find(p => p.id === activeTab) || loanPrograms[0];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 md:space-y-3">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground">Find Your Perfect Loan</h2>
        <p className="text-sm md:text-lg text-muted-foreground">
          Choose from our comprehensive range of mortgage programs designed for every situation
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted/30 backdrop-blur-sm p-1">
          {loanPrograms.map((program) => {
            // Mobile abbreviations
            const mobileLabel = program.id === 'conventional' ? 'Conv' 
              : program.id === 'non-agency' ? 'Non-QM' 
              : program.name.split(" ")[0];
            
            return (
              <TabsTrigger
                key={program.id}
                value={program.id}
                className="text-[10px] md:text-sm px-1 md:px-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all"
              >
                <span className="md:hidden">{mobileLabel}</span>
                <span className="hidden md:inline">{program.name.split(" ")[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {loanPrograms.map((program) => (
          <TabsContent key={program.id} value={program.id} className="mt-6">
            <div className="relative bg-card/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-primary/40 shadow-xl shadow-primary/20">
              {/* Ask Sophia Button - Desktop only */}
              {onAskSophia && (
                <Button
                  onClick={() => onAskSophia(`Tell me all about ${program.name} and help me understand if they're right for my situation. What are the requirements and benefits?`)}
                  className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/30 hidden md:flex"
                  size="sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask Sophia
                </Button>
              )}

              {/* Program Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <program.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {program.name}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {program.description}
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-base md:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {program.keyFeatures.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm md:text-base text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div>
                  <h4 className="text-base md:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary" />
                    Best For
                  </h4>
                  <ul className="space-y-3">
                    {program.bestFor.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm md:text-base text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
