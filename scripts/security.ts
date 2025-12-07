import { encrypt, decrypt } from '../lib/crypto';
import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

// Path to .env file
const ENV_PATH = path.resolve(__dirname, '../.env');

// Load env to get ENCRYPTION_KEY if set
config({ path: ENV_PATH });

const args = process.argv.slice(2);
const command = args[0];
const text = args[1];

if (!command) {
    console.log('Usage:');
    console.log('  encrypt <text>       - Encrypt a value');
    console.log('  decrypt <hash>       - Decrypt a value');
    console.log('  secure-env           - Automatically encrypt POSTGRES_URL in .env');
    console.log('  reveal-env           - Decrypt POSTGRES_URL in .env (for editing)');
    process.exit(1);
}

try {
    if (command === 'encrypt' && text) {
        const encrypted = encrypt(text);
        console.log(`\nOriginal:  ${text}`);
        console.log(`Encrypted: ${encrypted}`);
    }
    else if (command === 'decrypt' && text) {
        const decrypted = decrypt(text);
        console.log(`\nEncrypted: ${text}`);
        console.log(`Decrypted: ${decrypted}`);
    }
    else if (command === 'secure-env') {
        secureEnv();
    }
    else if (command === 'reveal-env') {
        revealEnv();
    }
    else {
        console.log('Unknown command or missing arguments.');
    }
} catch (error: any) {
    console.error('Error:', error.message);
}

function secureEnv() {
    if (!fs.existsSync(ENV_PATH)) {
        console.error('.env file not found.');
        return;
    }

    let envContent = fs.readFileSync(ENV_PATH, 'utf8');
    const urlMatch = envContent.match(/^POSTGRES_URL=(.*)$/m);

    if (!urlMatch) {
        console.error('POSTGRES_URL not found in .env');
        return;
    }

    const currentUrl = urlMatch[1].trim();

    if (currentUrl.includes(':') && !currentUrl.startsWith('postgres')) {
        console.log('POSTGRES_URL appears to be already encrypted.');
        return;
    }

    console.log('Encrypting POSTGRES_URL...');
    const encrypted = encrypt(currentUrl);

    // Replace the line
    const newContent = envContent.replace(
        /^POSTGRES_URL=.*$/m,
        `POSTGRES_URL=${encrypted}`
    );

    fs.writeFileSync(ENV_PATH, newContent);
    console.log('Success! POSTGRES_URL has been encrypted in .env.');
}

function revealEnv() {
    if (!fs.existsSync(ENV_PATH)) {
        console.error('.env file not found.');
        return;
    }

    let envContent = fs.readFileSync(ENV_PATH, 'utf8');
    const urlMatch = envContent.match(/^POSTGRES_URL=(.*)$/m);

    if (!urlMatch) {
        console.error('POSTGRES_URL not found in .env');
        return;
    }

    const currentUrl = urlMatch[1].trim();

    if (currentUrl.startsWith('postgres')) {
        console.log('POSTGRES_URL is already plain text.');
        return;
    }

    try {
        console.log('Decrypting POSTGRES_URL...');
        const decrypted = decrypt(currentUrl);

        // Replace the line
        const newContent = envContent.replace(
            /^POSTGRES_URL=.*$/m,
            `POSTGRES_URL=${decrypted}`
        );

        fs.writeFileSync(ENV_PATH, newContent);
        console.log('Success! POSTGRES_URL has been revealed in .env.');
    } catch (e) {
        console.error('Failed to decrypt. It might not be encrypted or key is wrong.');
    }
}
