"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "./Button";
import { CheckSquare } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <CheckSquare className="h-6 w-6 text-[var(--primary)]" />
                            <span className="font-bold text-xl tracking-tight">Me Do List</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                            Home
                        </Link>
                        {session && (
                            <Link href="/dashboard" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                                Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-[var(--muted)] hidden sm:block">
                                    {session.user?.name}
                                </span>
                                <Button variant="outline" size="sm" onClick={() => signOut()}>
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/signin">
                                    <Button variant="ghost" size="sm">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="primary" size="sm">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
