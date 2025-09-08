import { useRouter } from "next/router";
import Navbar from "../navbar";
import Navbar2 from "../navbar2";
import Footer from "../footer";
import { use } from "react";
import FooterDashboard from "../footerDashboard";

type AppShellProps = {
    children: React.ReactNode
}


const MainLayout = (props: AppShellProps) => {
    const { pathname } = useRouter();
    const { children } = props;
    const showNavbar2 = pathname !== '/';
    // const showFooterDashboard = pathname.startsWith('/dashboard');
    return (
        <main>
            {!showNavbar2 ? <Navbar /> : <Navbar2 />}
            {children}
            <Footer />
        </main>
    );
}

export default MainLayout;