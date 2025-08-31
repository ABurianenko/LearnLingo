import { Suspense, useEffect } from "react"
import { Header } from "../Header/Header"
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        const root = document.getElementById('root');
        const onTeachers = pathname.startsWith('/teachers');
        root.classList.toggle('container', onTeachers);
    }, [pathname]);

    return (
        <>
            <Header />
            <main>
                <Suspense>{children}</Suspense>
            </main>
        </>
    )
}