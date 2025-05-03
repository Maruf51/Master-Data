"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import googleIcon from "@/images/icons/google.svg"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"

export default function UpdatePasswordForm({ havePassword, email }: { havePassword: boolean, email: string }) {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setMessage("")
        setLoading("Updating...")

        if (newPassword === confirmPassword) {
            const data = { havePassword, newPassword, oldPassword, email }

            const response = await fetch("/api/update-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Something went wrong");
                setLoading("")
                return;
            }

            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setMessage(result.message || "Password updated.")
            setTimeout(() => {
                setMessage("")
            }, 3000)
        } else {
            setError("New password and confirm password did not match.")
        }
        setLoading("")
    }

    return (
        <div className="w-full max-w-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 space-y-6">
                <div className="flex flex-col items-center space-y-6">
                    {/* Logo */}
                    <div className="text-indigo-600 dark:text-indigo-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="24"
                            viewBox="0 0 40 24"
                            fill="none"
                            className="text-indigo-600 dark:text-indigo-400"
                        >
                            <path d="M8 18C19.9543 18 20 6 32 6L32 12C20.0457 12 20 24 8 24L8 18Z" fill="currentColor" />
                            <path d="M32 6C20.0457 6 20 18 8 18L8 12C19.9543 12 20 0 32 0L32 6Z" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Update your password</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {
                        havePassword && <div className="space-y-2">
                            <Label htmlFor="oldPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Old Password
                            </Label>
                            <Input
                                id="oldPassword"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    }
                    <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Password
                        </Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm New Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    {
                        error && <p className="text-sm text-red-500 text-center">{error}</p>
                    }
                    {
                        message && <p className="text-sm text-green-500 text-center">{message}</p>
                    }
                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed"
                        disabled={loading ? true : false}
                    >
                        {
                            loading ? loading : "Update"
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}
