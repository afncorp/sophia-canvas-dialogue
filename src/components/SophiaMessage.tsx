import { useEffect, useState } from "react";

interface SophiaMessageProps {
  message: string;
  show: boolean;
}

export const SophiaMessage = ({ message, show }: SophiaMessageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [show, message]);

  if (!visible) return null;

  return (
    <div className="fixed left-80 top-32 z-40 animate-fade-in">
      <div className="bg-card text-card-foreground rounded-2xl px-6 py-4 shadow-glow max-w-sm">
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      {/* Speech bubble arrow */}
      <div className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-card border-b-8 border-b-transparent"></div>
    </div>
  );
};
