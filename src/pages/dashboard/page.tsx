'use client'
import { data } from "framer-motion/client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useOpen } from "@/components/context/isActived";
import { useEffect } from "react";



const DashboardAdmin = () => {
    const { data: session, status } = useSession();
    const { open } = useOpen();
    // const router = useRouter();
    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/admin");
    //     }
    // }, [status, router]);

    // console.log("Session data:", session);


    return (
        <div className={`relative p-4 mx-4 mt-5 ${open ? "min-w-[1300px]" : "min-w-[1400px]"}`}>
            <div className="flex items-center space-x-4">
                <div className="border-r pr-4">
                    <h1 className="text-2xl font-semibold text-sky-900">Dashboard CMS Tamaris</h1>
                </div>
                <div className="">
                    <p className="text-gray-500">{session?.user?.name}</p>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;