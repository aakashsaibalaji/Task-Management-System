import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const NoAccess: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Redirecting...</h2>
                <div className="text-gray-600 dark:text-gray-400 mb-6"> You are being redirected to the login page. Please wait or click the button below if not redirected. </div>
                <Button variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </div>
    )
}

export default NoAccess;