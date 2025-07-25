"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaLocationDot } from "react-icons/fa6";
import { FaExternalLinkAlt, FaMapMarkedAlt } from "react-icons/fa";
import { useLanguage } from "@/components/context/LanguageContext";

import { MdEmail } from "react-icons/md";



const menuItems = [
    { en: "Home", id: "Beranda" },
    { en: "Vision & Mission", id: "Visi Misi" },
    { en: "Portfolio", id: "Portofolio" },
    { en: "News & Article", id: "Berita & Artikel" },
    // { en: "Contact", id: "Kontak" },
];

const Footer = () => {
    const { language } = useLanguage();
    return (
        <div>

            <div className="relative border-t border-gray-200 bg-gray-100">
                {/* Animated container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-screen-xl px-4 py-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                        {/* Logo & Description */}
                        <div>
                            <div className="flex items-center">
                                <Image
                                    className="rounded-md"
                                    src="/ahp-logo.png"
                                    alt="logo"
                                    width={50}
                                    height={50}
                                    style={{ height: "auto" }}
                                />
                                <div className="ml-3">
                                    <p className="font-semibold text-xl text-gray-700">AHP</p>
                                    <p className="text-sm text-gray-500">Aruna Hijau Power</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-600">
                                {language === "en"
                                    ? "The company’s mission to provide sustainable energy solutions."
                                    : "Menyediakan solusi energi berkelanjutan bagi masyarakat dan lingkungan."}
                            </p>
                            <p className="mt-6 text-sm text-gray-600">
                                {language === 'en' ? 'Find us on'
                                    :
                                    'Temukan kami di'}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                                <FaInstagram className="text-2xl text-green-700" />
                                <FaYoutube className="text-2xl text-green-700" />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex justify-start items-start gap-x-3 xl:px-4">
                            <div className="mt-1">
                                <FaExternalLinkAlt className="text-green-700" />
                            </div>
                            <div className="flex flex-col items-start gap-y-2 mb-4">
                                <p className="font-semibold text-xl text-gray-700">
                                    {language === "en" ? "Quick Links" : "Tautan Cepat"}
                                </p>
                                <div className="space-y-2">
                                    {menuItems.map((item, i) => (
                                        <div key={i}>
                                            <a href="#" className="text-sm text-gray-600 hover:text-green-700">
                                                {language === "en" ? item.en : item.id}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <div className="flex items-start gap-2 mb-8">
                                <MdEmail className="text-green-700 text-xl mt-1" />
                                <div>
                                    <p className="font-semibold text-xl text-gray-700">Email</p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <a href="mailto:contact@arunahijaupower.com" className="hover:text-green-700">
                                            contact@arunahijaupower.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <FaLocationDot className="text-green-700 text-xl mt-1" />
                                <div>
                                    <p className="font-semibold text-xl text-gray-700">
                                        {language === "en" ? "Head Office" : "Kantor Pusat"}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600 leading-7">
                                        Setiabudi Atrium, 6th Floor, 609 Suite.<br />
                                        Jl. Rasuna Said,<br />
                                        Jakarta Pusat.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <div className="md:flex-row items-start gap-4">
                                <div className="flex items-start gap-2 mb-8">
                                    <FaMapMarkedAlt className="text-green-700 text-xl mt-1" />
                                    <p className="font-semibold text-xl text-gray-700">
                                        {language === "en" ? "Location" : "Lokasi"}
                                    </p>
                                </div>
                                <div className="relative w-full h-0 pb-[56.25%] rounded-md shadow-lg overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3589.038977667974!2d106.80802397453179!3d-6.2614678613004076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f366ab58b0b1%3A0x9af8bf991483a97e!2sAruna%20PV%20(PT.%20Aruna%20Cahaya%20Pratama)!5e1!3m2!1sid!2sid!4v1752649275671!5m2!1sid!2sid"
                                        style={{
                                            border: 0,
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div>
                <p className="text-center text-md text-gray-600 py-4">
                    &copy; {new Date().getFullYear()} <strong>PT Aruna Hijau Power</strong> All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
