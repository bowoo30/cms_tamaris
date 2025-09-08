import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import DashboardLayout from "../layout";
import { useOpen } from "@/components/context/isActived";
import { useSession } from "next-auth/react";
import { FaEye } from "react-icons/fa";
import type Page from "@/types/page";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CompanyDetail = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [previewPage, setPreviewPage] = useState<Page | null>(null);
    const router = useRouter();
    const { id } = router.query;

    const { data: company } = useSWR(`/api/company/${id}`, fetcher);
    const { open } = useOpen();
    const { data } = useSession();

    const handlePreview = (page: Page) => {
        setPreviewPage(previewPage === page ? null : page);
    };

    useEffect(() => {
        if (company?.pages) {
            setPages(company.pages);
        }
    }, [company]);

    // API update order
    const handleSortUpdate = async (newOrder: Page[]) => {
        // try {
        //     const res = await fetch(`/api/company/${id}/pages/reorder`, {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({
        //             pageIds: newOrder.map((p) => p.id),
        //         }),
        //     });
        //     if (!res.ok) throw new Error("Failed to reorder pages");
        //     toast.success("Pages reordered!");
        // } catch (err: any) {
        //     toast.error(err.message);
        // }
    };
    console.log("previewPage:", previewPage);

    const handleDelete = async (pageId: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus halaman ini?")) return;

        const loadingToast = toast.loading("Menghapus halaman...");
        try {
            const res = await fetch(`/api/page/${pageId}`, { method: "DELETE" });
            const result = await res.json();

            if (!res.ok) throw new Error(result.error || "Gagal menghapus halaman");

            toast.success(result.message || "Halaman berhasil dihapus!", { id: loadingToast });

            // refresh cache company detail
            mutate(`/api/company/${id}`);
        } catch (error: any) {
            toast.error(error.message || "Gagal menghapus halaman", { id: loadingToast });
            mutate(`/api/company/${id}`, undefined, false); // rollback cache
        }
    };


    return (
        <DashboardLayout>
            <div
                className={`relative p-4 mx-4 mt-5 ${open ? "min-w-[1300px]" : "min-w-[1400px]"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between space-x-4 mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="border-r pr-4">
                            <h1 className="text-2xl font-bold text-sky-900">
                                Company Detail Dashboard
                            </h1>
                        </div>
                        <div className="text-gray-500"><p>{data?.user?.name}</p></div>
                    </div>
                </div>

                {/* Company Info */}
                <div className="rounded-xl p-4 flex justify-between items-center border border-gray-200">
                    <div className="flex items-center space-x-4">
                        <p className="border-r pr-4 text-sky-900">{company?.name}</p>
                        <p className="text-sky-900">{company?.domain}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-sky-900 hover:bg-sky-900 border border-gray-300 transition-colors duration-300 hover:text-white cursor-pointer rounded-xl py-1 px-3 flex items-center space-x-2">
                            <FaEye />
                            <p className="text-sm">Preview</p>
                        </div>
                    </div>
                </div>

                {/* List Pages - sortable */}
                <div className="flex items-center space-x-4 mt-4">
                    <ReactSortable
                        list={pages}
                        setList={setPages}
                        animation={200}
                        delay={2}
                        onEnd={() => handleSortUpdate(pages)} // panggil API saat drag end
                        className="flex space-x-4"
                    >
                        {pages.map((p) => (
                            <div
                                key={p.id}
                                className={`${previewPage && previewPage.title === p.title ? "bg-sky-800 text-white" : "bg-white text-sky-800"} border border-gray-200 rounded-xl px-3 py-1 flex justify-between items-center cursor-move`}
                            >
                                <div className="relative flex items-center space-x-2">
                                    <button onClick={() => handlePreview(p)} className={`cursor-pointer`}>{p.title}</button>
                                    <button onClick={() => handleDelete(p.id)} className="absolute cursor-pointer hover:text-red-600 top-[-10px] right-[-10px]">
                                        <MdCancel />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
                <div className="border bg-gray-50 mt-4 h-[67vh] rounded-xl border-gray-300 p-4 flex items-center space-x-2 justify-center">
                    <p className="text-sm text-sky-950 font-semibold
                    ">
                        For preview page click on "Preview"
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CompanyDetail;
