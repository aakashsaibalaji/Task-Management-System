"use client"
import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext";
import Header from "../_components/header";
import axios from "axios";
const Login: React.FC = () => {
    const router = useRouter();
    const { setEmail, setToken, setUsername } = useUser();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [signInWithEmailandPassword] = useSignInWithEmailAndPassword(auth);

    const handleonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await signInWithEmailandPassword(formData.email, formData.password);
            if (response) {
                const token = await response.user.getIdToken();
                const values = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${formData.email}`);
                if (!values) {
                    toast.warn("Something went wrong, Please try again.");
                    return;
                }
                setEmail(formData.email);
                setToken(token);
                setUsername(values.data.username);
                localStorage.setItem("email", formData.email);
                localStorage.setItem("token", token);
                localStorage.setItem("username", values.data.username);
                toast.success("Login sucessfully");
                router.push("/dashboard");
                setLoading(false);
                setFormData({
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            console.error(error)
            setLoading(false);
            toast.warn("Something went wrong, please try again.");
        }
    }
    return (
        <div className="">
            <Header />
            <div className="w-full max-w-md mx-auto rounded-md p-6 md:p-8 lg:max-w-lg drop-shadow-x mt-10">
                <Card className="bg-white dark:bg-gray-800 transition duration-300">
                    <CardHeader className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Login
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <div className="w-full">
                                    <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleonChange} className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100" />
                                </div>
                                <div className="w-full">
                                    <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleonChange} className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100" />
                                </div>
                                <div className="flex flex-col items-center space-y-4 w-full">
                                    <div>
                                        {loading ? (<div>Loading ...</div>) : (
                                            <Button className="w-full dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800 mx:w-auto text-center">
                                                Login
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-sm text-center text-gray-900 dark:text-gray-100">
                                            <strong><Link href="/register" className="text-blue-500 hover:underline dark:text-blue-400">Register</Link></strong>, if you don’t have an account
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login;