'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from '../context/userContext'
import { useRouter } from "next/navigation";
import NoAccess from '../_components/onaccess'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Header from '../_components/header';
import { toast } from 'react-toastify';
import axios from 'axios';

interface taskProps {
    title: string
    description: string
    status: string
}

export default function TaskDashboard() {
    const { token, setToken, username, setUsername } = useUser();
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [taskForm, setTaskForm] = useState<taskProps>({
        title: "",
        description: "",
        status: ""
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            const storedUsername = localStorage.getItem('username');
            if (storedToken) {
                setToken(storedToken);
                setUsername(storedUsername);
            } else {
                router.push('/login');
            }
            setLoading(false);
        }
    }, [router, setToken, setUsername]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        setTaskForm({ ...taskForm, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = {
                title: taskForm.title,
                description: taskForm.description,
                status: "pending",
                username
            };
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/`, data);
            if (response.status === 200) {
                toast.success('Task created successfully');
                setTaskForm({ title: "", description: "", status: "" });
                router.push('/tasks');
            } else {
                toast.warn('Failed to create task. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error("Server failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            {token ? (
                <div className="mt-10 mb-10">
                    <div>
                        <Card className="w-full max-w-md mx-auto">
                            <CardHeader>
                                <CardTitle>Create New Task</CardTitle>
                                <CardDescription>Enter the title and description for your new task.</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleSubmit} >
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter title"
                                            required
                                            name='title'
                                            value={taskForm.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Enter description"
                                            required
                                            name='description'
                                            value={taskForm.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full">{loading ? "...loading" : "Submit"}</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </div>
            ) : (
                <NoAccess />
            )}
        </div>
    );
}



