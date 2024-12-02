"use client"
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Header from "../_components/header";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import axios from "axios";

interface FormData {
    fullname: string;
    username: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });
    const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            router.push("/dashboard");
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "username") {
            debouncedCheckUsername(value);
        }
    };

    const checkUsernameValid = async (username: string) => {
        setCheckingUsername(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/check/`, {
                username,
            });
            setIsUsernameValid(response.status === 200);
        } catch (error) {
            setIsUsernameValid(false);
        } finally {
            setCheckingUsername(false);
        }
    };

    const debouncedCheckUsername = debounce(checkUsernameValid, 500);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { fullname, username, email, password } = formData;

            if (!fullname || !username || !email || !password) {
                toast.warn("Please fill all the fields.");
                return;
            }

            if (!isUsernameValid) {
                toast.warn("Username is already taken.");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(email, password);
            if (userCredential) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`, {
                    fullname,
                    username,
                    email,
                });

                if (response.status === 200) {
                    toast.success("Registered successfully!");
                    router.push("/login");
                } else if (response.status === 409) {
                    toast.warning("Email is already registered.");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="w-full max-w-md mx-auto rounded-md p-6 md:p-8 lg:max-w-lg drop-shadow-x mt-10">
                <Card className="bg-white dark:bg-gray-800 transition duration-300">
                    <CardHeader className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Register
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="w-full">
                                <Input
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>
                            <div className="w-full">
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                                />
                                {checkingUsername ? (
                                    <div className="text-sm text-gray-500 mt-1">Checking username...</div>
                                ) : isUsernameValid === false ? (
                                    <div className="text-sm text-red-500 mt-1">Username is already taken</div>
                                ) : isUsernameValid === true ? (
                                    <div className="text-sm text-green-500 mt-1">Username is available</div>
                                ) : null}
                            </div>
                            <div className="w-full">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>
                            <div className="w-full">
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="New Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>
                            <div className="flex flex-col items-center space-y-4 w-full">
                                {loading ? (
                                    <div>Loading ...</div>
                                ) : (
                                    <Button type="submit" className="w-full dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800">
                                        Register
                                    </Button>
                                )}
                                <div className="text-sm text-center text-gray-900 dark:text-gray-100">
                                    <strong>
                                        <Link href="/login" className="text-blue-500 hover:underline dark:text-blue-400">
                                            Login
                                        </Link>
                                    </strong>
                                    , if you already have an account
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;




