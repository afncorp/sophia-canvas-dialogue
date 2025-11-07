import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Palette, Sparkles } from "lucide-react";

type Theme = 'modern' | 'traditional';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('modern');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'modern';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'modern' ? 'traditional' : 'modern';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-primary/30 hover:bg-primary/10 transition-all relative group"
      title={`Switch to ${theme === 'modern' ? 'Traditional' : 'Modern'} Theme`}
    >
      {theme === 'modern' ? (
        <Palette className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
      ) : (
        <Sparkles className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
      )}
      <span className="hidden md:inline font-medium">
        {theme === 'modern' ? 'Traditional' : 'Modern'}
      </span>
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
    </Button>
  );
};
