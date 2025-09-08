"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useOpen } from "@/components/context/isActived";
import { GoKebabHorizontal } from "react-icons/go";
import { BsBuildingFillAdd } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import type Company from "@/types/company";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import PaginationPage from "@/components/pagination";
import Link from "next/link";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CompanyPage = () => {
    const { data: session } = useSession();
    const { open } = useOpen();


    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [logo, setLogo] = useState<File | null>(null);
    const [domain, setDomain] = useState("");

    const toggleEdit = () => setIsEditOpen((prev) => !prev);
    const toggleAdd = () => setIsAddOpen((prev) => !prev);
    const toggleOption = (id: number) => {
        setSelectedOptionId(prevId => (prevId === id ? null : id));
    };



    const { data, error, isLoading } = useSWR<Company[]>("/api/company", fetcher);
    console.log('data', data);

    const handleAddCompany = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !domain || !logo) {
            toast.error("Nama, domain, dan logo wajib diisi.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("domain", domain);
            formData.append("logo", logo);

            const res = await fetch(`/api/company`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error);
                return;
            }

            toast.success(data.message || "Perusahaan berhasil ditambahkan");
            mutate("/api/company");
            setIsAddOpen(false);
            setName("");
            setDomain("");
            setLogo(null);
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Add company error:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const url = `/api/company/${id}`;
            const res = await fetch(url, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Gagal menghapus perusahaan");
                return;
            }
            toast.success(data.message);
            mutate("/api/company");
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Delete error:", error);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const companyPerPage = 10;
    const indexOfLastCompany = currentPage * companyPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companyPerPage;
    const currentCompanies = data?.slice(indexOfFirstCompany, indexOfLastCompany);
    const totalPages = Math.ceil((data?.length || 0) / companyPerPage);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleEdit = (company: Company) => {
        setSelectedCompany(company);
        setName(company.name);
        setDomain(company.domain);
        setLogo(null); // reset, user bisa upload baru
        setIsEditOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCompany) return;

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("domain", domain);
            formData.append("logo", logo || "");

            const url = `/api/company/${selectedCompany.id}`;
            const res = await fetch(url, {
                method: "PUT",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Gagal mengedit perusahaan");
                return;
            }

            toast.success(data.message || "Perusahaan berhasil diedit");
            mutate("/api/company");
            setIsEditOpen(false);
            setSelectedCompany(null);
            setName("");
            setDomain("");
            setLogo(null);
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Edit error:", error);
        }
    };


    return (
        <div>
            <div className={`relative p-4 mx-4 mt-5 ${open ? "min-w-[1300px]" : "min-w-[1400px]"}`}>
                <div className="flex items-center justify-between space-x-4 mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="border-r pr-4">
                            <h1 className="text-2xl font-bold text-sky-900">Company Dashboard</h1>
                        </div>
                        <p className="text-gray-500">{session?.user?.name}</p>
                    </div>
                    <div>
                        <button
                            onClick={toggleAdd}
                            aria-label={isAddOpen ? "Close add company" : "Add company"}
                            className="bg-sky-600 text-white cursor-pointer flex items-center gap-x-2 px-4 py-2 text-sm rounded-md hover:bg-sky-700 transition-colors"
                        >
                            <BsBuildingFillAdd />
                            {isAddOpen ? "Close" : "Add Company"}
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="grid grid-cols-5 gap-4">
                        {currentCompanies?.map((item, idx) => (
                            <div
                                key={item?.id}
                                className="relative col-span-1 mb-2  bg-white h-[230px] rounded-xl border border-gray-200 hover:scale-105 transition-all duration-300 shadow-md"
                            >
                                <Image src={item?.logo} alt="logo" width={120} height={100} className="mx-auto p-2 w-28 h-30 object-center object-contain" />
                                <button onClick={() => toggleOption(item?.id)} className="absolute top-2 right-2 cursor-pointer">
                                    <GoKebabHorizontal />
                                </button>
                                <div className="border-t border-gray-200 mt-2 bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-b-xl">
                                    <Link href={`/dashboard/company/${item?.id}`} className="text-md font-light text-sky-900">{item?.name}</Link>
                                    <p className="text-gray-600 text-sm">{item?.domain}</p>
                                    {item?.name.length <= 26 ? <br /> : ''}
                                    {/* <p className="text-gray-600 text-sm">{item?.slug}</p> */}
                                </div>
                                {selectedOptionId === item?.id && (
                                    <div className="absolute top-8 right-1 flex flex-col space-y-2 bg-[#4B5945]/80 border border-gray-500 font-semibold rounded-md shadow-md p-2">
                                        <button onClick={() => handleEdit(item)} className="text-white text-xs cursor-pointer hover:text-sky-400 hover:underline">Edit</button>
                                        <button onClick={() => handleDelete(item?.id)} className="text-white text-xs cursor-pointer hover:text-red-500 hover:underline">Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>


                    {/* Edit Company Modal */}
                    {isEditOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div
                                className="absolute inset-0 bg-black/10"
                                onClick={() => setIsEditOpen(false)}
                                aria-label="overlay"
                            />
                            <div className="relative bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-[320px] space-y-4 border border-sky-800 z-10">
                                <div className="relative">
                                    <h1 className="text-xl font-bold text-sky-900 text-center">Edit Company</h1>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditOpen(false)}
                                        className="absolute cursor-pointer top-0 right-0 text-sky-900 text-2xl hover:text-red-400 transition-all"
                                        aria-label="close edit modal"
                                    >
                                        <MdCancel />
                                    </button>
                                </div>
                                <form onSubmit={handleEditSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-sky-900 font-medium mb-1">Company Name<span className="text-red-500">*</span></label>
                                        <input
                                            value={name}
                                            type="text"
                                            placeholder="Company Name"
                                            className="w-full border border-gray-500 bg-white px-3 py-2 text-sm rounded-md focus:ring-4 focus:ring-sky-500 focus:outline-none"
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-sky-900 font-medium mb-1">Domain<span className="text-red-500">*</span></label>
                                        <input
                                            value={domain}
                                            type="text"
                                            onChange={(e) => setDomain(e.target.value)}
                                            placeholder="example.com"
                                            className="w-full border border-gray-500 bg-white px-3 py-2 text-sm rounded-md focus:ring-4 focus:ring-sky-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="flex flex-col">
                                            <label className="text-sm text-sky-900 font-medium mb-1">Logo<span className="text-red-500">*</span></label>
                                            <label
                                                htmlFor="logo-upload"
                                                className="cursor-pointer bg-white border px-3 py-2 rounded-md text-gray-500 text-sm"
                                            >
                                                {logo ? logo.name : "Pilih logo perusahaan..."}
                                            </label>
                                        </div>

                                        <input
                                            id="logo-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setLogo(e.target.files?.[0] || null)}
                                        />

                                        {/* Preview jika ada logo terpilih */}
                                        {logo && (
                                            <div className="relative mt-2 flex items-start justify-center gap-3">
                                                <img
                                                    src={URL.createObjectURL(logo)}
                                                    alt="Preview Logo"
                                                    className="w-24 h-24 object-contain rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setLogo(null)}
                                                    className="bg-sky-800 cursor-pointer transition-all duration-300 absolute top-0 right-0 text-white p-1 rounded hover:bg-red-500 text-sm"
                                                >
                                                    <MdDeleteForever />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full cursor-pointer bg-sky-600 text-white font-medium py-2 rounded-md hover:bg-green-500 transition-colors"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}



                    {/* Add Company Modal */}
                    {isAddOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div
                                className="absolute inset-0 bg-black/10"
                                onClick={() => setIsAddOpen(false)}
                                aria-label="overlay"
                            />
                            <div className="relative bg-white backdrop-blur-md p-6 rounded-lg shadow-md w-[320px] space-y-4 border border-gray-300 z-10">
                                <div className="relative">
                                    <h1 className="text-xl font-bold text-sky-900 text-center">Add Company</h1>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddOpen(false)}
                                        className="absolute cursor-pointer top-0 right-0 text-sky-900 text-2xl hover:text-red-400 transition-all"
                                        aria-label="close add modal"
                                    >
                                        <MdCancel />
                                    </button>
                                </div>
                                <form onSubmit={handleAddCompany} className="space-y-4" encType="multipart/form-data">
                                    <div>
                                        <label className="block text-sm text-sky-900 font-medium mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            className="w-full border border-gray-500 bg-white px-3 py-2 text-sm rounded-md focus:ring-4 focus:ring-sky-500 focus:outline-none"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-sky-900 font-medium mb-1">Domain</label>
                                        <input
                                            type="text"
                                            placeholder="example.com"
                                            className="w-full border border-gray-500 bg-white px-3 py-2 text-sm rounded-md focus:ring-4 focus:ring-sky-500 focus:outline-none"
                                            required
                                            value={domain}
                                            onChange={(e) => setDomain(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className="flex flex-col">
                                            <label className="text-sm text-sky-900 font-medium mb-1">Logo</label>
                                            <label
                                                htmlFor="logo-upload"
                                                className="cursor-pointer bg-white border px-3 py-2 rounded-md text-gray-500 text-sm"
                                            >
                                                {logo ? logo.name : "Pilih logo perusahaan..."}
                                            </label>
                                        </div>

                                        <input
                                            id="logo-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setLogo(e.target.files?.[0] || null)}
                                        />

                                        {/* Preview jika ada logo terpilih */}
                                        {logo && (
                                            <div className="relative mt-2 flex items-start justify-center gap-3">
                                                <img
                                                    src={URL.createObjectURL(logo)}
                                                    alt="Preview Logo"
                                                    className="w-24 h-24 object-contain rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setLogo(null)}
                                                    className="bg-sky-800 cursor-pointer transition-all duration-300 absolute top-0 right-0 text-white p-1 rounded hover:bg-red-500 text-sm"
                                                >
                                                    <MdDeleteForever />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="">
                                        <button
                                            type="submit"
                                            className="w-full cursor-pointer bg-sky-600 text-white font-medium py-2 rounded-md hover:bg-green-600 transition-all duration-300 hover:scale-105"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={`absolute bottom-10 ${!open ? "right-1/2" : "right-[40%]"} transition-all duration-300 transform translate-x-1/2`}>
                <PaginationPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default CompanyPage;
