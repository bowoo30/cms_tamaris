"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ProtectedPage({ children }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin"); // halaman login
        }
    }, [status, router]);

    return <>{children}</>;
}

export default ProtectedPage;
