import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useOpen } from "@/components/context/isActived";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import DashboardLayout from "../layout";
import { FaEye } from "react-icons/fa";
import { FaGlobeAsia, FaLanguage, FaTag, FaFileImage, FaHashtag, FaTwitter } from "react-icons/fa";
import { LuFileType } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";
import { limitText } from "@/utils/limitText";
import { IoMdAddCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PageDetail = () => {
    const router = useRouter();
    const { open } = useOpen();
    const { data: user } = useSession();
    const { id } = router.query;

    const [addMetadata, setAddMetadata] = useState(false);
    const [editMetadata, setEditData] = useState(false);
    const { data, isLoading, error } = useSWR(`/api/page/${id}`, fetcher);
    const { data: languages } = useSWR(`/api/language`, fetcher);
    const { data: metadata } = useSWR(`/api/metadata/${id}`, fetcher);

    // console.log('metadata', metadata);


    const handleAddMetadata = () => {
        setAddMetadata((prev) => !prev);
    };
    const handleEditMetadata = () => {
        setEditData((prev) => !prev);
    };
    const handleDeletedata = async () => {
        if (!confirm("Apakah Anda yakin ingin menghapus metadata ini?")) return;
        try {
            const res = await fetch(`/api/metadata/${metadata?.id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete metadata");
            toast.success("Metadata deleted successfully!");
            mutate(`/api/metadata/${id}`);
        } catch (error) {
            console.error(error);
            toast.error("Error deleting metadata");
        }
    };

    const [form, setForm] = useState({
        page_id: "",
        language_id: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        og_image: "",
        og_type: "",
        twitter_card: "",
    });
    const [formEdit, setFormEdit] = useState({
        page_id: metadata?.page_id,
        language_id: metadata?.language_id,
        meta_title: metadata?.meta_title,
        meta_description: metadata?.meta_description,
        meta_keywords: metadata?.meta_keywords,
        og_image: metadata?.og_image,
        og_type: metadata?.og_type,
        twitter_card: metadata?.twitter_card,
    });

    // isi ulang form.page_id begitu data.page tersedia
    useEffect(() => {
        if (data?.page?.id) {
            setForm((prev) => ({
                ...prev,
                page_id: data.page.id.toString(), // simpan sebagai string biar aman
            }));
        }
    }, [data]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.page_id) {
            toast.error("Page ID not found");
            return;
        }

        // convert ke number sebelum kirim
        const payload = {
            ...form,
            page_id: Number(form.page_id),
            language_id: Number(form.language_id),
        };
        try {
            const res = await fetch("/api/metadata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save metadata");
            toast.success("Metadata saved successfully!");
            mutate(`/api/metadata/${id}`);
            setAddMetadata(false);
        } catch (error) {
            console.error(error);
            toast.error("Error saving metadata");
        }
    };


    return (
        <DashboardLayout>
            <div
                className={`relative p-4 mx-4 mt-3 transition-all duration-300
    ${open ? "min-w-[1300px] max-w-[1500px]" : "min-w-[1400px] max-w-[1600px]"}
  `}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="border-r pr-4">
                            <h1 className="text-2xl font-bold text-sky-900">
                                {data?.page?.title} Detail Dashboard
                            </h1>
                        </div>
                        <div className="text-gray-500">{user?.user?.name}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <p className="border-r pr-4 text-sky-900">{data?.page?.title}</p>
                        <p className="text-sky-900">{data?.page?.company}</p>
                        <div className="flex items-center space-x-4">
                            <div className="text-sky-900 hover:bg-sky-900 border border-gray-300 transition-colors duration-300 hover:text-white cursor-pointer rounded-xl py-1 px-3 flex items-center space-x-2">
                                <FaEye />
                                <p className="text-sm">Preview</p>
                            </div>
                        </div>
                        {metadata && (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => handleAddMetadata()}
                                    className={`text-sky-900 border border-gray-300 transition-colors duration-300 rounded-xl py-1 px-3 flex items-center space-x-2
                                        cursor-pointer hover:bg-sky-900 hover:text-white`}
                                >
                                    <IoMdAddCircle />
                                    <p className="text-sm">Add Metadata</p>
                                </button>
                            </div>

                        )
                        }
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left Section */}
                    <div className="col-span-2 border border-gray-200 shadow-md rounded-xl p-4 h-[calc(105vh-8rem)] overflow-y-auto">
                        <p className="text-xl font-bold text-sky-900 mb-6">Page {data?.page?.title}</p>
                        {/* Isi konten page */}
                    </div>

                    {/* Right Section (Form) */}
                    <div className="col-span-1 border border-gray-200 rounded-xl p-4 shadow-md bg-white">
                        <div className="flex items-start justify-between">
                            <h2 className="text-xl font-bold text-sky-900 mb-6">Metadata</h2>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleEditMetadata()} className={`text-sky-900 border text-sm gap-x-1 border-gray-300 transition-colors duration-300 rounded-xl py-1 px-3 flex items-center space-x-2
                                    cursor-pointer hover:bg-sky-900 hover:text-white
                                        `}>
                                    <AiFillEdit />Edit
                                </button>
                                <button
                                    onClick={() => handleDeletedata()} className={`text-sky-900 border text-sm gap-x-1 border-gray-300 transition-colors duration-300 rounded-xl py-1 px-3 flex items-center space-x-2
                                        cursor-pointer hover:bg-sky-900 hover:text-white
                                        `}>
                                    <AiFillEdit />Delete
                                </button>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {/* Page */}
                            <div className="flex items-center space-x-3">
                                <div>
                                    <FaGlobeAsia className="w-5 h-5 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Page</p>
                                    <p className="text-sm text-gray-800">
                                        {data?.page?.title ? data?.page?.title : "Page not found"}
                                    </p>
                                </div>
                            </div>

                            {/* Language */}
                            <div className="flex items-center space-x-3">
                                <div>
                                    <FaLanguage className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Language</p>
                                    <p className="text-sm text-gray-800">
                                        {metadata?.language ? metadata?.language : "Language not found"}
                                    </p>
                                </div>
                            </div>

                            {/* Meta Title */}
                            <div className="flex items-center space-x-3">
                                <div>
                                    <LuFileType className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Meta Title</p>
                                    <p className="text-sm text-gray-800">{metadata?.meta_title ? metadata?.meta_title : "No title"}</p>
                                </div>
                            </div>

                            {/* Meta Description */}
                            <div className="flex items-center space-x-3">
                                <div>
                                    <FiFileText className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Meta Description</p>
                                    <p className="text-sm font-light text-gray-800 break-words text-justify">
                                        {metadata?.meta_description ?
                                            limitText(metadata?.meta_description, 85)
                                            :
                                            "No description"
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Meta Keywords */}
                            <div className="flex items-center space-x-3">
                                <div>
                                    <FaTag className="w-5 h-5 text-pink-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Meta Keywords</p>
                                    <p className="text-sm text-gray-800">
                                        {metadata?.meta_keywords ?
                                            limitText(metadata?.meta_keywords, 85)
                                            :
                                            "No keywords"
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* OG Image */}
                            <div className="flex items-center space-x-3">
                                <div>
                                    <FaFileImage className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">OG Image</p>
                                    <a
                                        href={metadata?.og_image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-sm break-all hover:underline"
                                    >
                                        {metadata?.og_image ? limitText(metadata?.og_image, 85) : "No image"}
                                    </a>
                                </div>
                            </div>

                            {/* OG Type */}
                            <div className="flex items-center space-x-3">
                                <div>
                                    <FaHashtag className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">OG Type</p>
                                    <p className="text-sm text-gray-800">{metadata?.og_type ? metadata?.og_type : "No type"}</p>
                                </div>
                            </div>

                            {/* Twitter Card */}
                            <div className="flex items-center space-x-3">
                                <div>
                                    <FaTwitter className="w-5 h-5 text-sky-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Twitter Card</p>
                                    <p className="text-sm text-gray-800">{metadata?.twitter_card ? metadata?.twitter_card : "No card"}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                {/* Popup Add Metadata */}
                {addMetadata && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white  rounded-xl shadow-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-bold text-sky-900 mb-4">Add Metadata</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Language */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Language
                                    </label>
                                    <select
                                        name="language_id"
                                        value={form.language_id}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Select language</option>
                                        {languages?.map((lang: any) => (
                                            <option key={lang.id} value={lang.id}>
                                                {lang.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Meta Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        name="meta_title"
                                        value={form.meta_title}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Enter meta title"
                                    />
                                </div>

                                {/* Meta Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Description
                                    </label>
                                    <textarea
                                        name="meta_description"
                                        value={form.meta_description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Enter meta description"
                                    />
                                </div>

                                {/* Meta Keywords */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Keywords
                                    </label>
                                    <input
                                        type="text"
                                        name="meta_keywords"
                                        value={form.meta_keywords}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Enter keywords"
                                    />
                                </div>

                                {/* OG Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        OG Image URL
                                    </label>
                                    <input
                                        type="text"
                                        name="og_image"
                                        value={form.og_image}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                {/* OG Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        OG Type
                                    </label>
                                    <input
                                        type="text"
                                        name="og_type"
                                        value={form.og_type}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="website / article / product"
                                    />
                                </div>

                                {/* Twitter Card */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Twitter Card
                                    </label>
                                    <input
                                        type="text"
                                        name="twitter_card"
                                        value={form.twitter_card}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="summary / summary_large_image"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setAddMetadata(false)}
                                        className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 cursor-pointer py-2 rounded-lg bg-sky-600 hover:bg-green-600 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Popup Edit Metadata */}
                {editMetadata && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white  rounded-xl shadow-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-bold text-sky-900 mb-4">Edit Metadata</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Language */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Language
                                    </label>
                                    <select
                                        name="language_id"
                                        value={formEdit.language_id}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="">Select language</option>
                                        {languages?.map((lang: any) => (
                                            <option key={lang.id} value={lang.id}>
                                                {lang.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Meta Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        name="meta_title"
                                        value={formEdit.meta_title}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Enter meta title"
                                    />
                                </div>

                                {/* Meta Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Description
                                    </label>
                                    <textarea
                                        name="meta_description"
                                        value={formEdit.meta_description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Enter meta description"
                                    />
                                </div>

                                {/* Meta Keywords */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Keywords
                                    </label>
                                    <input
                                        type="text"
                                        name="meta_keywords"
                                        value={formEdit.meta_keywords}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Enter keywords"
                                    />
                                </div>

                                {/* OG Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        OG Image URL
                                    </label>
                                    <input
                                        type="text"
                                        name="og_image"
                                        value={formEdit.og_image}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                {/* OG Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        OG Type
                                    </label>
                                    <input
                                        type="text"
                                        name="og_type"
                                        value={formEdit.og_type}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="website / article / product"
                                    />
                                </div>

                                {/* Twitter Card */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Twitter Card
                                    </label>
                                    <input
                                        type="text"
                                        name="twitter_card"
                                        value={formEdit.twitter_card}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="summary / summary_large_image"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setEditData(false)}
                                        className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 cursor-pointer py-2 rounded-lg bg-sky-600 hover:bg-green-600 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default PageDetail;
