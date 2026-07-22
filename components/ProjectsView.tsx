"use client";

import { ArrowLeft } from "lucide-react";

interface ProjectsViewProps {
  onBack: () => void;
}

const projects = [
  { id: 1, name: "VaultOS Core", status: "active", progress: 65, tasks: 12, desc: "Main operating system interface" },
  { id: 2, name: "AI Assistant Module", status: "active", progress: 40, tasks: 8, desc: "Conversational AI integration" },
  { id: 3, name: "Sync Engine", status: "paused", progress: 20, tasks: 5, desc: "Cross-device data synchronization" },
];

const statusStyles: Record<string, { bg: string; color: string }> = {
  active: { bg: "#1E3A2F", color: "#6BFFB8" },
  paused: { bg: "#3A2E1E", color: "#FFD66B" },
  done: { bg: "#1E2532", color: "#8B95A5" },
};

export default function ProjectsView({ onBack }: ProjectsViewProps) {
  return (
    <div className="px-5 pb-24 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6 pt-5">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer" style={{ background: "#151A25", border: "1px solid #1E2532" }}>
          <ArrowLeft size={20} color="#fff" />
        </button>
        <h2 className="text-2xl font-bold">Projects</h2>
      </div>

      {projects.map((p) => {
        const style = statusStyles[p.status];
        return (
          <div key={p.id} className="rounded-2xl p-[18px] mb-3 cursor-pointer transition-all" style={{ background: "#151A25", border: "1px solid #1E2532" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2A3548"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1E2532"; }}>
            <div className="flex justify-between items-center mb-2.5">
              <h4 className="text-base font-semibold">{p.name}</h4>
              <span className="text-[11px] px-2.5 py-1 rounded-[20px] font-medium" style={{ background: style.bg, color: style.color }}>{p.status}</span>
            </div>
            <p className="text-[13px] mb-1" style={{ color: "#6B7789" }}>{p.desc}</p>
            <div className="h-1.5 rounded-md overflow-hidden mt-2.5" style={{ background: "#1E2532" }}>
              <div className="h-full rounded-md transition-all duration-500" style={{ width: `${p.progress}%`, background: "#C49FFF" }} />
            </div>
            <div className="flex gap-4 mt-2.5 text-xs" style={{ color: "#5A6578" }}>
              <span>{p.progress}% complete</span>
              <span>{p.tasks} tasks</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
