import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const MortgageCalculator = () => {
  // Transaction type
  const [transactionType, setTransactionType] = useState<"purchase" | "refinance">("purchase");
  const [loanType, setLoanType] = useState<"conventional" | "fha">("conventional");
  
  // Basic inputs
  const [homePrice, setHomePrice] = useState(500000);
  const [downPaymentDollar, setDownPaymentDollar] = useState(100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  
  // Advanced inputs
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [insuranceOverride, setInsuranceOverride] = useState<number | null>(null);
  const [miOverride, setMiOverride] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Calculated values
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);
  const [homeInsurance, setHomeInsurance] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [ufmip, setUfmip] = useState(0);

  // Sync calculations when inputs change
  useEffect(() => {
    // Update loan amount when home price or down payment changes
    if (transactionType === "purchase") {
      const newLoanAmount = homePrice - downPaymentDollar;
      setLoanAmount(newLoanAmount);
    } else {
      // For refinance, loan amount can be set independently
      setLoanAmount(homePrice);
    }
  }, [homePrice, downPaymentDollar, transactionType]);

  // Update down payment dollar when percent changes
  useEffect(() => {
    const newDownPaymentDollar = (homePrice * downPaymentPercent) / 100;
    setDownPaymentDollar(newDownPaymentDollar);
  }, [downPaymentPercent, homePrice]);

  // Update down payment percent when dollar changes
  useEffect(() => {
    const newDownPaymentPercent = (downPaymentDollar / homePrice) * 100;
    setDownPaymentPercent(newDownPaymentPercent);
  }, [downPaymentDollar, homePrice]);

  const calculateFHAMIP = (baseLoanAmount: number, ltvRatio: number) => {
    // FHA Upfront MIP: 1.75% of base loan amount
    const upfrontMIP = baseLoanAmount * 0.0175;
    
    // FHA Annual MIP (varies by LTV, loan amount, and term)
    let annualMIPRate = 0;
    if (ltvRatio > 95) {
      annualMIPRate = baseLoanAmount <= 500000 ? 0.0085 : 0.009;
    } else if (ltvRatio > 90) {
      annualMIPRate = 0.008;
    } else {
      annualMIPRate = loanTerm <= 15 ? 0.0045 : 0.008;
    }
    
    const monthlyMIP = ((baseLoanAmount + upfrontMIP) * annualMIPRate) / 12;
    
    return { upfrontMIP, monthlyMIP };
  };

  const calculateMortgage = () => {
    let principal = loanAmount;
    let baseLoanAmount = loanAmount;
    
    // For FHA loans, calculate UFMIP and add to principal
    if (loanType === "fha" && transactionType === "purchase") {
      baseLoanAmount = homePrice - downPaymentDollar;
      const fhaCalc = calculateFHAMIP(baseLoanAmount, (baseLoanAmount / homePrice) * 100);
      principal = baseLoanAmount + fhaCalc.upfrontMIP;
      setUfmip(fhaCalc.upfrontMIP);
    } else {
      setUfmip(0);
    }
    
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly P&I payment
    const monthlyPI =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate property tax (user-adjustable rate)
    const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;

    // Calculate home insurance (user can override)
    const monthlyInsurance = insuranceOverride !== null 
      ? insuranceOverride 
      : (homePrice / 1000) * 3.5 / 12;

    // Calculate MI/MIP
    let monthlyMI = 0;
    if (miOverride !== null) {
      monthlyMI = miOverride;
    } else if (transactionType === "purchase") {
      const ltvRatio = (baseLoanAmount / homePrice) * 100;
      
      if (loanType === "fha") {
        const fhaCalc = calculateFHAMIP(baseLoanAmount, ltvRatio);
        monthlyMI = fhaCalc.monthlyMIP;
      } else if (ltvRatio > 80) {
        // Conventional PMI
        monthlyMI = (baseLoanAmount * 0.005) / 12;
      }
    }

    setMonthlyPayment(monthlyPI);
    setPropertyTax(monthlyPropertyTax);
    setHomeInsurance(monthlyInsurance);
    setPmi(monthlyMI);
    setTotalPayment(monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyMI);
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPaymentDollar, loanAmount, interestRate, loanTerm, transactionType, loanType, propertyTaxRate, insuranceOverride, miOverride]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const ltvRatio = transactionType === "purchase" 
    ? ((homePrice - downPaymentDollar) / homePrice) * 100 
    : 0;

  return (
    <div className="bg-card/40 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-primary/30 shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/30 backdrop-blur-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-foreground">Payment Breakdown</TabsTrigger>
          <TabsTrigger value="details" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-foreground">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="space-y-4">
            {/* Transaction Type and Loan Type Toggles */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between">
                <Label htmlFor="transaction-type" className="text-xs font-medium">
                  {transactionType === "purchase" ? "Purchase" : "Refinance"}
                </Label>
                <Switch
                  id="transaction-type"
                  checked={transactionType === "refinance"}
                  onCheckedChange={(checked) => setTransactionType(checked ? "refinance" : "purchase")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="loan-type" className="text-xs font-medium">
                  {loanType === "conventional" ? "Conventional" : "FHA"}
                </Label>
                <Switch
                  id="loan-type"
                  checked={loanType === "fha"}
                  onCheckedChange={(checked) => setLoanType(checked ? "fha" : "conventional")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  {transactionType === "purchase" ? "Home Price" : "Home Value"}
                </label>
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
              
              {transactionType === "purchase" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Down Payment ($)</label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                      <Input
                        type="number"
                        value={downPaymentDollar}
                        onChange={(e) => setDownPaymentDollar(Number(e.target.value))}
                        className="pl-6"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Down Payment (%)</label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.1"
                        value={downPaymentPercent.toFixed(1)}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => {
                      const newLoanAmount = Number(e.target.value);
                      setLoanAmount(newLoanAmount);
                      if (transactionType === "purchase") {
                        setDownPaymentDollar(homePrice - newLoanAmount);
                      }
                    }}
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

            <div className="p-4 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-xl border-2 border-primary/40 shadow-lg shadow-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <div className="relative">
                <p className="text-xs text-muted-foreground mb-1">Est. Total Monthly Payment</p>
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
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
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="space-y-3">
            {/* Advanced Settings */}
            <div className="space-y-3 p-3 bg-muted/10 rounded-lg border border-border">
              <h4 className="text-sm font-semibold text-foreground">Advanced Settings</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-foreground">Property Tax Rate</label>
                  <span className="text-xs text-muted-foreground">{propertyTaxRate.toFixed(2)}%</span>
                </div>
                <Slider
                  value={[propertyTaxRate]}
                  onValueChange={(value) => setPropertyTaxRate(value[0])}
                  min={0}
                  max={3}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Home Insurance Override ($/mo)</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    placeholder="Auto-calculated"
                    value={insuranceOverride ?? ''}
                    onChange={(e) => setInsuranceOverride(e.target.value ? Number(e.target.value) : null)}
                    className="pl-6"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">MI/MIP Override ($/mo)</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    placeholder="Auto-calculated"
                    value={miOverride ?? ''}
                    onChange={(e) => setMiOverride(e.target.value ? Number(e.target.value) : null)}
                    className="pl-6"
                  />
                </div>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-foreground">Loan Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">{transactionType === "purchase" ? "Home Price" : "Home Value"}</span>
                <span className="font-medium text-foreground">{formatCurrency(homePrice)}</span>
              </div>
              {transactionType === "purchase" && (
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span className="text-muted-foreground">Down Payment ({downPaymentPercent.toFixed(1)}%)</span>
                  <span className="font-medium text-foreground">{formatCurrency(downPaymentDollar)}</span>
                </div>
              )}
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">Base Loan Amount</span>
                <span className="font-medium text-foreground">{formatCurrency(transactionType === "purchase" ? homePrice - downPaymentDollar : loanAmount)}</span>
              </div>
              {loanType === "fha" && ufmip > 0 && (
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span className="text-muted-foreground">FHA Upfront MIP (1.75%)</span>
                  <span className="font-medium text-foreground">{formatCurrency(ufmip)}</span>
                </div>
              )}
              <div className="flex justify-between p-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded border border-primary/20">
                <span className="text-muted-foreground font-semibold">Total Loan Amount</span>
                <span className="font-medium text-foreground">{formatCurrency(loanAmount + (loanType === "fha" ? ufmip : 0))}</span>
              </div>
              {transactionType === "purchase" && (
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span className="text-muted-foreground">LTV Ratio</span>
                  <span className="font-medium text-foreground">{ltvRatio.toFixed(1)}%</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-2">Monthly Payment Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-gradient-to-r from-primary/15 to-secondary/15 rounded border border-primary/20">
                  <span className="text-muted-foreground">Principal & Interest</span>
                  <span className="font-medium text-foreground">{formatCurrency(monthlyPayment)}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span className="text-muted-foreground">Property Tax ({propertyTaxRate}% annually)</span>
                  <span className="font-medium text-foreground">{formatCurrency(propertyTax)}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span className="text-muted-foreground">Home Insurance</span>
                  <span className="font-medium text-foreground">{formatCurrency(homeInsurance)}</span>
                </div>
                {pmi > 0 && (
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="text-muted-foreground">
                      {loanType === "fha" ? "FHA MIP" : "PMI"}
                      {miOverride !== null ? " (override)" : ""}
                    </span>
                    <span className="font-medium text-foreground">{formatCurrency(pmi)}</span>
                  </div>
                )}
                {pmi === 0 && transactionType === "purchase" && loanType === "conventional" && (
                  <div className="p-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded border border-primary/20 text-primary text-xs flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</span>
                    <span>No PMI required (LTV &lt; 80%)</span>
                  </div>
                )}
                <div className="flex justify-between p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-2 border-primary/40 shadow-lg shadow-primary/20 mt-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                  <span className="font-semibold text-foreground relative z-10">Total Monthly Payment</span>
                  <span className="font-bold text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative z-10">
                    {formatCurrency(totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
              <p>• Property tax rate adjustable in Advanced Settings (default 1.2%)</p>
              <p>• Home insurance estimated at $3.50 per $1,000 of home value annually (can be overridden)</p>
              <p>• Conventional PMI applies when down payment is less than 20% (LTV &gt; 80%)</p>
              <p>• FHA loans include 1.75% upfront MIP added to loan amount plus monthly MIP</p>
              <p>• Actual costs may vary based on location and credit profile</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
