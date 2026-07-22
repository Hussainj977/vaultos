"use client";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const cards = [
  { id: "tasks", title: "Daily Tasks", desc: "What needs to get done today", icon: "📋", color: "#3B82F6" },
  { id: "projects", title: "Projects", desc: "Active work in progress", icon: "📁", color: "#8B5CF6" },
  { id: "notes", title: "Notes", desc: "Quick thoughts and ideas", icon: "📝", color: "#10B981" },
  { id: "ai", title: "Ask VaultOS anything", desc: "AI Assistant", icon: "🤖", color: "#F59E0B" },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#fff",
      padding: "20px",
      paddingBottom: "100px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{
          fontSize: "36px",
          fontWeight: "bold",
          margin: "0 0 8px 0",
          color: "#fff",
        }}>
          VaultOS
        </h1>
        <p style={{
          color: "#8895A5",
          fontSize: "16px",
          margin: 0,
        }}>
          Run your day. Build your future.
        </p>
      </div>

      {/* Cards - Stacked Vertically */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            style={{
              background: "#1A2830",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid transparent",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1E293B";
              e.currentTarget.style.borderColor = card.color;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1A2830";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "28px" }}>{card.icon}</span>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "bold",
                margin: 0,
                color: "#fff",
              }}>
                {card.title}
              </h2>
            </div>
            <p style={{
              color: "#687789",
              fontSize: "14px",
              margin: "0 0 0 40px",
            }}>
              {card.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
