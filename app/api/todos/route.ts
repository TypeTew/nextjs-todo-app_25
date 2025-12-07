import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/neon";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Get user id first
        const users = await pool.query('SELECT id FROM users WHERE email = $1', [session.user.email]);
        if (users.rows.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const userId = users.rows[0].id;

        const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return NextResponse.json(todos.rows);
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { text } = await req.json();
        if (!text) return NextResponse.json({ error: "Text required" }, { status: 400 });

        const users = await pool.query('SELECT id FROM users WHERE email = $1', [session.user.email]);
        if (users.rows.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
        const userId = users.rows[0].id;

        const id = uuidv4();
        await pool.query('INSERT INTO todos (id, text, user_id) VALUES ($1, $2, $3)', [id, text, userId]);

        return NextResponse.json({ id, text, completed: false }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
