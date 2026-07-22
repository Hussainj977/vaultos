"use client";

import { useState } from "react";
import { ArrowLeft, Plus, X, Check } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TasksViewProps {
  onBack: () => void;
}

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function TasksView({ onBack }: TasksViewProps) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("vaultos_tasks", [
    { id: 1, text: "Review VaultOS design mockups", done: false },
    { id: 2, text: "Set up GitHub Codespace", done: true },
    { id: 3, text: "Build dashboard components", done: false },
  ]);
  const [input, setInput] = useState("");

  const toggleTask = (id: number) => setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const deleteTask = (id: number) => setTasks(tasks.filter((t) => t.id !== id));
  const addTask = () => { if (!input.trim()) return; setTasks([...tasks, { id: Date.now(), text: input, done: false }]); setInput(""); };

  return (
    <div className="px-5 pb-24 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6 pt-5">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer" style={{ background: "#151A25", border: "1px solid #1E2532" }}>
          <ArrowLeft size={20} color="#fff" />
        </button>
        <h2 className="text-2xl font-bold">Daily Tasks</h2>
      </div>

      <div className="flex gap-2.5 mb-5">
        <input type="text" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1 rounded-[14px] px-4 py-3.5 text-[15px] outline-none" style={{ background: "#151A25", border: "1px solid #1E2532", color: "#fff" }} />
        <button onClick={addTask} className="w-12 h-12 rounded-[14px] flex items-center justify-center cursor-pointer" style={{ background: "#1E3A5F", color: "#6BB5FF" }}>
          <Plus size={24} />
        </button>
      </div>

      {tasks.length === 0 && <div className="text-center py-16" style={{ color: "#4A5568" }}><div className="text-5xl mb-4 opacity-50">📝</div><p>No tasks yet. Add one above!</p></div>}

      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3.5 p-4 rounded-2xl mb-2.5 transition-all" style={{ background: "#151A25", border: "1px solid #1E2532", opacity: task.done ? 0.4 : 1 }}>
          <button onClick={() => toggleTask(task.id)} className="w-[22px] h-[22px] rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition-all" style={{ border: task.done ? "2px solid #6BB5FF" : "2px solid #3A4558", background: task.done ? "#6BB5FF" : "transparent" }}>
            {task.done && <Check size={14} color="#0B0E14" strokeWidth={3} />}
          </button>
          <span className="flex-1 text-[15px]" style={{ color: task.done ? "#4A5568" : "#D1D5DB", textDecoration: task.done ? "line-through" : "none" }}>{task.text}</span>
          <button onClick={() => deleteTask(task.id)} className="p-1 cursor-pointer" style={{ color: "#5A6578", background: "none", border: "none" }}><X size={18} /></button>
        </div>
      ))}
    </div>
  );
}
