"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/context/LanguageContext";

export default function HeroSection() {
    const { language } = useLanguage();

    // Ambil bahasa dari localStorage saat komponen pertama kali dimuat

    return (
        <section className="relative w-full min-h-[100dvh] overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover object-center"
                    src="/ahp.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center text-white px-4">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {language === "en"
                        ? "Solar Solutions for a Cleaner World"
                        : "Energi Surya sebagai Solusi untuk Dunia Bersih"}
                </motion.h1>

                <motion.p
                    className="mt-4 font-light text-sm sm:text-base md:text-xl max-w-[90%] sm:max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {language === "en"
                        ? "Showing the company as a leader in renewable energy while emphasizing its dedication to green initiatives."
                        : "Menampilkan perusahaan sebagai pemimpin energi terbarukan dengan menekankan komitmennya terhadap inisiatif ramah lingkungan."}
                </motion.p>
            </div>
        </section>
    );
}
