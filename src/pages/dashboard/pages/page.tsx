import { useOpen } from "@/components/context/isActived";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useCallback } from "react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import useSWR, { SWRResponse } from "swr";
import { FaEdit, FaTrash } from "react-icons/fa";
import PaginationPage from "@/components/pagination";
import toast from "react-hot-toast";

interface Page {
    id: number;
    title: string;
    company_id: number;
    slug: string;
    company: string;
}

interface Company {
    id: number;
    name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PageComponent = () => {
    const { data: session } = useSession();
    const { open } = useOpen();
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [title, setPageTitle] = useState('');
    const [companyID, setCompanyID] = useState('');
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pagesPerPage = 10;

    // Fetch pages and companies
    const { data, error, isLoading, mutate: mutatePages } = useSWR('/api/page', fetcher);
    const { data: companyData, error: companyError, isLoading: companyLoading } = useSWR<Company[]>('/api/company', fetcher);

    //filter companies and pages
    const [searchTerm, setSearchTerm] = useState('');
    // filter by search (title or company)
    const filteredPages = data?.pages?.filter(
        (p: Page) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.company.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Pagination
    const indexOfLastPage = currentPage * pagesPerPage;
    const indexOfFirstPage = indexOfLastPage - pagesPerPage;
    const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage);
    const totalPages = Math.ceil(filteredPages.length / pagesPerPage);
    // console.log('currentPages', currentPages);


    const handlePageChange = (page: number) => setCurrentPage(page);

    const openCreate = () => {
        setCreateOpen((prev) => !prev);
        setPageTitle('');
        setCompanyID('');
    };

    const handleAddPage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/page`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, company_id: parseInt(companyID) }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Gagal menambah halaman");
            toast.success(result.message || "Halaman berhasil ditambahkan");
            mutatePages();
            openCreate();
        } catch (error: any) {
            mutatePages(data, false);
            toast.error(error.message || "Gagal menambah halaman");
        }
    }


    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus halaman ini?")) return;
        const loadingToast = toast.loading("Menghapus halaman...");
        try {
            const res = await fetch(`/api/page/${id}`, { method: "DELETE" });
            const result = await res.json();

            if (!res.ok) throw new Error(result.error || "Gagal menghapus halaman");

            toast.success(result.message || "Halaman berhasil dihapus!", { id: loadingToast });
            mutatePages();
        } catch (error: any) {
            mutatePages(data, false);
            toast.error(error.message || "Gagal menghapus halaman", { id: loadingToast });
        }
    };

    const handleEdit = (page: Page) => {
        setSelectedPage(page);
        setPageTitle(page.title);
        setCompanyID(String(page.company_id));
        setEditOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/page/${selectedPage?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, company_id: parseInt(companyID) }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Gagal mengedit halaman");
            toast.success(result.message || "Halaman berhasil diedit");
            mutatePages();
            setEditOpen(false);
        } catch (error: any) {
            mutatePages(data, false);
            toast.error(error.message || "Gagal mengedit halaman");
        }
    };


    return (
        <div className={`relative p-4 mx-4 mt-3 transition-all duration-300
    ${open ? "min-w-[1300px] max-w-[1500px]" : "min-w-[1400px] max-w-[1600px]"}
  `}>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="border-r pr-4">
                        <h1 className="text-2xl font-semibold text-sky-900">Pages Dashboard</h1>
                    </div>
                    <div className="text-gray-500 pl-4">{session?.user?.name}</div>
                </div>
                <div className="flex gap-x-3">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="🔍 Search anything ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-x-2 text-sm font-semibold text-white px-3 py-2 bg-sky-600 hover:bg-green-600 rounded transition-colors duration-300"
                    >
                        <FaFileCirclePlus /> Create Page
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-x-auto rounded-md">
                <table className="w-full min-w-[800px] border border-gray-200 text-sm">
                    <thead className="bg-stone-100">
                        <tr className="text-sky-800">
                            <th className="px-4 py-2 text-center">No</th>
                            <th className="px-4 py-2 text-center">Title</th>
                            <th className="px-4 py-2 text-center">Slug</th>
                            <th className="px-4 py-2 text-center">Company Name</th>
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
                        ) : currentPages.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                    Tidak ada data halaman
                                </td>
                            </tr>
                        ) : (
                            currentPages.map((page: any) => (
                                <tr key={page.id} className="hover:bg-gray-50 transition-colors duration-300">
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">
                                        {indexOfFirstPage + 1 + currentPages.indexOf(page)}
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center hover:underline">
                                        <Link href={`/dashboard/pages/${page.id}`}>{page.title}</Link>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">{page.slug}</td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center hover:underline">
                                        <Link href={`/dashboard/company/${page.company_id}`}>{page?.company}</Link>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() => handleEdit(page)}
                                                className="text-blue-600 cursor-pointer hover:underline flex items-center gap-1"
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(page.id)}
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
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
                <PaginationPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>

            {/* Create Modal */}
            {createOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn" role="dialog">
                    <div
                        className="absolute inset-0 bg-black/20"
                        onClick={openCreate}
                        aria-label="Close modal overlay"
                    />
                    <div className="relative bg-white bg-opacity-95 backdrop-blur-md border border-gray-300 rounded-xl shadow-2xl p-6 w-[600px] max-w-lg mx-4 animate-scaleIn">
                        <div className="text-center mb-5">
                            <h1 className="text-2xl font-semibold text-sky-800">Create Page</h1>
                            <button
                                type="button"
                                onClick={openCreate}
                                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-full"
                                aria-label="Close modal"
                            >
                                <MdCancel className="w-7 h-7 cursor-pointer" />
                            </button>
                        </div>
                        <form onSubmit={handleAddPage} className="space-y-4">
                            <div>
                                <label htmlFor="page-title" className="block text-sm font-medium text-sky-900 mb-1">
                                    Page Title<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="page-title"
                                    value={title}
                                    onChange={(e) => setPageTitle(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-sky-200 focus:border-sky-500"
                                    placeholder="Enter page title"
                                />
                            </div>
                            <div>
                                <label htmlFor="create-company" className="block text-sm font-medium text-sky-900 mb-1">
                                    Company<span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="create-company"
                                    value={companyID}
                                    onChange={(e) => setCompanyID(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-sky-200 focus:border-sky-500"
                                >
                                    <option value="" disabled>Select a company</option>
                                    {
                                        companyData?.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-sky-600 hover:bg-green-600 active:bg-sky-700 text-white font-semibold py-2.5 rounded-md shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editOpen && selectedPage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn" role="dialog">
                    <div
                        className="absolute inset-0 bg-black/20"
                        onClick={() => setEditOpen(false)}
                        aria-label="Close modal overlay"
                    />
                    <div className="relative bg-white bg-opacity-95 backdrop-blur-md border border-gray-300 rounded-xl shadow-2xl p-6 w-[600px] max-w-lg mx-4 animate-scaleIn">
                        <div className="text-center mb-5">
                            <h1 className="text-2xl font-semibold text-sky-800">Edit Page</h1>
                            <button
                                type="button"
                                onClick={() => setEditOpen(false)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-full"
                                aria-label="Close modal"
                            >
                                <MdCancel className="w-7 h-7" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="edit-title" className="block text-sm font-medium text-sky-900 mb-1">
                                    Page Title
                                </label>
                                <input
                                    type="text"
                                    id="edit-title"
                                    value={title}
                                    onChange={(e) => setPageTitle(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-sky-200 focus:border-sky-500"
                                    placeholder="Enter page title"
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-company" className="block text-sm font-medium text-sky-900 mb-1">
                                    Company
                                </label>
                                <select
                                    id="edit-company"
                                    value={companyID}
                                    onChange={(e) => setCompanyID(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-sky-200 focus:border-sky-500"
                                >
                                    <option value="" disabled>Select a company</option>
                                    {
                                        companyData?.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-sky-600 hover:bg-green-600 active:bg-sky-700 text-white font-semibold py-2.5 rounded-md shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageComponent;
