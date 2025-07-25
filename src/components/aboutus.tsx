"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/context/LanguageContext";
import Link from "next/link";

const About = () => {
    const { language } = useLanguage();
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="pt-3"
        >
            {/* <div className="text-center px-2 md:px-4">
                <h1 className="text-[#005b96] text-2xl xl:text-3xl font-semibold">
                    {language === "en" ? "About Aruna Hijau Power" : "Tentang Kami Aruna Hijau Power"}
                </h1>
                <hr className="border-2 w-[250px] xl:w-[250px] border-[#80b918] mx-auto my-2" />
            </div> */}

            <div className="grid grid-cols-1 xl:grid-cols-2 mt-5">
                {/* Left Text Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-8 px-4"
                >
                    <p className="text-[#80b918] text-2xl">{language === "en" ? "About Us" : "Tentang Kami"}</p>
                    <h1 className="text-[#005b96] text-5xl font-semibold">
                        {language === "en" ? "Sustainable Power, Bright Horizons" : "Daya Berkelanjutan, Masa Depan Cerah"}
                    </h1>
                    <div className="space-y-4">
                        <p className="text-gray-500 text-justify text-md font-light leading-7">
                            {language === "en"
                                ? "PT Aruna Hijau Power (AHP), which is committed to the development of renewable energy through solar panels, is a joint venture between PT Aruna Cahaya Pratama (Aruna PV) with 80% share ownership and PT PLN Batam with 20%."
                                : "PT Aruna Hijau Power (AHP) yang berkomitmen dalam pengembangan energiterbarukan melalui panel surya, merupakan perusahaan kerjasama antar PT Aruna Cahaya Pratama (Aruna PV) dengan kepemilikan saham 80% dan PT PLN Batam sebesar 20%."}
                        </p>
                        <p className="text-gray-500 text-justify text-md font-light leading-7">
                            {language === 'en' ? "Through AHP, a 100 MWp ground-mounted solar power plant (PLTS) project spread over an area of 80.63 hectares and divided into 5 (five) separate sectors, was built and developed in the Kota Bukit Indah (KBI) industrial area, Purwakarta, West Java."
                                :
                                "Melalui AHP, proyek Pembangkit Listrik Tenaga Surya (PLTS) ground-mounted berkapasitas 100 MWp yang terhampar di area seluas 80,63 hektar dan terbagi dalam 5 (lima) sektor terpisah, dibangun dan dikembangkan di kawasan industri Kota Bukit Indah (KBI), Purwakarta, Jawa Barat."}
                        </p>
                        <p className="text-gray-500 text-justify text-md font-light leading-7">
                            {language === 'en' ?
                                'All electricity generated is channeled to business and industrial activities in the KBI industrial area, through PT Tatajabar Sejahtera (TJS), as the license holder of the business area (Wilus) for the KBI area owned by PT Besland Pertiwi.'
                                :
                                'Seluruh energi listrik yang dihasilkan disalurkan untuk kegiatan bisnis dan industri dalam kawasan industri KBI, melalui PT Tatajabar Sejahtera (TJS), selaku pemegang ijin wilayah usaha (Wilus) untuk kawasan KBI yang dimiliki oleh PT Besland Pertiwi.'}
                        </p>
                    </div>
                    <div className="">
                        <Link href="/profile/about" className="px-4 py-2 border text-[#005b96] rounded-md cursor-pointer hover:bg-[#005b96] hover:text-white transition">
                            {language === 'en' ? 'Learn More' : 'Selengkapnya'}
                        </Link>
                    </div>
                </motion.div>

                {/* Right Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-5 xl:mt-0 flex xl:flex-col justify-center px-2"
                >
                    <Image src="/tjs.jpg" alt="logo" width={700} height={700} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
