import { Pool } from 'pg';
import { decrypt } from './crypto';

const envUrl = process.env.POSTGRES_URL || '';
let connectionString = envUrl;

// If it doesn't look like a standard postgres url AND has a colon, try decrypting
if (envUrl && !envUrl.startsWith('postgres://') && !envUrl.startsWith('postgresql://') && envUrl.includes(':')) {
    try {
        connectionString = decrypt(envUrl);
    } catch (e) {
        console.error("Failed to decrypt POSTGRES_URL", e);
        // Fallback to original just in case it was a weird valid URL
        connectionString = envUrl;
    }
}

const pool = new Pool({
    connectionString,
    ssl: true,
});

export default pool;
