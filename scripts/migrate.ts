import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';
import { Pool } from 'pg';
import { decrypt } from '../lib/crypto';

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../.env') });

const envUrl = process.env.POSTGRES_URL || '';
let connectionString = envUrl;

// Decrypt if necessary
if (envUrl && !envUrl.startsWith('postgres://') && !envUrl.startsWith('postgresql://') && envUrl.includes(':')) {
    try {
        connectionString = decrypt(envUrl);
    } catch (e) {
        console.error("Failed to decrypt POSTGRES_URL in migrate script", e);
    }
}

const pool = new Pool({
    connectionString,
    ssl: true,
});

async function migrate() {
    try {
        console.log('Starting migration...');
        const sqlPath = path.join(__dirname, '../db/init_neon.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log(`Executing SQL from ${sqlPath}...`);

        await pool.query(sql);

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
