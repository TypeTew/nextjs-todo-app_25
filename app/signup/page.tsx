"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { CheckSquare } from "lucide-react";

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const target = e.target as typeof e.target & {
            0: { value: string }; // Name
            1: { value: string }; // Email
            2: { value: string }; // Password
        };

        const name = target[0].value;
        const email = target[1].value;
        const password = target[2].value;

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (res.ok) {
                router.push("/signin");
            } else {
                // In a real app handle error UI
                alert("Registration failed");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--secondary)]/20 px-4">
            <div className="max-w-md w-full bg-[var(--background)] p-8 rounded-2xl shadow-lg border border-[var(--border)]">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2">
                        <CheckSquare className="h-8 w-8 text-[var(--primary)]" />
                        <span className="font-bold text-2xl tracking-tight">Me Do List</span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2">Create an account</h2>
                <p className="text-center text-[var(--muted)] mb-8">Start organizing your life today</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <Button type="submit" className="w-full" isLoading={loading}>
                        Sign Up
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-[var(--muted)]">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-[var(--primary)] font-medium hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
