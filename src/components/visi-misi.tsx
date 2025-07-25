"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GrAchievement } from "react-icons/gr";
import { MdHighlight } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { FaGlobeAsia } from "react-icons/fa";
import { GiDart } from "react-icons/gi";
import { useLanguage } from "@/components/context/LanguageContext";

const VisiMisi = () => {
    const { language } = useLanguage();
    return (
        <div className="relative w-full h-[500px] xl:h-[300px] overflow-hidden">
            {/* Background image as absolute */}
            <div className="absolute inset-0 z-10">
                <Image
                    src="/bg-vm.jpg"
                    alt="bg"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Overlay content */}
            <motion.div
                className="max-w-screen-xl mx-auto px-[8%] grid  grid-cols-1 xl:grid-cols-2 absolute inset-0 z-10 mt-5 xl:mt-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* VISION */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-x-4 p-4"
                >
                    <GrAchievement className="text-4xl xl:text-4xl text-[#005b96]" />
                    <div>
                        <h2 className="text-2xl font-semibold text-[#005b96]">
                            {language === "en" ? "Vision" : "Visi"}
                        </h2>
                        <hr className="border-2 w-[60px] border-[#80b918]" />
                        <div className="space-y-4 mt-5">
                            <div className="flex items-center gap-x-5">
                                <FaGlobeAsia className="text-teal-500 w-10 h-10 xl:w-8 xl:h-8" />
                                <p className="text-gray-700 text-sm ">
                                    {language === "en"
                                        ? "To become a leading renewable energy company in Indonesia, with a strong commitment to sustainability and social responsibility."
                                        : "Menjadi Perusahaan Global yang Berkelanjutan dalam Bidang Investasi Energi Terbarukan."}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* MISSION */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-x-4 p-4 xl:mt-0 "
                >
                    <GiDart className="text-4xl xl:text-4xl text-[#005b96]" />
                    <div>
                        <h2 className="text-2xl font-semibold text-[#005b96]">
                            {language === "en" ? "Mission" : "Misi"}
                        </h2>
                        <hr className="border-2 w-[80px] border-[#80b918]" />
                        <ul className="space-y-4 mt-5">
                            <li className="text-gray-700 text-sm flex gap-x-4 justify-start items-start">
                                <MdHighlight className="text-teal-500 text-5xl xl:text-4xl" />
                                {language === "en"
                                    ? "To develop and manage renewable energy plants with a focus on efficiency and positive social impact."
                                    : "Membangun dan mengelola pembangkit listrik ramah lingkungan berorientasi pada efisiensi dan dampak positif sosial."}
                            </li>
                            <li className="text-gray-700 text-sm flex justify-start items-start gap-x-5">
                                <FaBoltLightning className="text-teal-500 text-4xl xl:text-3xl ml-1" />
                                {language === "en"
                                    ? "Realizing green energy solutions through the development of efficient power plants that have a real impact on the environment and society."
                                    : "Menyediakan solusi energi hijau melalui pembangunan pembangkit yang efisien dan berdampak nyata bagi lingkungan dan masyarakat."}
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default VisiMisi;
