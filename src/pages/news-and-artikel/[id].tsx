"use client";

import { useRouter } from "next/router";
import { useLanguage } from "@/components/context/LanguageContext";
import useSWR from "swr";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

const NewsDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(id ? `/api/news` : null, fetcher);
    const newsItem = data?.news?.find((item: any) => item.id === parseInt(id as string));
    const { language } = useLanguage();

    if (!newsItem) return <p>Berita tidak ditemukan.</p>;

    return (
        <>
            <Head>
                <title>{newsItem.title}</title>
                <meta name="description" content={newsItem.title} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="mt-21 mb-10">
                {/* Breadcrumb */}
                <div className="space-y-6 px-4 bg-[#005b96]/10 p-4 ">
                    <div className="space-y-20 xl:ml-15 items-center justify-center xl:justify-start">
                        <div className="ml-15 flex items-center space-x-2">
                            <p className="text-sm text-gray-800">Home</p>
                            <IoIosArrowForward className="text-gray-800 text-xl" />
                            <p className="text-sm text-gray-800">Profile</p>
                            <IoIosArrowForward className="text-gray-800 text-xl" />
                            <p className="text-sm text-gray-800">News & Article</p>
                        </div>
                    </div>
                </div>

                {/* Title & Author */}
                <div className="max-w-screen-xl px-2 mx-auto mt-10">
                    <h1 className="text-3xl xl:text-4xl ml-2 font-bold text-sky-950 mb-10">{newsItem.title}</h1>
                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center space-x-4">
                            <Image
                                src="/human.png"
                                alt={newsItem.author}
                                width={35}
                                height={35}
                                className="rounded-full"
                            />
                            <div className="space-y-0">
                                <p className="text-gray-800 text-sm font-medium">{newsItem.author}</p>
                                <p className="text-gray-800 text-xs font-light">{newsItem.date}</p>
                            </div>
                        </div>
                    </div>

                    {/* Header Image */}
                    <div className="mt-5 relative h-[300px] xl:h-[480px]">
                        <Image
                            src={newsItem.headerImage}
                            alt={newsItem.title}
                            fill
                            className="object-cover object-center rounded-2xl px-2"
                        />
                    </div>

                    {/* Content Loop */}
                    <div className="mt-10 space-y-6">
                        {newsItem.content.map((item: any, index: number) => {
                            if (item.type === "paragraph") {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <p className="text-sky-950 px-4 mt-4 text-md text-justify">{item.text}</p>
                                    </motion.div>
                                );
                            }

                            if (item.type === "image") {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex flex-col items-center"
                                    >
                                        <Image
                                            src={item.src}
                                            alt={item.caption || "Image"}
                                            width={700}
                                            height={500}
                                            className="object-fit object-center rounded-xl my-2 px-2 xl:px-0"
                                        />
                                        {item.caption && (
                                            <p className="px-[5%] xl:px-[20%] text-center text-sm text-gray-600 italic">{item.caption}</p>
                                        )}
                                    </motion.div>
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsDetail;
