import { useEffect, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  delay: number;
}

const demoConversation: Message[] = [
  { role: "user", content: "Hi Sophia! I'm thinking about buying my first home. Can you help?", delay: 1000 },
  { 
    role: "assistant", 
    content: "Hello! I'm Sophia, your mortgage loan officer assistant. Congratulations on taking this exciting step! I can help you understand loan options, calculate what you can afford, explain the pre-approval process, and guide you through every step of getting your home loan. What questions do you have?", 
    delay: 2000 
  },
  { role: "user", content: "What's the difference between a conventional loan and an FHA loan?", delay: 2500 },
  { 
    role: "assistant", 
    content: "Great question! A conventional loan typically requires a higher credit score (620+) and at least 3-5% down, but offers more flexibility. An FHA loan is government-backed, requires only 3.5% down, and accepts lower credit scores (580+), making it perfect for first-time buyers. However, FHA loans require mortgage insurance. Which sounds like a better fit for your situation?", 
    delay: 2800 
  },
  { role: "user", content: "I have about $15,000 saved. How much house can I afford?", delay: 2000 },
  { 
    role: "assistant", 
    content: "With $15,000 saved, you're off to a great start! The home price you can afford depends on your income, debts, and credit score. Generally, lenders look for a debt-to-income ratio under 43%. I can help you calculate your buying power and explore loan programs that maximize your budget. Would you like me to walk you through the numbers?", 
    delay: 2500 
  },
];

export const ConversationDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= demoConversation.length) {
      // Reset after a pause
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const timer = setTimeout(() => {
      setMessages((prev) => [...prev, demoConversation[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, demoConversation[currentIndex].delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="space-y-4 max-w-2xl">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-6 py-4 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground ml-12"
                : "bg-card text-card-foreground shadow-soft mr-12"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        </div>
      ))}
      
      {currentIndex < demoConversation.length && messages.length > 0 && (
        <div className={`flex ${demoConversation[currentIndex].role === "user" ? "justify-end" : "justify-start"}`}>
          <div className="flex items-center space-x-2 px-6 py-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
