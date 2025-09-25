import { Suspense, useEffect } from "react"
import { Header } from "../Header/Header"
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        const html = document.documentElement;
        const useMutedBg = (
            pathname.startsWith('/teachers') ||
            pathname.startsWith('/favorites')
        );
        html.setAttribute('data-page', useMutedBg ? 'muted' : 'default'
        )
    }, [pathname]);

    return (
        <>
            <Header className="header" />
            <main>
                <Suspense>{children}</Suspense>
            </main>
        </>
    )
}