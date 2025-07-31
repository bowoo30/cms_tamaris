// components/LoginAuth.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Image from "next/image";

// Tipe user untuk type safety
interface User {
    id: string;
    name: string;
    email: string;
    role_id: number;
}

const LoginAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            // 1. Login via NextAuth → trigger authorize di [...nextauth].ts
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                toast.error("Email atau password salah");
                return;
            }

            if (res?.ok) {
                // 2. Ambil data user dari Golang API (karena signIn() tidak kembalikan user)
                const userDataRes = await fetch(
                    `${process.env.NEXT_PUBLIC_GOLANG_API}/api/login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    }
                );

                if (userDataRes.ok) {
                    const userData: User = await userDataRes.json();

                    // 3. Simpan ke sessionStorage
                    // sessionStorage.setItem("user", JSON.stringify(userData));
                    console.log("User disimpan di sessionStorage:", userData);
                }

                toast.success("Login berhasil!");
                router.push("/home");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Gagal menghubungi server. Periksa koneksi atau backend.");
            toast.error("Terjadi kesalahan jaringan.");
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background video */}
            <video
                className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
                src="/bg-login.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            />

            {/* Login card */}
            <div className="absolute top-1/2 left-1/2 w-[300px] transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 z-10">
                <div className="mb-6 text-center">
                    <p className="text-2xl font-bold text-[#ececec]">CMS Tamaris</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="admin@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30"
                        required
                    />
                    <input
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500
                        cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-xs mt-3 text-center">{error}</p>
                )}

                <p className="text-xs mt-5 text-center text-white">
                    Sudah punya akun?{" "}
                    <Link
                        href="/register"
                        className="text-blue-300 hover:underline transition duration-200"
                    >
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default LoginAuth;