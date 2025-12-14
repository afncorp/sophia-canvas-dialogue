import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import afnLogoWhite from "@/assets/afn-logo-white.png";

const LicensingDisclosures = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <img 
              src={afnLogoWhite} 
              alt="AFN Logo" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Licensing & Disclosures</h1>
        
        <div className="space-y-6 text-sm text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Loan Officer Information</h2>
            <p>
              Matt Maine (NMLS #12345). American Financial Network, Inc. For licensing information, go to: <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors underline">www.nmlsconsumeraccess.org</a>
            </p>
            <p>
              Contact: matt.maine@afnet.com | (555) 123-4567 | Licensed to serve nationwide
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Important Disclosures</h2>
            <p>
              This is not an offer to enter into an agreement. Not all customers will qualify. Information, rates, and programs are subject to change without prior notice. 
              All products are subject to credit and property approval. Not all products are available in all states or for all loan amounts. Other restrictions and limitations apply.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">California Licensing</h2>
            <p>
              Licensed by the Department of Financial Protection and Innovation under the California Residential Mortgage Lending Act. 
              Loans made or arranged pursuant to a California Residential Mortgage Lending Act License.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Company Information</h2>
            <p>
              American Financial Network, Inc. | NMLS #6606 | Licensed Nationwide
            </p>
          </section>

          <div className="pt-6 border-t border-primary/20 flex flex-wrap gap-4 text-xs">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>

          <p className="text-xs pt-4">
            © {new Date().getFullYear()} American Financial Network (Team AFN). All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default LicensingDisclosures;
