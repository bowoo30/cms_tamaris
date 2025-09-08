import { useState } from "react";
import { MdCancel } from "react-icons/md";

interface Props {
    onClose: () => void;
    onSubmit: (code: string, language: string) => void;
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (language: string) => void;
}

const AddLanguage = ({
    onClose,
    onSubmit,
    code,
    setCode,
    language,
    setLanguage,
}: Props) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(code, language);
        onClose();
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent  z-10">
            <div className="w-[250px] bg-white rounded-xl shadow-lg p-6 border border-gray-300 relative">
                <div className="mb-6 text-center">
                    <p className="text-xl font-bold text-sky-900">Add Language</p>
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-2 right-2 cursor-pointer text-sky-900 text-2xl hover:text-red-400 transition-all"
                    >
                        <MdCancel />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Enter language code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="border px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter language name"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="border px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-sky-600 text-white py-2 rounded-md hover:bg-green-500 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>

    )
}

export default AddLanguage;