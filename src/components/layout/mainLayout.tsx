import { useRouter } from "next/router";
import Navbar from "../navbar";
import Navbar2 from "../navbar2";
import Footer from "../footer";

type AppShellProps = {
    children: React.ReactNode
}


const useNavbar2 = ['/']

const MainLayout = (props: AppShellProps) => {
    const { pathname } = useRouter();
    const { children } = props;
    return (
        <main>
            {!useNavbar2.includes(pathname) ? <Navbar2 /> : <Navbar />}
            {children}
            <Footer />
        </main>
    );
}

export default MainLayout;