import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useLanguage } from "@/components/context/LanguageContext";
import type {Projects} from "@/types/project";
import useSWR from "swr";
import { limitText } from "@/utils/limitText";
import Link from "next/link";
import { motion } from "framer-motion";

const Portofolio = () => {
    const { language } = useLanguage();
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data, error, isLoading } = useSWR('/api/project', fetcher);
    const projects: Projects[] = data?.projects || [];
    return (
        <div className="w-full bg-white px-4 py-10">
            {/* Header */}
            <div className="max-w-[900px] mx-auto text-center space-y-4 mb-6">
                <h2 className="text-3xl font-semibold text-[#005b96]">Portfolio</h2>
                <hr className="border-2 w-[80px] border-[#80b918] mx-auto" />
                <p className="font-light text-gray-500">
                    {language === "en" ?
                        'Currently, PT Aruna Hijau Power has a total capacity of 100 MW project development across Indonesia'
                        :
                        'Saat ini, PT Aruna Hijau Power memiliki total kapasitas pengembangan proyek sebesar 100 MW di seluruh Indonesia.'}
                </p>
            </div>

            {/* Responsive map container */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}     // Mulai dari bawah dan transparan
                animate={{ y: 0, opacity: 1 }}       // Geser ke atas (posisi normal) dan jadi terlihat
                exit={{ y: 100, opacity: 0 }}        // Saat keluar (unmount), geser ke bawah dan hilang
                viewport={{ once: true, amount: 0.2 }} // Hanya animasi sekali, saat 20% elemen terlihat
                transition={{ duration: 0.8, delay: 0.2 }} // Durasi animasi 0.8 detik dengan delay 0.2 
                className="relative w-full aspect-[16/9] xl:aspect-auto xl:h-[500px] overflow-hidden">
                <Image
                    src="/id-maps.svg"
                    alt="Portofolio Map"
                    fill
                    priority
                    className="object-contain object-center"
                />

                {/* Location marker */}
                <div className="absolute top-[64%] xl:top-[72%] left-[28%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <FaLocationDot className="text-2xl text-red-500 border border-gray-500 p-1 rounded-full hover:scale-110 transition-all duration-300" />

                    {projects.map((project, index) => (
                        <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="w-[220px] rounded overflow-hidden shadow-lg p-2 bg-white">
                                <Image
                                    className="w-full h-auto rounded"
                                    src={project.headerImage}
                                    alt="PLTS Tatajabar"
                                    width={150}
                                    height={150}
                                />
                                <div className=" py-2">
                                    <div className="font-semibold text-sm text-wrap mb-1 text-gray-800">
                                        {language === "en" ? project.title.en : project.title.id}
                                    </div>
                                    <p className="text-gray-500 text-xs font-light text-wrap">
                                        {language === "en" ? limitText(project.title.en, 100) : limitText(project.title.id, 100)}
                                    </p>
                                    <div className="mt-4">
                                        <Link href={`/profile/portfolio/${project.id}`} className="flex items-center justify-between">
                                            <p className="text-[#005b96] text-sm font-light">View detail</p>
                                            <IoMdArrowRoundForward className="text-[#005b96] text-lg" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Tooltip card */}

                </div>
            </motion.div>
        </div>
    );
};

export default Portofolio;
