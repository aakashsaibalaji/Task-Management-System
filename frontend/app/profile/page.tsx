"use client"
import { useState, useEffect } from "react";
import React from "react";
import { useUser } from '../context/userContext'
import { useRouter } from "next/navigation";
import NoAccess from "../_components/onaccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, UserCircle } from 'lucide-react'
import axios from "axios";
import Header from "../_components/header";

const Profile: React.FC = () => {
    const { email, setEmail, token, setToken } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const storedToken = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("email");
        const storedUsername = localStorage.getItem("username");
        if (storedToken) {
            setToken(storedToken);
            setEmail(storedEmail || "");
            setUsername(storedUsername || "");
        } else {
            router.push("/login");
        }
        setLoading(false);
    }, [isMounted, router, setToken, setEmail]);

    const fetchingUserDetails = async () => {
        setLoading(true);
        if (!email) return;
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${email}`
            );
            if (response.status === 200) {
                setFullName(response.data.fullname);
                setUsername(response.data.username);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isMounted) {
            fetchingUserDetails();
        }
    }, [email, isMounted]);

    if (!isMounted || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="flex items-center justify-center p-4">
                {token ? (
                    <Card className="w-full max-w-md mx-auto mt-5 mb-5">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="w-16 h-16">
                                <AvatarImage
                                    src={username ? `https://api.dicebear.com/6.x/initials/svg?seed=${username}` : undefined}
                                    alt={fullName || "User"}
                                />
                                <AvatarFallback>
                                    {fullName
                                        ? fullName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()
                                        : "?"}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{fullName}</CardTitle>
                                <div className="text-sm text-muted-foreground">Profile Details</div>
                            </div>
                        </CardHeader>
                        {!loading ? (
                            <CardContent className="grid gap-4">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <div className="font-medium">Username:</div>
                                    <div>{username}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <div className="font-medium">Email:</div>
                                    <div>{email}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UserCircle className="w-4 h-4 text-muted-foreground" />
                                    <div className="font-medium">Full Name:</div>
                                    <div>{fullName}</div>
                                </div>
                            </CardContent>
                        ) : (<></>)}
                    </Card>
                ) : (
                    <NoAccess />
                )}
            </div>
        </div>
    );
};


export default Profile;
