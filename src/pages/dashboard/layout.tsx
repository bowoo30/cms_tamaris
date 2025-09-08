import Sidebar from "@/components/sidebar";
import ProtectedPage from "@/components/protectPage";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProtectedPage>
            <div className="flex min-h-screen">
                <Sidebar />
                <main>{children}</main>
            </div>
        </ProtectedPage>
    );
}

export default DashboardLayout;