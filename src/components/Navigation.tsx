import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import afnLogoWhite from "@/assets/afn-logo-white.png";
import afnLogo from "@/assets/afn-logo.png";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src={isDarkMode ? afnLogoWhite : afnLogo} 
            alt="AFN Logo" 
            className="h-8 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#programs" className="text-foreground hover:text-primary transition-colors">
            Loan Programs
          </a>
          <a href="#calculator" className="text-foreground hover:text-primary transition-colors">
            Calculator
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <Button variant="default">Login</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#programs" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Loan Programs
            </a>
            <a 
              href="#calculator" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculator
            </a>
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <Button variant="default" className="w-full">Login</Button>
          </div>
        </div>
      )}
    </nav>
  );
};
