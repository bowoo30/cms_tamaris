"use client";

import Image from "next/image";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { TbUserSquareRounded } from "react-icons/tb";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/components/context/LanguageContext";
import useSWR from "swr";
import type { News } from "@/types/news";
import { limitText } from "@/utils/limitText";


// Variants
const cardVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.42, 0, 0.58, 1],
        },
    },
};

const containerVariant = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 },
    },
};

// Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NewsArticle = () => {
    const { language } = useLanguage();
    const { data, error, isLoading } = useSWR("/api/news", fetcher);
    console.log(data);


    if (isLoading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load news.</p>;

    const news: News[] = data?.news || [];

    return (
        <div>
            <div className="max-w-[900px] mx-auto text-center space-y-4 mb-10">
                <h2 className="text-3xl font-semibold text-[#005b96]">{language === "en" ? "News & Articles" : "Berita & Artikel"}</h2>
                <hr className="border-2 w-[80px] border-[#80b918] mx-auto" />
            </div>
            {/* Cards */}
            <motion.div
                variants={containerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`grid grid-cols-1 md:${news.slice(0, 2).length ? "md:grid-cols-2" : "grid-cols-1"} xl:grid-cols-3 gap-y-4`}
            >
                {news.slice(0, 3).map((item, index) => (
                    <div className="" key={index}>
                        <motion.div
                            key={item.id}
                            variants={cardVariant}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white"
                        >
                            <div>
                                <Image
                                    src={item.headerImage}
                                    alt={language === "en" ? item.title.en : item.title.id}
                                    width={600}
                                    height={250}
                                    className="object-cover w-full h-[250px]"
                                />
                            </div>
                            <div className="px-6 py-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <TbUserSquareRounded className="text-xl text-[#005b96]" />
                                        <p className="font-light text-xs ml-2 text-gray-600">{item.author}</p>
                                    </div>
                                    <p className="font-light text-xs text-gray-600">
                                        <time dateTime={item.date}>{item.date}</time>
                                    </p>
                                </div>
                                <div className="font-bold text-xl text-pretty">{language === "en" ? item.title.en : item.title.id}</div>
                                {item.title.id.length || item.title.en.length <= 58 ? <br /> : ''}
                                {/* <p className="text-gray-700 text-base text-justify">{limitText(item.slug, 100)}</p> */}
                            </div>
                            <div className="mt-1 flex items-center justify-between p-4 bg-gray-100">
                                <Link href={`/news-and-artikel/${item.id}`} className="text-[#005b96] text-md font-medium">Read More</Link>
                                <MdArrowForwardIos className="text-[#005b96] text-lg" />
                            </div>
                        </motion.div>
                    </div>
                ))}
            </motion.div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center mt-10"
            >
                <Link
                    href="/news-and-artikel"
                    className="rounded-md border border-[#005b96] text-md font-medium text-[#005b96] px-4 py-2 hover:bg-[#005b96] hover:text-white transition-all"
                >
                    {language === "en" ? "View All News" : "Lihat Semua Berita"}
                </Link>
            </motion.div>
        </div>
    );
};

export default NewsArticle;
