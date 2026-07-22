"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send } from "lucide-react";

interface AIViewProps {
  onBack: () => void;
}

interface Message {
  from: "user" | "ai";
  text: string;
}

const responses = [
  "Got it. I've noted that down for you.",
  "That's a great idea! Want me to create a task for it?",
  "I can help you organize that. Let me know if you need a project setup.",
  "Processing... Here's what I found in your vault.",
  "I've updated your notes with that information.",
  "Consider breaking this into smaller tasks for better progress tracking.",
  "Would you like me to set a reminder for this?",
  "I've analyzed your productivity patterns. You're most active in the mornings!",
];

export default function AIView({ onBack }: AIViewProps) {
  const [messages, setMessages] = useState<Message[]>([{ from: "ai", text: "Hey, I'm your VaultOS assistant. What can I help you with today?" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "ai", text: responses[Math.floor(Math.random() * responses.length)] }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="px-5 pb-24 animate-fadeIn flex flex-col h-[calc(100vh-80px)]">
      <div className="flex items-center gap-3 mb-4 pt-5 flex-shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer" style={{ background: "#151A25", border: "1px solid #1E2532" }}>
          <ArrowLeft size={20} color="#fff" />
        </button>
        <h2 className="text-2xl font-bold">AI Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="max-w-[80%] px-[18px] py-3.5 text-sm leading-relaxed animate-popIn"
            style={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              background: msg.from === "user" ? "#1E3A5F" : "#151A25",
              color: msg.from === "user" ? "#fff" : "#D1D5DB",
              borderRadius: "18px",
              borderBottomRightRadius: msg.from === "user" ? "4px" : "18px",
              borderBottomLeftRadius: msg.from === "ai" ? "4px" : "18px",
              border: msg.from === "ai" ? "1px solid #1E2532" : "none",
            }}>
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="max-w-[80%] px-[18px] py-3.5 text-sm animate-popIn" style={{ alignSelf: "flex-start", background: "#151A25", border: "1px solid #1E2532", borderRadius: "18px", borderBottomLeftRadius: "4px", color: "#6B7789" }}>
            <span className="inline-flex gap-1">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
            </span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2.5 flex-shrink-0">
        <input type="text" placeholder="Ask VaultOS anything..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 rounded-full px-5 py-3.5 text-[15px] outline-none" style={{ background: "#151A25", border: "1px solid #1E2532", color: "#fff" }} />
        <button onClick={sendMessage} className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-none" style={{ background: "#3A1E1E", color: "#FF8A8A" }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
