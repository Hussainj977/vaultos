"use client";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const cards = [
  { id: "tasks", title: "Daily Tasks", desc: "What needs to get done today", icon: "✓", iconBg: "#1E3A5F", iconColor: "#6BB5FF" },
  { id: "projects", title: "Projects", desc: "Active work in progress", icon: "◆", iconBg: "#2D1E4A", iconColor: "#C49FFF" },
  { id: "notes", title: "Notes", desc: "Quick thoughts and ideas", icon: "✎", iconBg: "#1E3A2F", iconColor: "#6BFFB8" },
  { id: "ai", title: "AI Assistant", desc: "Ask VaultOS anything", icon: "✦", iconBg: "#3A1E1E", iconColor: "#FF8A8A" },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="pb-24">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-[42px] font-extrabold tracking-tight leading-tight" style={{ letterSpacing: "-1.5px" }}>VaultOS</h1>
        <p className="text-lg mt-2" style={{ color: "#8B95A5" }}>Run your day. Build your future.</p>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-3.5">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="text-left relative overflow-hidden rounded-[20px] p-6 cursor-pointer transition-all duration-200 active:scale-[0.97]"
            style={{ background: "#151A25", border: "1px solid #1E2532" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1A2030"; e.currentTarget.style.borderColor = "#2A3548"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#151A25"; e.currentTarget.style.borderColor = "#1E2532"; }}
          >
            <h2 className="text-[28px] font-bold mb-1.5" style={{ letterSpacing: "-0.8px" }}>{card.title}</h2>
            <p className="text-base" style={{ color: "#6B7789" }}>{card.desc}</p>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-[14px] flex items-center justify-center text-xl" style={{ background: card.iconBg, color: card.iconColor }}>
              {card.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
