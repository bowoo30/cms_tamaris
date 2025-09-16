"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaLeaf, FaCloud, FaStar } from "react-icons/fa";
import { useLanguage } from "@/components/context/LanguageContext";

const benefits = [
    {
        icon: <FaGlobe className="text-3xl text-[#005b96]" />,
        title: {
            en: "International Legitimacy & Credibility",
            id: "Legitimasi & Kredibilitas Internasional"
        },
        desc: {
            en: "Gain global recognition and trust from international partners and organizations.",
            id: "Dapatkan pengakuan global dan kepercayaan dari mitra serta organisasi internasional."
        }
    },
    {
        icon: <FaLeaf className="text-3xl text-green-600" />,
        title: {
            en: "Supporting ESG & Sustainability Targets",
            id: "Mendukung Target ESG & Keberlanjutan"
        },
        desc: {
            en: "Align your projects with environmental, social, and governance goals.",
            id: "Selaraskan proyek Anda dengan tujuan lingkungan, sosial, dan tata kelola (ESG)."
        }
    },
    {
        icon: <FaCloud className="text-3xl text-blue-500" />,
        title: {
            en: "Contribution to Emission Reduction",
            id: "Kontribusi terhadap Pengurangan Emisi"
        },
        desc: {
            en: "Reduce your carbon footprint and contribute to a cleaner planet.",
            id: "Kurangi jejak karbon Anda dan berkontribusi pada planet yang lebih bersih."
        }
    },
    {
        icon: <FaStar className="text-3xl text-yellow-500" />,
        title: {
            en: "Enhanced Reputation & Brand Value",
            id: "Meningkatkan Reputasi & Nilai Merek"
        },
        desc: {
            en: "Boost your brand image and value in the eyes of stakeholders.",
            id: "Tingkatkan citra dan nilai merek Anda di mata para pemangku kepentingan."
        }
    },
];

export default function BenefitsSection() {
    const { language } = useLanguage();

    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-[#005b96] mb-10">
                    {language === "en" ? "Benefits of Working with Us" : "Manfaat Bekerja Sama dengan Kami"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {language === "en" ? item.title.en : item.title.id}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {language === "en" ? item.desc.en : item.desc.id}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
