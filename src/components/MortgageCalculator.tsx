import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const MortgageCalculator = () => {
  // Loan type toggles
  const [isPurchase, setIsPurchase] = useState(true);
  const [isConventional, setIsConventional] = useState(true);

  // Basic inputs
  const [homePrice, setHomePrice] = useState(500000);
  const [downPaymentDollar, setDownPaymentDollar] = useState(100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  // Advanced controls
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [insuranceOverride, setInsuranceOverride] = useState<number | null>(null);
  const [miOverride, setMiOverride] = useState<number | null>(null);

  // Calculated values
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);
  const [homeInsurance, setHomeInsurance] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Update down payment dollar when percent changes
  const updateDownPaymentFromPercent = (percent: number) => {
    const newDollar = (homePrice * percent) / 100;
    setDownPaymentPercent(percent);
    setDownPaymentDollar(newDollar);
    setLoanAmount(homePrice - newDollar);
  };

  // Update down payment percent when dollar changes
  const updateDownPaymentFromDollar = (dollar: number) => {
    const newPercent = (dollar / homePrice) * 100;
    setDownPaymentDollar(dollar);
    setDownPaymentPercent(newPercent);
    setLoanAmount(homePrice - dollar);
  };

  // Update down payment when home price changes
  useEffect(() => {
    const newDollar = (homePrice * downPaymentPercent) / 100;
    setDownPaymentDollar(newDollar);
    setLoanAmount(homePrice - newDollar);
  }, [homePrice]);

  // Update down payment when loan amount changes
  const updateLoanAmount = (amount: number) => {
    const newDownPayment = homePrice - amount;
    const newPercent = (newDownPayment / homePrice) * 100;
    setLoanAmount(amount);
    setDownPaymentDollar(newDownPayment);
    setDownPaymentPercent(newPercent);
  };

  const calculateMortgage = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly P&I payment
    const monthlyPI =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate property tax using adjustable rate
    const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;

    // Calculate home insurance (use override if set)
    const monthlyInsurance = insuranceOverride !== null 
      ? insuranceOverride 
      : (homePrice / 1000) * 3.5 / 12;

    // Calculate MI based on loan type
    const ltvRatio = (principal / homePrice) * 100;
    let monthlyMI = 0;
    
    if (miOverride !== null) {
      monthlyMI = miOverride;
    } else if (isConventional) {
      // Conventional PMI (0.5% annually if LTV > 80%)
      monthlyMI = ltvRatio > 80 ? (principal * 0.005) / 12 : 0;
    } else {
      // FHA MIP (0.85% annually regardless of LTV)
      monthlyMI = (principal * 0.0085) / 12;
    }

    setMonthlyPayment(monthlyPI);
    setPropertyTax(monthlyPropertyTax);
    setHomeInsurance(monthlyInsurance);
    setPmi(monthlyMI);
    setTotalPayment(monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyMI);
  };

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, propertyTaxRate, insuranceOverride, miOverride, isConventional, homePrice]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const ltvRatio = (loanAmount / homePrice) * 100;
  const fhaUpfrontMIP = !isConventional ? loanAmount * 0.0175 : 0;

  return (
    <div className="bg-card/40 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-primary/30 shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/30 backdrop-blur-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-foreground">Payment Breakdown</TabsTrigger>
          <TabsTrigger value="details" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-foreground">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="space-y-4">
            {/* Loan Type Toggles */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <Label htmlFor="purchase-toggle" className="text-xs font-medium cursor-pointer">
                  {isPurchase ? 'Purchase' : 'Refinance'}
                </Label>
                <Switch
                  id="purchase-toggle"
                  checked={isPurchase}
                  onCheckedChange={setIsPurchase}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="conventional-toggle" className="text-xs font-medium cursor-pointer">
                  {isConventional ? 'Conventional' : 'FHA'}
                </Label>
                <Switch
                  id="conventional-toggle"
                  checked={isConventional}
                  onCheckedChange={setIsConventional}
                />
              </div>
            </div>

            {/* Main Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  {isPurchase ? 'Home Price' : 'Home Value'}
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
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => updateLoanAmount(Number(e.target.value))}
                    className="pl-6"
                  />
                </div>
              </div>
            </div>

            {/* Down Payment - Two Linked Fields */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Down Payment</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    value={downPaymentDollar}
                    onChange={(e) => updateDownPaymentFromDollar(Number(e.target.value))}
                    className="pl-6"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={downPaymentPercent.toFixed(1)}
                    onChange={(e) => updateDownPaymentFromPercent(Number(e.target.value))}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
              </div>
            </div>

            {/* Interest Rate and Loan Term */}
            <div className="grid grid-cols-2 gap-3">
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

            {/* Property Tax Rate Slider */}
            <div className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border/30">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-foreground">Property Tax Rate</label>
                <span className="text-xs font-semibold text-primary">{propertyTaxRate.toFixed(2)}%</span>
              </div>
              <Slider
                value={[propertyTaxRate]}
                onValueChange={(value) => setPropertyTaxRate(value[0])}
                min={0}
                max={3}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0%</span>
                <span>3%</span>
              </div>
            </div>

            {/* Insurance Override */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">Home Insurance</label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px]"
                  onClick={() => setInsuranceOverride(insuranceOverride === null ? homeInsurance : null)}
                >
                  {insuranceOverride === null ? 'Override' : 'Auto'}
                </Button>
              </div>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  type="number"
                  value={insuranceOverride ?? Math.round(homeInsurance)}
                  onChange={(e) => setInsuranceOverride(Number(e.target.value))}
                  disabled={insuranceOverride === null}
                  className="pl-6"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px]">/mo</span>
              </div>
            </div>

            {/* MI Override */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">
                  {isConventional ? 'PMI' : 'Monthly MIP'}
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px]"
                  onClick={() => setMiOverride(miOverride === null ? pmi : null)}
                >
                  {miOverride === null ? 'Override' : 'Auto'}
                </Button>
              </div>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  type="number"
                  value={miOverride ?? Math.round(pmi)}
                  onChange={(e) => setMiOverride(Number(e.target.value))}
                  disabled={miOverride === null}
                  className="pl-6"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px]">/mo</span>
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
                      <span className="text-muted-foreground">{isConventional ? 'PMI' : 'MIP'}</span>
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
            <h4 className="text-sm font-semibold text-foreground">Loan Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">Loan Type</span>
                <span className="font-medium text-foreground">
                  {isConventional ? 'Conventional' : 'FHA'} {isPurchase ? 'Purchase' : 'Refinance'}
                </span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">{isPurchase ? 'Home Price' : 'Home Value'}</span>
                <span className="font-medium text-foreground">{formatCurrency(homePrice)}</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">Down Payment ({downPaymentPercent.toFixed(1)}%)</span>
                <span className="font-medium text-foreground">{formatCurrency(downPaymentDollar)}</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">Loan Amount</span>
                <span className="font-medium text-foreground">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span className="text-muted-foreground">LTV Ratio</span>
                <span className="font-medium text-foreground">{ltvRatio.toFixed(1)}%</span>
              </div>
              {!isConventional && fhaUpfrontMIP > 0 && (
                <div className="flex justify-between p-2 bg-accent/10 rounded border border-accent/30">
                  <span className="text-muted-foreground">FHA Upfront MIP (1.75%)</span>
                  <span className="font-medium text-foreground">{formatCurrency(fhaUpfrontMIP)}</span>
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
                  <span className="text-muted-foreground">Property Tax ({propertyTaxRate.toFixed(2)}% annually)</span>
                  <span className="font-medium text-foreground">{formatCurrency(propertyTax)}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span className="text-muted-foreground">
                    Home Insurance {insuranceOverride !== null && '(override)'}
                  </span>
                  <span className="font-medium text-foreground">{formatCurrency(homeInsurance)}</span>
                </div>
                {pmi > 0 && (
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span className="text-muted-foreground">
                      {isConventional ? 'PMI' : 'MIP'} {miOverride !== null && '(override)'}
                    </span>
                    <span className="font-medium text-foreground">{formatCurrency(pmi)}</span>
                  </div>
                )}
                {pmi === 0 && isConventional && (
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
              <p>• Property tax rate adjustable from 0-3% (varies by location)</p>
              <p>• Home insurance default: $3.50 per $1,000 of home value annually</p>
              <p>• Conventional PMI: 0.5% annually when LTV &gt; 80%</p>
              <p>• FHA MIP: 0.85% annually + 1.75% upfront (financed into loan)</p>
              <p>• Click "Override" to manually adjust insurance and MI amounts</p>
              <p>• Actual costs may vary based on location, credit profile, and lender</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
