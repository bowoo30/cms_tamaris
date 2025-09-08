import { MdCancel } from "react-icons/md";
interface AddUserProps {
    onClose: () => void;
    onSubmit: (name: string, email: string, password: string) => void;
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}


const AddUser = ({
    onClose,
    onSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
}: AddUserProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, email, password);
        onClose();
    };
    return (
        <div className="absolute top-[50%] right-[-50px] w-[250px] transform -translate-x-1/2 -translate-y-1/2 bg-transparent backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-300 z-10 ">
            <div className=" mb-6 text-center">
                <p className="text-2xl font-bold text-sky-900">Add User</p>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute cursor-pointer top-2 right-2 text-sky-900 text-2xl hover:text-red-400 transition-all"
                >
                    <MdCancel />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    required
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border px-3 py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    required
                />
                <button
                    type="submit"
                    className="bg-sky-600 text-white py-2 rounded-md hover:bg-green-500 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500
                        cursor-pointer"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default AddUser;