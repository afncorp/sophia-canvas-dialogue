import { useEffect, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  delay: number;
}

const demoConversation: Message[] = [
  { role: "user", content: "Hi Sophia! What can you help me with?", delay: 1000 },
  { 
    role: "assistant", 
    content: "Hello! I'm Sophia, your AI assistant. I can help you with research, answer questions, provide recommendations, generate content, and so much more. What are you working on today?", 
    delay: 2000 
  },
  { role: "user", content: "I need help planning a marketing campaign for a new product launch.", delay: 2500 },
  { 
    role: "assistant", 
    content: "Great! I can help you with that. Let's start by identifying your target audience, key messaging, and channels. I can also help you create content calendars, draft copy, and analyze competitor strategies. Would you like to start with audience research?", 
    delay: 2800 
  },
  { role: "user", content: "Yes! Can you also help me write social media posts?", delay: 2000 },
  { 
    role: "assistant", 
    content: "Absolutely! I can create engaging social media content tailored to different platforms - from catchy Instagram captions to professional LinkedIn posts. I'll make sure each post aligns with your brand voice and campaign goals. Ready to get started?", 
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
