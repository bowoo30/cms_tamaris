"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, Variants } from "framer-motion";
import "swiper/css";
import { useLanguage } from "@/components/context/LanguageContext";

const logos = [
    { src: "/pln-1.png", alt: "PLN", width: 120, height: 120 },
    { src: "/pln-batam.png", alt: "PLN Batam", width: 100, height: 100 },
    { src: "/tatajabar.png", alt: "Tatajabar", width: 110, height: 110 },
    { src: "/kbi.png", alt: "KBI", width: 100, height: 100 },
    { src: "/blessindo.jpg", alt: "Blessindo", width: 70, height: 70 },
    { src: "/aruna.jpeg", alt: "Aruna", width: 60, height: 60 },
];

// Variants for fade-in animation
const cardVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.42, 0, 0.58, 1], // ✅ FIXED: gunakan import dari framer-motion
        },
    },
};

const Partners = () => {
    const { language } = useLanguage();
    return (
        <div className="w-full py-10">
            {/* Title Section with Animation */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariant}
                className="text-center px-2 md:px-4 mb-10"
            >
                <h1 className="text-[#005b96] text-3xl font-semibold">
                    {language === "en" ? "Partners" : "Mitra Kami"}
                </h1>
                <hr className="border-2 w-[100px] border-[#80b918] mx-auto my-2" />
            </motion.div>

            {/* Swiper Section with Animated Logos */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariant}
                className="px-2 py-6"
            >
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop
                    breakpoints={{
                        320: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 },
                    }}
                >
                    {logos.map((logo, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="flex justify-center items-center h-[140px]"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={logo.width}
                                    height={logo.height}
                                    style={{ height: "auto" }}
                                    className="object-contain max-h-[100px]"
                                />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </div>
    );
};

export default Partners;
