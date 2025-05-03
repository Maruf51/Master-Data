'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ForgotPasswordAction, ForgotPasswordState } from '@/types/types';
import { ArrowLeft } from 'lucide-react';
import { NextPage } from 'next'
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface PropsTypes {
    state: ForgotPasswordState;
    dispatch: React.Dispatch<ForgotPasswordAction>;
    handleSendOTP: (e: React.FormEvent) => void;
}

const ChangePassword: NextPage<PropsTypes> = ({ state, dispatch, handleSendOTP }) => {
    const { error, loading, email, activeSection } = state

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        dispatch({ type: "SET_ERROR", payload: "" })
        dispatch({ type: "SET_LOADING", payload: "Updating..." })
        setMessage("")

        if (newPassword === confirmPassword) {
            const data = { havePassword: false, newPassword, email }

            const response = await fetch("/api/update-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                dispatch({ type: "SET_ERROR", payload: result.error || "Something went wrong" })
                dispatch({ type: "SET_LOADING", payload: "" })
                return;
            }

            setNewPassword("")
            setConfirmPassword("")
            setMessage("Password changed")
            setTimeout(() => {
                setMessage("")
            }, 3000)
        } else {
            dispatch({ type: "SET_ERROR", payload: "New password and confirm password did not match." })
        }
        dispatch({ type: "SET_LOADING", payload: "" })
    }
    return (
        <div className={twMerge("p-8 space-y-6", activeSection !== "password" && "hidden")}>
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Change your password</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                        loading ? loading : "Change"
                    }
                </Button>
            </form>
        </div>
    )
}

export default ChangePassword