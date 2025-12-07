"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { CheckSquare } from "lucide-react";

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("password");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError("Invalid credentials. Try user@example.com / password");
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--secondary)]/20 px-4">
            <div className="max-w-md w-full bg-[var(--background)] p-8 rounded-2xl shadow-lg border border-[var(--border)]">
                <div className="flex justify-center mb-6">
                    <Link href="/" className="flex items-center gap-2">
                        <CheckSquare className="h-8 w-8 text-[var(--primary)]" />
                        <span className="font-bold text-2xl tracking-tight">Me Do List</span>
                    </Link>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2">Welcome back</h2>
                <p className="text-center text-[var(--muted)] mb-8">Please sign in to your account</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                            placeholder="user@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                            placeholder="password"
                        />
                    </div>

                    <div className="text-xs text-[var(--muted)] text-center">
                        Demo credentials: user@example.com / password
                    </div>

                    <Button type="submit" className="w-full" isLoading={loading}>
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-[var(--muted)]">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-[var(--primary)] font-medium hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
