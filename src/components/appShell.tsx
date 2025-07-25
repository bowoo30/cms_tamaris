import { useRouter } from "next/router";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";

type AppShellProps = {
    children: React.ReactNode
}


const useNavbar2 = ['/']

const AppShell = (props: AppShellProps) => {
    const { pathname } = useRouter();
    const { children } = props;
    return (
        <main>
            {!useNavbar2.includes(pathname) ? <Navbar2 /> : <Navbar />}
            {children}
        </main>
    );
}

export default AppShell;