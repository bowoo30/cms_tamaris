// components/RegisterPage.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await res.json();
            if (data) {
                toast.success("User registered successfully");
                setTimeout(() => {
                    router.push("/admin");
                }, 1500); // delay 1.5 detik
            } else {
                setError(data.message);
                toast.error(data.message);
            }

        } catch (error) {
            console.error("Error registering user:", error);

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

            {/* Registration card */}
            <div className="absolute top-1/2 left-1/2 w-[300px] transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 z-10">
                <div className="mb-6 text-center">
                    <p className="text-2xl font-bold text-[#ececec]">CMS Tamaris</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500
                        cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-xs mt-3 text-center">{error}</p>
                )}

                <p className="text-xs mt-5 text-center text-white">
                    Do you have an account?{" "}
                    <Link
                        href="/admin"
                        className="text-blue-300 hover:underline transition duration-200"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default RegisterPage;