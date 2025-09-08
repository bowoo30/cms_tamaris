import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// Pastikan kamu memiliki tipe User seperti ini di types/user.ts
interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    token: string; // Token harus selalu ada
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            // [...nextauth].ts
            async authorize(credentials, req): Promise<User | null> {
                const { email, password } = credentials ?? {};
                if (!email || !password) return null;

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    console.log("Status code from backend:", res.status);

                    const data = await res.json();
                    console.log("Data from backend:", data);

                    const user = data.user || data.data?.user;
                    const token = data.token || data.data?.token;

                    if (!user || !token) {
                        console.warn("Missing user or token in response");
                        return null;
                    }

                    // Pastikan token selalu string
                    return { ...user, token: String(token) };

                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            }

        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60, // 1 hour
    },

    pages: {
        signIn: "/admin",
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