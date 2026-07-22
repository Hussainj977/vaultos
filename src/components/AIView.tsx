"use client";

import { useState } from "react";

interface AIViewProps {
  onBack: () => void;
}

export default function AIView({ onBack }: AIViewProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Error: Could not connect to AI" }]);
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#fff",
      padding: "20px",
      paddingBottom: "100px",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header with Back Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <button
          onClick={onBack}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>VaultOS</h2>
      </div>

      {/* Chat Area */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
        padding: "16px",
        flex: 1,
        marginBottom: "16px",
        overflowY: "auto",
        minHeight: "300px",
      }}>
        {messages.length === 0 && (
          <p style={{ color: "#888", textAlign: "center", marginTop: "80px" }}>Ask VaultOS anything...</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: "12px",
              textAlign: msg.role === "user" ? "right" : "left",
            }}
          >
            <span style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: "12px",
              background: msg.role === "user" ? "#3b82f6" : "rgba(255,255,255,0.1)",
              color: "#fff",
              maxWidth: "80%",
              wordWrap: "break-word",
            }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: "#888" }}>VaultOS is thinking...</p>}
      </div>

      {/* Input Area */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask VaultOS anything..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            outline: "none",
            fontSize: "16px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#3b82f6",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
