"use client";

import { Home, Compass } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onHome: () => void;
  onExplore: () => void;
}

export default function BottomNav({ activeTab, onHome, onExplore }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      style={{
        background: "rgba(11, 14, 20, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid #1E2532",
        padding: "10px 0 max(24px, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex justify-around">
        <button
          onClick={onHome}
          className="flex flex-col items-center gap-1 cursor-pointer px-6 py-1.5 rounded-2xl border-none bg-transparent transition-all duration-200"
          style={{ background: activeTab === "home" ? "#1E2532" : "transparent" }}
        >
          <Home size={28} strokeWidth={2} style={{ color: activeTab === "home" ? "#FFD4C7" : "#5A6578" }} />
          <span className="text-xs font-medium" style={{ color: activeTab === "home" ? "#FFD4C7" : "#5A6578" }}>Home</span>
        </button>

        <button
          onClick={onExplore}
          className="flex flex-col items-center gap-1 cursor-pointer px-6 py-1.5 rounded-2xl border-none bg-transparent transition-all duration-200"
          style={{ background: activeTab === "explore" ? "#1E2532" : "transparent" }}
        >
          <Compass size={28} strokeWidth={2} style={{ color: activeTab === "explore" ? "#FFD4C7" : "#5A6578" }} />
          <span className="text-xs font-medium" style={{ color: activeTab === "explore" ? "#FFD4C7" : "#5A6578" }}>Explore</span>
        </button>
      </div>
    </nav>
  );
}
