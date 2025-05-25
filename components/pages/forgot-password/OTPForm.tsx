"use client"

import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { ForgotPasswordAction, ForgotPasswordState } from "@/types/types"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface PropsTypes {
    state: ForgotPasswordState;
    dispatch: React.Dispatch<ForgotPasswordAction>;
    handleSendOTP: (e: React.FormEvent) => void;
    handleNextStep: () => void;
}
const OTPForm = ({ state, dispatch, handleSendOTP, handleNextStep }: PropsTypes) => {

    const { email, error, loading } = state
    const [value, setValue] = useState("")

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch({ type: "SET_ERROR", payload: "" });
        dispatch({ type: "SET_LOADING", payload: "Verifying OTP..." });

        const response = await fetch("/api/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: state.email, otp: value }),
        });

        const result = await response.json();

        if (!response.ok) {
            dispatch({ type: "SET_ERROR", payload: result.error || "Something went wrong" });
            dispatch({ type: "SET_LOADING", payload: "" });
            return;
        }

        handleNextStep()
        dispatch({ type: "SET_LOADING", payload: "" });
    };

    useEffect(() => {
        dispatch({ type: "SET_ERROR", payload: "" })
    }, [])

    return (
        <div className={twMerge("p-8 pb-5 space-y-6 otp")}>
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
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Verify your OTP</h1>
                    <p className="text-sm">Your code was sent to you via email</p>
                </div>
            </div>

            <div className="mx-auto flex justify-center flex-col items-center gap-3 w-min">
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="opacity-0 w-2.5" />
                        <InputOTPGroup>
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="opacity-0 w-2.5" />
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="opacity-0 w-2.5" />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="opacity-0 w-2.5" />
                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="opacity-0 w-2.5" />
                        <InputOTPGroup>
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTPGroup>
                </InputOTP>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button
                    className={twMerge("w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed", !error && "mt-3")}
                    disabled={loading ? true : false}
                    onClick={handleVerifyOTP}
                >
                    {
                        loading ? loading : "Verify"
                    }
                </Button>
                <p className="text-sm">Didn't receive code? <span onClick={handleSendOTP} className="text-blue-500 cursor-pointer hover:underline">Request again</span></p>
            </div>
        </div>
    )
}

export default OTPForm;