import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

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
      className="border-primary/30 hover:bg-primary/10"
      title={`Switch to ${theme === 'modern' ? 'Traditional' : 'Modern'} Theme`}
    >
      <Palette className="w-4 h-4 mr-2" />
      <span className="hidden md:inline">
        {theme === 'modern' ? 'Traditional' : 'Modern'}
      </span>
    </Button>
  );
};
