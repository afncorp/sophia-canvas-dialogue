import { useEffect, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  delay: number;
}

const demoConversation: Message[] = [
  { role: "user", content: "Hi Sophia! I'm thinking about buying my first home. Can you help?", delay: 500 },
  { 
    role: "assistant", 
    content: "Absolutely! I can help you understand loan options, affordability, pre-approval, and more.", 
    delay: 800 
  },
  { role: "user", content: "What's the difference between an FHA and conventional loan?", delay: 1200 },
  { 
    role: "assistant", 
    content: "FHA loans offer lower down payments and flexible credit, while conventional loans require higher credit but no mortgage insurance after 20% equity.", 
    delay: 1500 
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
    <div className="space-y-3">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        </div>
      ))}
      
      {currentIndex < demoConversation.length && messages.length > 0 && (
        <div className={`flex ${demoConversation[currentIndex].role === "user" ? "justify-end" : "justify-start"}`}>
          <div className="flex items-center space-x-2 px-4 py-2">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
