"use client";

import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Plus, Trash2, CheckCircle, Circle } from "lucide-react";
import { useSession } from "next-auth/react";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function Dashboard() {
    const { data: session } = useSession();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchTodos();
        }
    }, [session]);

    const fetchTodos = async () => {
        try {
            const res = await fetch('/api/todos');
            const data = await res.json();
            if (Array.isArray(data)) setTodos(data);
        } catch {
            console.error("Failed to fetch todos");
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newTodo })
            });

            if (res.ok) {
                const todo = await res.json();
                setTodos([todo, ...todos]);
                setNewTodo("");
            }
        } catch {
            console.error("Failed to add todo");
        }
    };

    const toggleTodo = async (id: string, currentStatus: boolean) => {
        // Optimistic update
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));

        try {
            await fetch(`/api/todos/${id}`, { method: 'PATCH' });
        } catch {
            // Revert on error
            setTodos(todos.map(t => t.id === id ? { ...t, completed: currentStatus } : t));
        }
    };

    const deleteTodo = async (id: string) => {
        // Optimistic update
        setTodos(todos.filter(t => t.id !== id));

        try {
            await fetch(`/api/todos/${id}`, { method: 'DELETE' });
        } catch {
            // Could revert here if needed needs prev state
        }
    };

    // Calculate stats
    const completedCount = todos.filter(t => t.completed).length;
    const totalCount = todos.length;
    const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

    return (
        <main className="min-h-screen flex flex-col bg-[var(--background)]">
            <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {session?.user?.name?.split(" ")[0] || "Friend"}
                    </h1>
                    <p className="text-[var(--muted)]">Here&apos;s what you need to do today.</p>
                </div>

                {/* Stats Card */}
                <div className="bg-[var(--secondary)]/30 rounded-2xl p-6 mb-8 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-lg">Your Progress</h3>
                        <p className="text-[var(--muted)] text-sm">
                            {completedCount} of {totalCount} tasks completed
                        </p>
                    </div>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                className="text-[var(--border)]"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={175.9}
                                strokeDashoffset={175.9 - (175.9 * progress) / 100}
                                className="text-[var(--primary)] transition-all duration-500 ease-out"
                            />
                        </svg>
                        <span className="absolute text-xs font-semibold">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Add Todo From */}
                <form onSubmit={addTodo} className="flex gap-2 mb-8">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all shadow-sm"
                    />
                    <Button type="submit" size="lg" className="rounded-xl px-6">
                        <Plus className="w-5 h-5" />
                    </Button>
                </form>

                {/* Todo List */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="text-center py-12 text-[var(--muted)]">Loading tasks...</div>
                    ) : todos.length === 0 ? (
                        <div className="text-center py-12 text-[var(--muted)] border-2 border-dashed border-[var(--border)] rounded-2xl">
                            <p>No tasks yet. Add one to get started!</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${todo.completed
                                    ? "bg-[var(--secondary)]/10 border-transparent opacity-60"
                                    : "bg-[var(--background)] border-[var(--border)] hover:border-[var(--primary)] shadow-sm"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleTodo(todo.id, todo.completed)}
                                    className={`flex-shrink-0 transition-colors ${todo.completed ? "text-[var(--primary)]" : "text-[var(--muted)] hover:text-[var(--primary)]"
                                        }`}
                                >
                                    {todo.completed ? (
                                        <CheckCircle className="w-6 h-6" />
                                    ) : (
                                        <Circle className="w-6 h-6" />
                                    )}
                                </button>

                                <span className={`flex-1 ${todo.completed ? "line-through text-[var(--muted)]" : ""}`}>
                                    {todo.text}
                                </span>

                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="opacity-0 group-hover:opacity-100 text-[var(--muted)] hover:text-red-500 transition-all p-2 rounded-lg hover:bg-red-50"
                                    aria-label="Delete task"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
