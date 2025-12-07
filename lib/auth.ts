import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Authorizing user:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials");
                    return null;
                }

                try {
                    const [rows] = await db.query<RowDataPacket[]>(
                        'SELECT * FROM users WHERE email = ?',
                        [credentials.email]
                    );

                    if (rows.length === 0) return null;

                    const user = rows[0];
                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isValid) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "supersecretkey", // In production use a real secret
    debug: true, // Enable debug messages in the console
};
