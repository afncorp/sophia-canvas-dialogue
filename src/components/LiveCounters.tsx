import { useState, useEffect } from 'react';
import { TrendingUp, Users, MessageSquare } from 'lucide-react';

interface Counter {
  label: string;
  value: number;
  icon: typeof TrendingUp;
  show: boolean;
  suffix?: string;
}

export const LiveCounters = () => {
  const [counters, setCounters] = useState<Counter[]>([
    {
      label: 'Loans Closed (LTD)',
      value: 2847,
      icon: TrendingUp,
      show: true,
      suffix: '+'
    },
    {
      label: 'Applications Today',
      value: 0,
      icon: Users,
      show: false,
      suffix: ''
    },
    {
      label: 'Active Sophia Chats',
      value: 0,
      icon: MessageSquare,
      show: false,
      suffix: ''
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCounters(prev => prev.map(counter => {
        let newValue = counter.value;
        
        if (counter.label === 'Loans Closed (LTD)') {
          // Slowly increment LTD
          if (Math.random() > 0.7) newValue += 1;
        } else if (counter.label === 'Applications Today') {
          // Randomly increment applications
          if (Math.random() > 0.85) newValue += 1;
        } else if (counter.label === 'Active Sophia Chats') {
          // Fluctuate active chats
          const change = Math.random() > 0.5 ? 1 : -1;
          newValue = Math.max(0, newValue + change);
        }
        
        // Show counters once they reach thresholds (except LTD which always shows)
        const shouldShow = counter.label === 'Loans Closed (LTD)' || 
                          (counter.label === 'Applications Today' && newValue >= 3) ||
                          (counter.label === 'Active Sophia Chats' && newValue >= 2);
        
        return { ...counter, value: newValue, show: shouldShow };
      }));
    }, 3000); // Update every 3 seconds

    // Initial random values for demo
    setTimeout(() => {
      setCounters(prev => prev.map(counter => ({
        ...counter,
        value: counter.label === 'Applications Today' ? Math.floor(Math.random() * 5) + 3 :
               counter.label === 'Active Sophia Chats' ? Math.floor(Math.random() * 4) + 2 :
               counter.value
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const visibleCounters = counters.filter(c => c.show);

  if (visibleCounters.length === 0) return null;

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-start md:justify-center gap-3 md:gap-6 py-2 md:py-4 px-3 md:px-4 min-w-max md:min-w-0">
        {visibleCounters.map((counter, index) => (
          <div 
            key={counter.label}
            className="group flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 bg-card/40 backdrop-blur-md rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-fade-in flex-shrink-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
              <counter.icon className="w-2.5 h-2.5 md:w-4 md:h-4 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm md:text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tabular-nums">
                {counter.value.toLocaleString()}{counter.suffix}
              </span>
              <span className="text-[9px] md:text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
                {counter.label}
              </span>
            </div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
