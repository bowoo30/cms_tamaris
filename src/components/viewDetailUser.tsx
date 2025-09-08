import { log } from "console";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiUserFocusDuotone } from "react-icons/pi";
import useSWR, { mutate } from "swr";

interface ViewDetailProps {
    user: any;
    companies: any;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ViewDetail = ({
    user,
    companies,
}: ViewDetailProps) => {
    const [selectedCompany, setSelectedCompany] = useState("");



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
                    user_id: user.id,
                    company_id: selectedCompany,
                }),
            });

            if (res.ok) {
                toast.success("Company assigned successfully!");
            } else {
                toast.error("Failed to assign company.");
            }
            mutate(`/api/usercompanies/${user.id}`);
            setSelectedCompany("");
        } catch (error) {
            console.error(error);
            toast.error("Error assigning company.");
        }
    };
    const { data: userCompany, error, isLoading } = useSWR(
        `/api/usercompanies/${user.id}`,
        fetcher
    );

    // console.log('userCompany', userCompany);
    

    return (
        <div>
            <div className="flex gap-2 justify-start items-center">
                <div className="text-7xl">
                    <PiUserFocusDuotone />
                </div>
                <div className="text-sm border-l border-gray-300 pl-4">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
            </div>
            <hr className="border-1 border-gray-300 mt-2" />
            <div className="flex justify-between">
                <p className="text-sm mt-2 text-sky-950">Assign Company</p>
                <button
                    onClick={handleAssignCompany}
                    className="text-xs cursor-pointer bg-sky-700 hover:bg-green-600 transition-colors duration-300 mt-2 text-white border border-gray-300 rounded-md px-2"
                >
                    Add
                </button>
            </div>
            <div className="mt-2 relative">
                <select
                    id="company-select"
                    name="company"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-2 text-sm bg-white text-gray-700 shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                    hover:border-sky-400 transition-colors duration-200"
                >
                    <option value="" disabled>
                        🌐 Select a company...
                    </option>
                    {companies?.length > 0 ? (
                        companies.map((company: any) => (
                            <option
                                key={company.id}
                                value={company.id}
                                className="text-gray-700"
                            >
                                {company.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>⚠ No companies available</option>
                    )}
                </select>
            </div>
            {/* Show Assigned Company */}
            <div>
                <p className="text-sm mt-2 text-sky-950">Company :</p>
                {isLoading && (
                    <p className="text-sm">Loading...</p>
                )}
                {userCompany?.companies?.length ? (
                    <div className="mt-2 max-h-28 overflow-y-auto pr-1">
                        {userCompany.companies.map((company: { name: string }, index: number) => (
                            <p
                                key={index}
                                className="text-sm text-sky-800 mb-1 px-2 hover:bg-gray-200 cursor-pointer rounded-md"
                            >
                                {company.name}
                            </p>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className="text-xs text-gray-500">No company assigned</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewDetail;
