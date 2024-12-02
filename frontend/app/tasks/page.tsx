'use client';

import React, { useEffect, useState } from "react";
import Header from "../_components/header";
import { useUser } from "../context/userContext";
import { toast } from "react-toastify";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
}

const ListOfTask: React.FC = () => {
    const { username, setEmail, setUsername, setToken } = useUser();
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Default to true for initial loading
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
    const [editingCard, setEditingCard] = useState<Task | null>(null);
    const [removeCard, setRemoveCard] = useState<Task | null>(null);
    const router = useRouter();

    // Authenticate user
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            const storedUsername = localStorage.getItem("username");
            const storedEmail = localStorage.getItem("email");

            if (storedToken) {
                setToken(storedToken);
                setUsername(storedUsername || "");
                setEmail(storedEmail || "");
            } else {
                router.push("/login");
            }
            setLoading(false);
        }
    }, [router, setToken, setUsername, setEmail]);

    // Fetch all tasks
    const fetchAllTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/${username}`
            );
            if (response.status === 200) {
                setAllTasks(response.data.tasks);
            } else {
                toast.warn("Failed to fetch tasks.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to fetch the tasks. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Open edit dialog
    const openEditDialog = (task: Task) => {
        setEditingCard(task);
        setIsDialogOpen(true);
    };

    // Update task
    const handleUpdate = async () => {
        if (editingCard) {
            try {
                setLoading(true);
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/update/${editingCard._id}`,
                    {
                        title: editingCard.title,
                        description: editingCard.description,
                        status: editingCard.status,
                    }
                );

                if (response.status === 200) {
                    toast.success("Task updated successfully.");
                    setAllTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === editingCard._id ? editingCard : task
                        )
                    );
                } else {
                    toast.warn("Failed to update the task.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Unable to update the task. Please try again later.");
            } finally {
                setLoading(false);
                setIsDialogOpen(false);
                setEditingCard(null);
            }
        }
    };

    // Delete task
    const handleDelete = async () => {
        if (removeCard) {
            try {
                setLoading(true);
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/remove/${removeCard._id}`
                );
                if (response.status === 200) {
                    toast.success("Task deleted successfully.");
                    setAllTasks((prevTasks) => prevTasks.filter((task) => task._id !== removeCard._id));
                } else {
                    toast.warn("Failed to delete the task.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Unable to delete the task. Please try again later.");
            } finally {
                setLoading(false);
                setIsDialogOpenDelete(false);
            }
        }
    };

    // Update task status
    const handleStatusChange = async (taskId: string, newStatus: string) => {
        try {
            setLoading(true);
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/status/${taskId}`,
                { status: newStatus }
            );
            if (response.status === 200) {
                toast.success("Status updated successfully.");
                setAllTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === taskId ? { ...task, status: newStatus } : task
                    )
                );
            } else {
                toast.warn("Failed to update the status.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to update the status. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDeleteDialog = (task: Task) => {
        setRemoveCard(task);
        setIsDialogOpenDelete(true);
    }

    useEffect(() => {
        if (username) {
            fetchAllTasks();
        }
    }, [username]);

    return (
        <div>
            <Header />
            <h1 className="text-3xl font-bold text-center my-5">List of Tasks</h1>
            <div className="container max-w-4xl mx-auto px-4 py-4">
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading tasks...</p>
                    ) : allTasks.length > 0 ? (
                        allTasks.map((task) => (
                            <Card
                                key={task._id}
                                className="p-4 bg-white shadow-md rounded-lg"
                            >
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle className="text-lg font-semibold">
                                        {task.title}
                                    </CardTitle>
                                    <select
                                        value={task.status}
                                        onChange={(e) =>
                                            handleStatusChange(task._id, e.target.value)
                                        }
                                        className="border rounded-md px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openEditDialog(task)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleOpenDeleteDialog(task)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No tasks available.</p>
                    )}
                </div>

                {/* Dialog for editing task */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Task</DialogTitle>
                        </DialogHeader>
                        {editingCard && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="edit-title" className="block font-medium">
                                        Title
                                    </label>
                                    <input
                                        id="edit-title"
                                        value={editingCard.title}
                                        onChange={(e) =>
                                            setEditingCard({ ...editingCard, title: e.target.value })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="edit-description"
                                        className="block font-medium"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="edit-description"
                                        value={editingCard.description}
                                        onChange={(e) =>
                                            setEditingCard({
                                                ...editingCard,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button onClick={handleUpdate} disabled={loading}>
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/*Dialog for confirm the Delete.*/}
                <Dialog open={isDialogOpenDelete} onOpenChange={setIsDialogOpenDelete}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to delete this task? This action cannot be undone.</p>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpenDelete(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                Confirm Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ListOfTask;

