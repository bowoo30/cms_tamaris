import { useOpen } from "@/components/context/isActived";
import { useSession } from "next-auth/react";

const WidgetsPage = () => {
    const { data: session } = useSession();
    const { open } = useOpen();
    return (
        <div className={`relative p-4 mx-4 mt-5 ${open ? "min-w-[1300px]" : "min-w-[1400px]"}`}>
            <div className="flex items-center space-x-4">
                <div className="border-r pr-4">
                    <h1 className="text-2xl font-semibold text-sky-900">Widgets Dashboard</h1>
                </div>
                <div className="">
                    <p className="text-gray-500">{session?.user?.name}</p>
                </div>
            </div>
        </div>
    );
}

export default WidgetsPage;