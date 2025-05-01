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

export default function SignInForm({errorMessage}: {errorMessage: string}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(true)
    const [error, setError] = useState(errorMessage || "")
    const [loading, setLoading] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading("Signing...")
        try {
            // Sign in
            const signInResponse = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/",
            });
            console.log(signInResponse)

            if (signInResponse?.error) {
                setError(signInResponse.error);
            }
            setLoading("")
        } catch (err) {
            setError("An unexpected error occurred");
            setLoading("")
        }
    }

    return (
        <div className="w-full max-w-md">
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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Sign in to your account</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                className="text-indigo-600 dark:text-indigo-400"
                            />
                            <Label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                                Remember me
                            </Label>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Forgot password?
                        </Link>
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
                            loading ? loading : "Sign In"
                        }
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-700 dark:text-white cursor-pointer"
                    >
                        <img src={googleIcon.src} alt="google icon" />
                        <span>Google</span>
                    </Button>
                </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Not a member?{" "}
                <Link
                    href="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                    Join us now!
                </Link>
            </p>
        </div>
    )
}
