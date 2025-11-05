import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [showDetails, setShowDetails] = useState(false);

  // Calculated values
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);
  const [homeInsurance, setHomeInsurance] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly P&I payment
    const monthlyPI =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate property tax (1.2% annually, divided by 12 months)
    const monthlyPropertyTax = (homePrice * 0.012) / 12;

    // Calculate home insurance ($3.50 per $1,000 of home value per year, divided by 12)
    const monthlyInsurance = (homePrice / 1000) * 3.5 / 12;

    // Calculate PMI (0.5% annually if LTV > 80%)
    const ltvRatio = (principal / homePrice) * 100;
    const monthlyPMI = ltvRatio > 80 ? (principal * 0.005) / 12 : 0;

    setMonthlyPayment(monthlyPI);
    setPropertyTax(monthlyPropertyTax);
    setHomeInsurance(monthlyInsurance);
    setPmi(monthlyPMI);
    setTotalPayment(monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI);
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const ltvRatio = ((homePrice - downPayment) / homePrice) * 100;

  return (
    <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-primary/20 shadow-lg">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="overview">Payment Breakdown</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Home Price</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="pl-6"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Down Payment</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="pl-6"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Interest Rate</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Loan Term</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-background border border-input text-foreground rounded-md focus:ring-2 focus:ring-ring focus:border-input"
                >
                  <option value={30}>30 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border-2 border-primary/30">
              <p className="text-xs text-muted-foreground mb-1">Est. Total Monthly Payment</p>
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {formatCurrency(totalPayment)}
              </p>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal & Interest</span>
                  <span className="font-medium text-foreground">{formatCurrency(monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property Tax</span>
                  <span className="font-medium text-foreground">{formatCurrency(propertyTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Home Insurance</span>
                  <span className="font-medium text-foreground">{formatCurrency(homeInsurance)}</span>
                </div>
                {pmi > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PMI</span>
                    <span className="font-medium text-foreground">{formatCurrency(pmi)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Loan Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">Home Price</span>
                <span className="font-medium text-foreground">{formatCurrency(homePrice)}</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">Down Payment ({((downPayment / homePrice) * 100).toFixed(1)}%)</span>
                <span className="font-medium text-foreground">{formatCurrency(downPayment)}</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">Loan Amount</span>
                <span className="font-medium text-foreground">{formatCurrency(homePrice - downPayment)}</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">LTV Ratio</span>
                <span className="font-medium text-foreground">{ltvRatio.toFixed(1)}%</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-2">Monthly Payment Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded">
                  <span className="text-muted-foreground">Principal & Interest</span>
                  <span className="font-medium text-foreground">{formatCurrency(monthlyPayment)}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span className="text-muted-foreground">Property Tax (1.2% annually)</span>
                  <span className="font-medium text-foreground">{formatCurrency(propertyTax)}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span className="text-muted-foreground">Home Insurance</span>
                  <span className="font-medium text-foreground">{formatCurrency(homeInsurance)}</span>
                </div>
                {pmi > 0 && (
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="text-muted-foreground">PMI (0.5% annually)</span>
                    <span className="font-medium text-foreground">{formatCurrency(pmi)}</span>
                  </div>
                )}
                {pmi === 0 && (
                  <div className="p-2 bg-green-500/10 rounded text-green-600 dark:text-green-400 text-xs">
                    ✓ No PMI required (LTV &lt; 80%)
                  </div>
                )}
                <div className="flex justify-between p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-2 border-primary/30 mt-2">
                  <span className="font-semibold text-foreground">Total Monthly Payment</span>
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {formatCurrency(totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
              <p>• Property tax estimated at 1.2% of home value annually</p>
              <p>• Home insurance estimated at $3.50 per $1,000 of home value annually</p>
              <p>• PMI applies when down payment is less than 20% (LTV &gt; 80%)</p>
              <p>• Actual costs may vary based on location and credit profile</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
