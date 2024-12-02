"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, FileText, LogOut, Menu, X, NotebookIcon } from 'lucide-react';
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "react-toastify";
import { DollarSign } from "lucide-react";

const Header: React.FC = () => {
    const { token, setEmail, setToken } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        toast.success("Logout successfully");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        setEmail(null);
        setToken(null);
        router.push("/login");
    };

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: User, label: "Profile", href: "/profile" },
        { icon: NotebookIcon, label: "All Tasks", href: "/tasks" }
    ];

    const NavLinks = ({ mobile = false }) => {
        return (
            <>
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center ${!mobile ? "list-disc pl-4" : ""}`}
                    >
                        <Button
                            variant="ghost"
                            className={`flex items-center ${mobile ? "w-full justify-start" : ""}`}
                            asChild
                        >
                            <Link href={item.href}>
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        </Button>
                    </li>
                ))}
                <li
                    className={`flex items-center ${!mobile ? "list-disc pl-4" : ""}`}
                >
                    <Button
                        variant="ghost"
                        className={`flex items-center text-red-600 hover:text-red-700 ${mobile ? "w-full justify-start" : ""}`}
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </li>
            </>
        );
    };

    const AuthLinks = ({ mobile = false }) => (
        <>
            <li className={`flex items-center ${!mobile ? "list-disc pl-4" : ""}`}>
                <Button
                    variant="ghost"
                    className={`flex items-center ${mobile ? "w-full justify-start" : ""}`}
                    asChild
                >
                    <Link href="/login">Login</Link>
                </Button>
            </li>
            <li className={`flex items-center ${!mobile ? "list-disc pl-4" : ""}`}>
                <Button
                    variant="ghost"
                    className={`flex items-center ${mobile ? "w-full justify-start" : ""}`}
                    asChild
                >
                    <Link href="/register">Register</Link>
                </Button>
            </li>
        </>
    );

    return (
        <header className="bg-black text-gray-200 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <header className="px-4 lg:px-6 h-14 flex items-center">
                    <Link className="flex items-center justify-center" href="#">
                        <DollarSign className="h-6 w-6" />
                        <div className="ml-2 text-2xl font-bold">TaskEase</div>
                    </Link>
                </header>
                <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                        {token ? <NavLinks /> : <AuthLinks />}
                    </ul>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetTitle>
                            <nav className="flex flex-col space-y-4 mt-6">
                                {token ? <NavLinks mobile /> : <AuthLinks mobile />}
                            </nav>
                        </SheetTitle>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Header;






