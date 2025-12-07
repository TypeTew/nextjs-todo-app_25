import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

interface RouteHandlerContext {
    params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: RouteHandlerContext) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { params } = context;
    const { id } = await params;

    try {
        await db.query('UPDATE todos SET completed = NOT completed WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: RouteHandlerContext) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { params } = context;
    const { id } = await params;

    try {
        await db.query('DELETE FROM todos WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
