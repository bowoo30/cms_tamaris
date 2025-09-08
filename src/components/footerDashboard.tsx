const FooterDashboard = () => {
    return (
        <footer className=" text-sky-900 py-4 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-xs px-2">
                    &copy; {new Date().getFullYear()} CMS Tamaris Dashboard. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default FooterDashboard;