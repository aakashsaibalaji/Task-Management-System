import exp from "constants"
import React from "react"
import Header from "./header";
import Footer from "./footer";
interface Layoutprops {
    children: React.ReactNode;
}
const Layout: React.FC<Layoutprops> = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;