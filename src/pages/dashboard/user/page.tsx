"use client";

import useSWR, { mutate } from "swr";
import { useOpen } from "@/components/context/isActived";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import PaginationPage from "@/components/pagination";
import { FaUserPlus } from "react-icons/fa";
import AddUser from "@/components/addUser";
import { FaFile } from "react-icons/fa6";
import ViewDetail from "@/components/viewDetailUser";
import type Company from "@/types/company";
import { BiSolidRightArrow } from "react-icons/bi";
import Link from "next/link";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    role_id: number;
}

interface Role {
    id: number;
    name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserPage = () => {
    const { data, status } = useSession();
    const { open } = useOpen();
    const { data: users, error, isLoading } = useSWR<User[]>("/api/user", fetcher);
    const { data: companyData, error: companyError, isLoading: companyLoading } = useSWR<Company[]>(`/api/company/`, fetcher);
    const { data: roles } = useSWR<Role[]>("/api/role", fetcher);
    const [addUserOpen, setAddUserOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil((users?.length || 0) / usersPerPage);

    const [openEdit, setOpenEdit] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameAdd, setNameAdd] = useState("");
    const [emailAdd, setEmailAdd] = useState("");
    const [passwordAdd, setPasswordAdd] = useState("");
    const [roleID, setRoleID] = useState("");

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleEdit = (user: User) => () => {
        setSelectedUser(user);
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setRoleID(user.role_id.toString());
        setOpenEdit(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = `/api/user/${selectedUser?.id}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedUser?.id,
                    name,
                    email,
                    password,
                    role_id: parseInt(roleID),
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error);
                return;
            }

            toast.success(data.message);
            mutate("/api/user");
            setOpenEdit(false);
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Update error:", error);
        }
    };

    const handleDelete = async (userId: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;

        try {
            const url = `/api/user/${userId}`;
            const res = await fetch(url, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Gagal menghapus user");
                return;
            }
            toast.success(data.message);
            mutate("/api/user");
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Delete error:", error);
        }
    };

    const handleAddUserClose = () => {
        setAddUserOpen(prev => !prev);
        setNameAdd("");
        setEmailAdd("");
        setPasswordAdd("");
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nameAdd, emailAdd, passwordAdd }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error);
                return;
            }
            toast.success(data.message);
            mutate("/api/user");
            setAddUserOpen(false);
        } catch (error) {
            toast.error("Terjadi kesalahan");
            console.error("Add user error:", error);
        }
    };

    const handleDetail = (user: User) => () => {
        setOpenDetail(prev => !prev);
        setSelectedUser(user);
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setRoleID(user.role_id.toString());
        // setCompany(companyData && companyData.length > 0 ? companyData[0] : null);
    };

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Gagal memuat data pengguna</div>;

    return (
        <div className={`relative p-4 mx-4 mt-5 ${open ? "min-w-[1300px]" : "min-w-[1400px]"}`}>
            <div className="flex items-center justify-between space-x-4 mb-4">
                <div className="flex items-center space-x-4">
                    <div className="border-r pr-4">
                        <h1 className="text-2xl font-bold text-sky-900">User Dashboard</h1>
                    </div>
                    <p className="text-gray-500">{data?.user?.name}</p>
                </div>
                <div>
                    <button
                        onClick={handleAddUserClose}
                        className="bg-sky-600 cursor-pointer text-white flex justify-center items-center gap-x-2 px-4 py-2 text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                        <FaUserPlus />
                    </button>
                </div>
            </div>

            {error && <div className="p-4 text-red-500 text-center">Gagal memuat data pengguna</div>}

            <div className="overflow-x-auto mt-10 rounded-md">
                <table className="w-full min-w-[800px] border border-gray-200 text-sm">
                    <thead className="bg-stone-100">
                        <tr>
                            <th className="px-4 py-2 text-center">No</th>
                            <th className="px-4 py-2 text-center">Name</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-center">Role</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                    Tidak ada data pengguna
                                </td>
                            </tr>
                        ) : (
                            currentUsers?.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-300">
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">{indexOfFirstUser + index + 1}</td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center hover:underline">
                                        <Link href={`/dashboard/user/${user.id}`}>{user.name}</Link>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">{user.email}</td>
                                    <td className="px-4 py-2 border-b border-gray-100 capitalize text-center">{user.role}</td>
                                    <td className="px-4 py-2 border-b border-gray-100 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={handleDetail(user)}
                                                className="text-lime-700 cursor-pointer hover:underline flex items-center gap-1"
                                            >
                                                <FaFile /> Detail
                                            </button>
                                            <button
                                                onClick={handleEdit(user)}
                                                className="text-blue-600 cursor-pointer hover:underline flex items-center gap-1"
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
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

            {openEdit && selectedUser && (
                <div className="fixed inset-0 bg-opacity-30 flex shadow-xl items-center justify-center z-50">
                    <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-[300px] space-y-2 border border-gray-300">
                        <div className="relative">
                            <h2 className="text-2xl font-semibold text-sky-900 text-center">Edit User</h2>
                            <button
                                type="button"
                                onClick={() => setOpenEdit(false)}
                                className="absolute cursor-pointer top-0 right-0 text-sky-900 text-2xl hover:text-red-400 transition-all"
                            >
                                <MdCancel />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-2 p-2 rounded-xl max-w-md mx-auto">
                            <div>
                                <label className="block text-sm text-sky-900 font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border bg-white px-3 py-2 text-sm rounded-md focus:ring-4 focus:ring-sky-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-sky-900 font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border bg-white px-3 py-2 text-sm rounded-md focus:ring-4 focus:ring-sky-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-sky-900 font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border bg-white px-3 py-2 text-sm rounded-md focus:ring-4 focus:ring-sky-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-sky-900 font-medium mb-1">Role</label>
                                <select
                                    value={roleID}
                                    onChange={(e) => setRoleID(e.target.value)}
                                    className="w-full border bg-white px-3 py-2 text-sm rounded-md focus:ring-4 focus:ring-sky-500 focus:outline-none"
                                    required
                                >
                                    <option value="" disabled>Pilih Role</option>
                                    {roles?.map((r) => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer bg-sky-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {addUserOpen && (
                <AddUser
                    onClose={handleAddUserClose}
                    onSubmit={async (nameAdd: string, emailAdd: string, passwordAdd: string) => {
                        setNameAdd(nameAdd);
                        setEmailAdd(emailAdd);
                        setPasswordAdd(passwordAdd);
                        await handleAddUser({
                            preventDefault: () => { },
                        } as unknown as React.FormEvent);
                    }}
                    name={nameAdd}
                    setName={setNameAdd}
                    email={emailAdd}
                    setEmail={setEmailAdd}
                    password={passwordAdd}
                    setPassword={setPasswordAdd}
                />
            )}

            {openDetail && selectedUser && (
                <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-30 flex  items-center justify-center z-50">
                    <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-[300px] space-y-2 border border-gray-300">
                        <div className="relative">
                            <h2 className="text-2xl font-semibold text-sky-900 text-center">Detail User</h2>
                            <button
                                type="button"
                                onClick={() => setOpenDetail(false)}
                                className="absolute cursor-pointer top-0 right-0 text-sky-900 text-2xl hover:text-red-400 transition-all"
                            >
                                <MdCancel />
                            </button>
                        </div>
                        <ViewDetail
                            user={selectedUser}
                            companies={companyData}
                        />
                    </div>
                </div>
            )}

            <div className="flex justify-end mt-4">
                <PaginationPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default UserPage;