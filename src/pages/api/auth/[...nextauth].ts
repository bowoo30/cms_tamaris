import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// Pastikan kamu memiliki tipe User seperti ini di types/user.ts
interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials): Promise<User | null> {
                const { email, password } = credentials ?? {};

                if (!email || !password) {
                    console.log("Invalid credentials");
                    return null;
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!res.ok) {
                        console.log("Failed to authenticate");
                        return null;
                    }

                    const data = await res.json();

                    if (!data || !data.user) {
                        console.log("No user data found");
                        return null;
                    }

                    // Asumsi `data.user` memiliki struktur seperti { id, email, name }
                    return data.user as User; // Pastikan backend mengembalikan User yang sesuai tipe
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60, // 1 hour
    },

    pages: {
        signIn: "/auth/signin",
    },

    callbacks: {
        async jwt({ token, user }) {
            // `user` hanya tersedia saat login pertama kali
            if (user) {
                token.user = user;
            }
            return token;
        },

        async session({ session, token }) {
            // Tambahkan user dari token ke session
            if (token.user) {
                session.user = token.user as User;
            }
            return session;
        },
    },

    // Gunakan secret untuk tanda tangan JWT (wajib di production)
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);