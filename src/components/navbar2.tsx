'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLanguage } from "@/components/context/LanguageContext";
import Link from "next/link";
import { ImCancelCircle } from "react-icons/im";

const Navbar = () => {
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpenMenu(!isOpenMenu);

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
            <div className={`flex justify-between items-center max-w-screen-xl mx-auto px-4 py-3 ${scrolled ? "text-black" : "text-gray-800"}`}>
                {/* Logo */}
                <div className="flex items-center" onClick={() => window.location.href = "/"}>
                    <Image className="rounded-md" src="/ahp-logo.png" alt="logo" width={60} height={40} />
                    <div className="flex flex-col ml-3">
                        <p className="font-semibold text-3xl tracking-widest">AHP</p>
                        <p className="font-light text-xl tracking-widest">PT Aruna Hijau Power</p>
                    </div>
                </div>


                {/* Hamburger Icon (Mobile) */}
                <div className="relative md:hidden">
                    {isOpenMenu ? (
                        <ImCancelCircle className={`text-3xl ${scrolled ? "text-black" : "text-black"}`} onClick={toggleMenu} />
                    ) :
                        (
                            <GiHamburgerMenu className={`text-3xl ${scrolled ? "text-black" : "text-black"}`} onClick={toggleMenu} />
                        )
                    }

                    <div>
                        {isOpenMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-14 right-0 bg-white p-4 rounded-md shadow-md"
                            >
                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <div
                                            className="flex items-center relative cursor-pointer gap-x-2"
                                            onClick={toggleLanguage}
                                        >
                                            <Image
                                                src={language === "en" ? "/uk.png" : "/id.png"}
                                                alt={language.toUpperCase()}
                                                width={20}
                                                height={20}
                                            />
                                            <p className="font-light text-black">{language.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href="/" className="font-light text-black cursor-pointer">
                                            {language === "en" ? "Home" : "Beranda"}
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <div
                                            className="flex justify-start items-center space-x-2 cursor-pointer"
                                            onClick={() => setIsOpenProfile(!isOpenProfile)}
                                        >
                                            <p className="font-light text-black">
                                                {language === "en" ? "Profile" : "Profil"}
                                            </p>
                                            <motion.div animate={{ rotate: isOpenProfile ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                                {isOpenProfile ? (
                                                    <IoIosArrowUp className="text-xl text-black" />
                                                ) : (
                                                    <IoIosArrowDown className="text-xl text-black" />
                                                )}
                                            </motion.div>
                                        </div>

                                        <AnimatePresence>
                                            {isOpenProfile && (
                                                <motion.ul
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.3 }}
                                                    className=" mt-2 right-5 bg-white min-w-[50px] px-2 space-y-2"
                                                >
                                                    <li>
                                                        <Link
                                                            href="/profile/about"
                                                            className="block text-gray-700 text-sm hover:text-[#005b96] transition"
                                                        >
                                                            {language === "en" ? "About Us" : "Tentang Kami"}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/profile/our-story"
                                                            className="block text-gray-700 text-sm hover:text-[#005b96] transition"
                                                        >
                                                            {language === "en" ? "Our Story" : "Cerita Kami"}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/profile/vision"
                                                            className="block text-gray-700 text-sm hover:text-[#005b96] transition"
                                                        >
                                                            {language === "en" ? "Vision & Mission" : "Visi & Misi"}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/profile/portfolio"
                                                            className="block text-gray-700 text-sm hover:text-[#005b96] transition"
                                                        >
                                                            {language === "en" ? "Portofolio" : "Portofolio"}
                                                        </Link>
                                                    </li>
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div>
                                        <Link href="/news-and-artikel" className="font-light text-black cursor-pointer">
                                            {language === "en" ? "N & A" : "B & A"}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10 items-center relative">
                    <Link href="/" className="font-light cursor-pointer">
                        {language === "en" ? "Home" : "Beranda"}
                    </Link>

                    {/* Dropdown Profile */}
                    <div className="flex items-center gap-x-2 cursor-pointer relative" onClick={() => setIsOpenProfile(!isOpenProfile)}>
                        <p className="font-light">
                            {language === "en" ? "Profile" : "Profil"}
                        </p>
                        <motion.div animate={{ rotate: isOpenProfile ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            {isOpenProfile ? <IoIosArrowUp className="text-2xl" /> : <IoIosArrowDown className="text-2xl" />}
                        </motion.div>

                        <AnimatePresence>
                            {isOpenProfile && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute top-[110%] left-0 bg-white shadow-xl rounded-xl p-4 space-y-2 z-20 min-w-[180px]"
                                >
                                    <div>
                                        <Link href="/profile/about" className="text-gray-700 text-sm hover:text-[#005b96] transition">
                                            {language === "en" ? "About Us" : "Tentang Kami"}
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href="/profile/our-story" className="text-gray-700 text-sm hover:text-[#005b96] transition">
                                            {language === "en" ? "Our Story" : "Cerita Kami"}
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href="/profile/vision" className="text-gray-700 text-sm hover:text-[#005b96] transition">
                                            {language === "en" ? "Vision & Mission" : "Visi & Misi"}
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href="/profile/portfolio" className="text-gray-700 text-sm hover:text-[#005b96] transition">
                                            {language === "en" ? "Portofolio" : "Portofolio"}
                                        </Link>
                                    </div>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                    <div>
                        <Link href="/news-and-artikel" className="font-light cursor-pointer">
                            {language === "en" ? "News & Article" : "Berita & Artikel"}
                        </Link>
                    </div>

                    {/* Language Switcher */}
                    <div
                        className="flex items-center gap-x-2 relative cursor-pointer"
                        onClick={toggleLanguage}
                    >
                        <Image
                            src={language === "en" ? "/uk.png" : "/id.png"}
                            alt={language.toUpperCase()}
                            width={20}
                            height={20}
                        />
                        <p className="font-light">{language.toUpperCase()}</p>
                    </div>
                </div>
            </div>
            <hr className="shadow-xl border-gray-200 " />
        </div>
    );
};

export default Navbar;
