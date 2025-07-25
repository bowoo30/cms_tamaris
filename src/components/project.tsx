"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/context/LanguageContext";
import type {Projects} from "@/types/project";
import useSWR from "swr";

// Framer Motion Variants with delay per card
const cardVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.2,
            ease: "easeOut",
        },
    }),
};


const Project = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data, error, isLoading } = useSWR('/api/project', fetcher, { suspense: false });
    // console.log(data);
    const projects: Projects[] = data?.projects || [];
    const { language } = useLanguage();
    return (
        <div className="w-full px-4 pb-10 bg-white">
            <div className={`grid ${projects.length > 1 ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"} gap-6 mb-8 `}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        custom={index}
                        variants={cardVariant}
                        initial="hidden"
                        whileInView="visible"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="max-w-xl mx-auto rounded-xl overflow-hidden shadow-md bg-white"
                    >
                        
                        <Image
                            className="w-full rounded-md"
                            src={project.headerImage}
                            alt='Project Image'
                            width={600}
                            height={400}
                        />
                        <div className="px-6 py-4">
                            <h3 className="font-semibold text-xl mb-1 text-center text-gray-800">
                                {language === "en" ? project.title.en : project.title.id}
                            </h3>
                            {/* <p className="text-gray-700 text-base text-center mb-4">(100 MWp)</p> */}
                            {/* <p className="text-gray-500 text-sm">
                                {project.title}
                            </p> */}
                        </div>
                        <div className="w-full bg-gray-100 text-md font-medium text-[#005b96] text-center p-4 underline cursor-pointer hover:bg-gray-200 transition">
                            <Link href={`/profile/portfolio/${project.id}`} className="">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center">
                <Link
                    href="/profile/portfolio"
                    className="rounded-md border border-[#005b96] text-md font-medium text-[#005b96] px-4 py-2 hover:bg-[#005b96] hover:text-white transition-all"
                >
                    {language === "en" ? "View All Projects" : "Lihat Semua Proyek"}
                </Link>
            </div>
        </div>
    );
};

export default Project;
