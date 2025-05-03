"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ForgotPasswordAction, ForgotPasswordState } from "@/types/types"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

interface PropsTypes {
    state: ForgotPasswordState;
    dispatch: React.Dispatch<ForgotPasswordAction>;
    handleSendOTP: (e: React.FormEvent) => void;
}
const EmailForm = ({ state, dispatch, handleSendOTP }: PropsTypes) => {

    const { activeSection, email, error, loading } = state

    return (
        <div className={twMerge("p-8 space-y-6", activeSection !== "email" && "hidden")}>
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Write your email here</h1>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
                        required
                        className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                </div>
                {
                    error && <p className="text-sm text-red-500 text-center">{error}</p>
                }
                <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed"
                    disabled={loading ? true : false}
                >
                    {
                        loading ? loading : "Send OTP"
                    }
                </Button>
            </form>
        </div>
    )
}

export default EmailForm;