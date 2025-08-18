import { Suspense } from "react"
import { Header } from "../Header/Header"

export const Layout = ({children}) => {
    return (
        <>
            <Header />
            <main>
                <Suspense>{children}</Suspense>
            </main>
        </>
    )
}