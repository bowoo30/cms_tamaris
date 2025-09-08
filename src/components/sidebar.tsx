'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiGlobe, FiUsers } from "react-icons/fi";
import { MdFindInPage } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { TbLogout2 } from "react-icons/tb";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { useOpen } from "@/components/context/isActived";
import FooterDashboard from "./footerDashboard";
import { FaLanguage } from "react-icons/fa6";

const links = [
    { href: "/dashboard", label: "Dashboard", icon: FiGrid },
    { href: "/dashboard/pages", label: "Pages", icon: MdFindInPage },
    { href: "/dashboard/widgets", label: "Widgets", icon: FiGlobe },
    { href: "/dashboard/company", label: "Company", icon: HiBuildingOffice2 },
    { href: "/dashboard/user", label: "Users", icon: FiUsers },
    { href: "/dashboard/language", label: "Language", icon: FaLanguage },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const router = useRouter();
    const { open, setOpen } = useOpen();

    // Load state from localStorage
    useEffect(() => {
        const storedOpen = localStorage.getItem("sidebarOpen");
        if (storedOpen !== null) {
            setOpen(storedOpen === "true");
        }
    }, []);

    const handleOpened = () => {
        const newOpen = !open;
        setOpen(newOpen);
        localStorage.setItem("sidebarOpen", String(newOpen));
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    id: session?.user?.id,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "Logout successful");
                localStorage.removeItem("token");
                await signOut({ redirect: false });
                router.push("/admin");
            } else {
                toast.error("Logout gagal: " + data.error);
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat logout");
            console.error("Logout error:", error);
        }
    };

    return (
        <aside className={`${open ? "w-60" : "w-20"} transition-all duration-500 shadow-md h-screen sticky top-0 z-10 bg-[#E9EFEC] rounded-r-xl`}>
            {/* Header */}
            <div className="relative p-6 border-b border-gray-300">
                <p className={`text-center transition-all duration-500 ${open ? "text-3xl font-bold tracking-wide" : "text-xs font-bold"} text-sky-900`}>
                    CMS Tamaris
                </p>
                <div className="absolute top-1/2 -translate-y-1/2 right-[-10px]">
                    <button onClick={handleOpened} className="text-xl text-sky-800 hover:text-sky-600 transition-all duration-200">
                        {open ? <IoIosArrowDropleftCircle className={`${open && "text-2xl"}`} /> : <IoIosArrowDroprightCircle />}
                    </button>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-1 p-4">
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <div className="relative group" key={href}>
                            <Link
                                href={href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 font-medium
                  ${isActive ? "bg-sky-100 text-sky-900 shadow-sm" : "text-gray-700 hover:bg-sky-50 hover:text-sky-800"}
                `}
                            >
                                <Icon size={20} className={isActive ? "text-sky-700" : "text-gray-800"} />
                                {open && <span>{label}</span>}
                            </Link>

                            {/* Tooltip (only when sidebar is collapsed) */}
                            {!open && (
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 
                  bg-white border border-sky-700 text-sky-900 text-sm px-3 py-1 rounded shadow-md
                  transition-opacity duration-300 z-20 whitespace-nowrap">
                                    {label}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="relative border-t border-gray-300 flex justify-start p-4">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full hover:bg-sky-100
          rounded-lg py-2 mt-4 duration-300 transition-all cursor-pointer px-4 text-left text-gray-700
          hover:text-sky-800 font-medium">
                    <TbLogout2 size={20} className="text-gray-700 hover:text-sky-800" />
                    {open && <span>Logout</span>}
                </button>
            </div>
            <div className="absolute bottom-0 w-full">
                <FooterDashboard />
            </div>
        </aside>
    );
}
