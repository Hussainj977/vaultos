"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface NotesViewProps {
  onBack: () => void;
}

interface Note {
  id: number;
  title: string;
  body: string;
  date: string;
}

export default function NotesView({ onBack }: NotesViewProps) {
  const [notes, setNotes] = useLocalStorage<Note[]>("vaultos_notes", [
    { id: 1, title: "VaultOS Architecture", body: "Core modules: Dashboard, Tasks, Projects, Notes, AI. Built with React + localStorage for persistence.", date: "Jul 21, 2026" },
    { id: 2, title: "Feature Ideas", body: "- Voice commands\n- Widget system\n- Calendar integration\n- Dark/light mode toggle", date: "Jul 20, 2026" },
  ]);
  const [editing, setEditing] = useState<Note | null>(null);

  const saveNote = () => {
    if (!editing) return;
    const exists = notes.find((n) => n.id === editing.id);
    if (exists) setNotes(notes.map((n) => (n.id === editing.id ? editing : n)));
    else setNotes([editing, ...notes]);
    setEditing(null);
  };

  const deleteNote = (id: number) => setNotes(notes.filter((n) => n.id !== id));

  if (editing) {
    return (
      <div className="px-5 pb-24 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6 pt-5">
          <button onClick={() => setEditing(null)} className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer" style={{ background: "#151A25", border: "1px solid #1E2532" }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <h2 className="text-2xl font-bold">{editing.title ? "Edit Note" : "New Note"}</h2>
        </div>
        <div className="rounded-2xl p-4 min-h-[200px]" style={{ background: "#151A25", border: "1px solid #1E2532" }}>
          <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Note title..."
            className="w-full bg-transparent border-none outline-none text-lg font-semibold mb-3" style={{ color: "#fff" }} />
          <textarea value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} placeholder="Write your thoughts..."
            className="w-full bg-transparent border-none outline-none resize-none text-[15px] leading-relaxed min-h-[140px]" style={{ color: "#D1D5DB" }} />
        </div>
        <button onClick={saveNote} className="mt-4 w-full py-3.5 rounded-[14px] text-[15px] font-semibold cursor-pointer border-none" style={{ background: "#1E3A2F", color: "#6BFFB8" }}>Save Note</button>
      </div>
    );
  }

  return (
    <div className="px-5 pb-24 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6 pt-5">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer" style={{ background: "#151A25", border: "1px solid #1E2532" }}>
          <ArrowLeft size={20} color="#fff" />
        </button>
        <h2 className="text-2xl font-bold">Notes</h2>
      </div>

      <button onClick={() => setEditing({ id: Date.now(), title: "", body: "", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })}
        className="w-full py-3.5 rounded-[14px] text-[15px] font-semibold cursor-pointer border-none mb-4" style={{ background: "#1E3A2F", color: "#6BFFB8" }}>+ New Note</button>

      {notes.map((note) => (
        <div key={note.id} className="rounded-2xl p-4 mb-3 cursor-pointer transition-all" style={{ background: "#151A25", border: "1px solid #1E2532" }}
          onClick={() => setEditing(note)}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2A3548"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1E2532"; }}>
          <div className="flex justify-between items-start">
            <h4 className="text-[15px] font-semibold mb-1.5">{note.title}</h4>
            <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} className="text-xs px-2 py-1 rounded cursor-pointer border-none" style={{ color: "#5A6578", background: "#1E2532" }}>Delete</button>
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: "#6B7789" }}>{note.body.slice(0, 80)}{note.body.length > 80 ? "..." : ""}</p>
          <div className="text-[11px] mt-2" style={{ color: "#4A5568" }}>{note.date}</div>
        </div>
      ))}
    </div>
  );
}
