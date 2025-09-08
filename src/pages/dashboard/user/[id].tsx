import DashboardLayout from "../layout";
import { useOpen } from "@/components/context/isActived";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { GoKebabHorizontal } from "react-icons/go";
import toast from "react-hot-toast";
import type Company from "@/types/company";
import PaginationPage from "@/components/pagination";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Link from "next/link";


const fetcher = (url: string) => fetch(url).then((res) => res.json());
const UserByID = ({ }) => {
    const router = useRouter();
    const { id } = router.query;
    const [searchTerm, setSearchTerm] = useState("");
    const {
        data: userCompany,
        mutate: localMutate,
    } = useSWR(`/api/usercompanies/${id}`, fetcher);

    const {
        data: companyData,
        error: companyError,
        isLoading: companyLoading,
    } = useSWR<Company[]>(`/api/company/`, fetcher);

    const filteredCompanies = userCompany?.companies?.filter((c: any) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('filteredCompanies', filteredCompanies);
    console.log('Search Term', searchTerm);

    const { open } = useOpen();
    const { data } = useSession();
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<string>("");
    

    // Pagination pakai data hasil filter
    const [currentPage, setCurrentPage] = useState(1);
    const companyPerPage = 10;
    const indexOfLastCompany = currentPage * companyPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companyPerPage;
    // const currentCompanies = userCompany?.companies?.slice(indexOfFirstCompany, indexOfLastCompany);
    const currentCompanies = filteredCompanies?.slice(indexOfFirstCompany, indexOfLastCompany);
    // const totalPages = Math.ceil((userCompany?.companies?.length || 0) / companyPerPage);

    // Hitung total page juga dari data hasil filter
    const totalPages = Math.ceil((filteredCompanies?.length || 0) / companyPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const toggleOption = (id: number) => {
        setSelectedOptionId(prevId => (prevId === id ? null : id));
    };

    const handleDelete = async (user_id: number, company_id: number) => {
        try {
            const url = `/api/user_companies`;
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id, company_id }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Gagal menghapus perusahaan");
                return;
            }
            toast.success(data.message);
            localMutate();
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Delete error:", error);
        }
    };
    // console.log('userCompany', userCompany);

    const handleAssignCompany = async () => {
        if (!selectedCompany) {
            toast.error("Please select a company first.");
            return;
        }

        try {
            const res = await fetch("/api/user_companies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userCompany.user.id,
                    company_id: selectedCompany,
                }),
            });

            if (res.ok) {
                toast.success("Company assigned successfully!");
            } else {
                toast.error("Failed to assign company.");
            }
            mutate(`/api/usercompanies/${userCompany.user.id}`);
            setSelectedCompany("");
        } catch (error) {
            console.error(error);
            toast.error("Error assigning company.");
        }
    };



    return (
        <DashboardLayout>
            <div className={`relative p-4 mx-4 mt-5 ${open ? "min-w-[1300px]" : "min-w-[1400px]"}`}>
                <div className="flex items-center justify-between space-x-4 mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="border-r pr-4">
                            <h1 className="text-2xl font-bold text-sky-900">User Detail Dashboard</h1>
                        </div>
                        <div className="text-gray-500">{data?.user?.name}</div>
                    </div>
                </div>
                <div className="border-t border-gray-400 flex justify-between items-center">
                    <div className="flex text-sky-800 text-xs rounded-lg ">
                        <p className="border-r border-gray-400 mr-4 pr-4">{userCompany?.user?.name}</p>
                        <p className="border-r border-gray-400 mr-4 pr-4">{userCompany?.user?.email}</p>
                        <p className="border-r border-gray-400 mr-4 pr-4">{userCompany?.user?.role_name}</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="🔍 Search company..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                        <select
                            id="company-select"
                            name="company"
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="border border-gray-300 rounded-lg w-full text-xs bg-white text-gray-700
                focus:outline-none
                hover:border-sky-400 transition-colors duration-300"
                        >
                            <option value="" disabled>
                                🌐 Select a company...
                            </option>
                            {companyData?.length ? (
                                companyData.map((company) => (
                                    <option key={company.id} value={company.id} className="rounded-lg ">
                                        {company.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>⚠ No companies available</option>
                            )}
                        </select>
                        <button onClick={handleAssignCompany} className="text-xs font-semibold text-white px-3  rounded-lg bg-sky-600 hover:bg-green-600 cursor-pointer">Add</button>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-4 ">
                    {currentCompanies ? (
                        currentCompanies.map((item: any, idx: number) => (
                            <div
                                key={`${item.id}-${idx}`} // ✅ key unik
                                className="relative col-span-1 mb-2 bg-white h-[230px] rounded-xl border border-gray-200 hover:scale-105 transition-all duration-300 shadow-md"
                            >
                                <Image
                                    src={item.logo}
                                    alt="logo"
                                    width={120}
                                    height={100}
                                    className="mx-auto p-2 w-28 h-30 object-center object-contain"
                                />
                                <button
                                    onClick={() => toggleOption(item.id)}
                                    className="absolute top-2 right-2 cursor-pointer"
                                >
                                    <GoKebabHorizontal />
                                </button>
                                <div className="border-t border-gray-200 mt-2 bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-b-xl">
                                    <Link href={`/dashboard/company/${item?.id}`} className="text-md font-light text-sky-900">{item.name}</Link>
                                    <p className="text-gray-600 text-sm">{item.domain}</p>
                                    {open ? (
                                        <div className="transition-all duration-300">
                                            {item.name.length <= 25 ? <br /> : null}
                                        </div>
                                    ) : (
                                        <div className="transition-all duration-300">
                                            {item.name.length <= 26 ? <br /> : null}
                                        </div>
                                    )}
                                </div>
                                {selectedOptionId === item.id && (
                                    <div className="absolute top-8 right-1 flex flex-col space-y-2 bg-[#4B5945]/80 border border-gray-500 font-semibold rounded-md shadow-md p-2">
                                        <button
                                            onClick={() => handleDelete(
                                                userCompany?.user?.id,   // user_id
                                                item.id                  // company_id
                                            )}
                                            className="text-white text-xs cursor-pointer hover:text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-5 flex items-center justify-center">
                            <p className="text-gray-500">No companies found</p>
                        </div>
                    )}

                </div>
            </div>
            <div className={`absolute bottom-5 ${!open ? "right-1/2" : "right-[40%]"} transition-all duration-300 transform translate-x-1/2`}>
                <PaginationPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </DashboardLayout>
    );
};

export default UserByID;


