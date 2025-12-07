import { NextResponse } from 'next/server';
import pool from '@/lib/neon';

export async function GET() {
    try {
        const result = await pool.query('SELECT NOW() as now');
        return NextResponse.json({
            success: true,
            message: 'Connected to Neon/Postgres successfully',
            time: result.rows[0].now
        });
    } catch (error: unknown) {
        console.error('Database Connection Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to connect to Neon',
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
