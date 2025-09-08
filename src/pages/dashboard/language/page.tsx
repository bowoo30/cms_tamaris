import { useSession } from "next-auth/react";
import { useOpen } from "@/components/context/isActived";
import { useState } from "react";
import { FaLanguage, FaEdit, FaTrash } from "react-icons/fa";
import AddLanguage from "@/components/addLanguage";
import EditLanguage from "@/components/editLanguange";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import type Language from "@/types/languange";
import PaginationPage from "@/components/pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LanguagePage = () => {
    const { data: session } = useSession();
    const { open } = useOpen();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { data, error, isLoading } = useSWR<Language[]>("/api/language", fetcher);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pagesPerPage = 10;
    const indexOfLastPage = currentPage * pagesPerPage;
    const indexOfFirstPage = indexOfLastPage - pagesPerPage;
    const currentPages = data?.slice(indexOfFirstPage, indexOfLastPage);
    const totalPages = Math.ceil((data?.length || 0) / pagesPerPage);
    const handlePageChange = (page: number) => setCurrentPage(page);

    // Modal handlers
    const handleAddLanguageClose = () => {
        setCode("");
        setName("");
        setIsAddOpen((prev) => !prev);
    };

    const handleEditLanguageClose = () => {
        setCode("");
        setName("");
        setSelectedId(null);
        setEditOpen((prev) => !prev);
    };

    // CRUD
    const handleAddLanguageSubmit = async (code: string, language: string) => {
        try {
            const res = await fetch(`/api/language`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, name: language }),
            });
            const result = await res.json();
            if (!res.ok) {
                toast.error(result.error);
                return;
            }
            toast.success(result.message);
            handleAddLanguageClose();
            mutate("/api/language");
            setIsAddOpen(false);
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Add language error:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus bahasa ini?")) return;
        try {
            const res = await fetch(`/api/language/${id}`, { method: "DELETE" });
            const result = await res.json();
            if (!res.ok) {
                toast.error(result.error || "Gagal menghapus bahasa");
                return;
            }
            toast.success(result.message);
            mutate("/api/language");
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Delete error:", error);
        }
    };
    
    const handleEditSubmit = async (id: number, code: string, name: string) => {
        try {
            const res = await fetch(`/api/language/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    code,
                    name,
                }),
            });
            const result = await res.json();
            if (!res.ok) {
                toast.error(result.error);
                return;
            }
            toast.success(result.message);
            handleEditLanguageClose();
            mutate("/api/language");
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Edit error:", error);
        }
    };

    return (
        <div className={`relative p-4 mx-4 mt-5 ${open ? "min-w-[1300px]" : "min-w-[1400px]"}`}>
            {/* Header */}
            <div className="flex items-center justify-between space-x-4 mb-4">
                <div className="flex items-center space-x-4">
                    <div className="border-r pr-4">
                        <h1 className="text-2xl font-bold text-sky-900">Language Dashboard</h1>
                    </div>
                    <p className="text-gray-500">{session?.user?.name}</p>
                </div>
                <div>
                    <button
                        onClick={handleAddLanguageClose}
                        aria-label={isAddOpen ? "Close add language" : "Add language"}
                        className="bg-sky-600 text-white cursor-pointer flex items-center gap-x-2 px-4 py-2 text-xs rounded-md hover:bg-green-700 transition-colors"
                    >
                        <FaLanguage className="w-5 h-5" />
                        {isAddOpen ? "Close Language" : "Add Language"}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-x-auto rounded-md">
                <table className="w-full min-w-[800px] border border-gray-200 text-sm">
                    <thead className="bg-stone-100">
                        <tr className="text-sky-800">
                            <th className="px-4 py-2 text-center">No</th>
                            <th className="px-4 py-2 text-center">Code</th>
                            <th className="px-4 py-2 text-center">Name</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : data?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            currentPages?.map((d, i) => (
                                <tr key={d.id} className="hover:bg-gray-50 transition-colors duration-300">
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">
                                        {indexOfFirstPage + i + 1}
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">{d.code}</td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">{d.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedId(d.id);
                                                    setCode(d.code);
                                                    setName(d.name);
                                                    setEditOpen(true);
                                                }}
                                                className="text-blue-600 cursor-pointer hover:underline flex items-center gap-1"
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(d.id)}
                                                className="text-red-600 cursor-pointer hover:underline flex items-center gap-1"
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Add Modal */}
                {isAddOpen && (
                    <AddLanguage
                        onClose={handleAddLanguageClose}
                        onSubmit={handleAddLanguageSubmit}
                        code={code}
                        setCode={setCode}
                        language={name}
                        setLanguage={setName}
                    />
                )}

                {/* Edit Modal */}
                {isEditOpen && selectedId && (
                    <EditLanguage
                        onClose={handleEditLanguageClose}
                        onSubmit={(code: string, name: string) =>
                            handleEditSubmit(selectedId, code, name)
                        }
                        code={code}
                        setCode={setCode}
                        name={name}
                        setName={setName}
                    />
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
                <PaginationPage
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default LanguagePage;
