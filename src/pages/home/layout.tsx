import About from "@/components/aboutus";
import HeroSection from "@/components/heroSection";
import NewsArticle from "@/components/news-article";
import Partners from "@/components/partners";
import Portofolio from "@/components/portofolio";
import Project from "@/components/project";
import VisiMisi from "@/components/visi-misi";

const HomeLayout = () => {
    return (
        <>
            <div className="relative h-screen w-full overflow-hidden">
                {/* Hero Section as background */}
                <HeroSection />
                {/* Navbar on top */}
                {/* <section className="absolute top-0 left-0 w-full z-20">
                    <Navbar />
                </section> */}
            </div>
            <section className="relative max-w-screen-xl mx-auto mt-10">
                <About />
            </section>
            <section className="relative mt-15">
                <VisiMisi/>
            </section>
            <section className="relative mt-10">
                <Portofolio/>
            </section>
            <section className="relative max-w-screen-xl mx-auto mt-10">
                <Project/>
            </section>
            <section className="relative max-w-screen-xl mx-auto mt-10">
                <NewsArticle/>
            </section>
            <section className="relative max-w-screen-xl mx-auto mt-10">
                <Partners/>
            </section>
        </>
    );
}

export default HomeLayout;
