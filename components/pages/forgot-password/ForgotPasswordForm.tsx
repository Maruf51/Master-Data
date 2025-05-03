"use client"

import { NextPage } from 'next'
import EmailForm from './EmailFrom'
import { useReducer, useState } from 'react'
import OTPForm from './OTPForm'
import { ForgotPasswordAction, ForgotPasswordState } from '@/types/types'
import ChangePassword from './ChangePassword'

export const initialState: ForgotPasswordState = {
    email: "",
    error: "",
    loading: "",
    activeSection: "email",
};

export function forgotPasswordReducer(
    state: ForgotPasswordState,
    action: ForgotPasswordAction
): ForgotPasswordState {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_SECTION":
            return { ...state, activeSection: action.payload };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}


interface Props { }

const ForgotPasswordForm: NextPage<Props> = ({ }) => {
    const [state, dispatch] = useReducer(forgotPasswordReducer, initialState);

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch({ type: "SET_ERROR", payload: "" });
        dispatch({ type: "SET_LOADING", payload: "Sending OTP..." });

        const response = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: state.email }),
        });

        const result = await response.json();

        if (!response.ok) {
            dispatch({ type: "SET_ERROR", payload: result.error || "Something went wrong" });
            dispatch({ type: "SET_LOADING", payload: "" });
            return;
        }

        dispatch({ type: "SET_LOADING", payload: "" });
        dispatch({ type: "SET_SECTION", payload: "otp" });
    };

    return (
        <div className='w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden'>
            {
                state.activeSection === "email" ? <EmailForm
                    state={state}
                    dispatch={dispatch}
                    handleSendOTP={handleSendOTP}
                /> : (
                    state.activeSection === "otp" ? <OTPForm
                        state={state}
                        dispatch={dispatch}
                        handleSendOTP={handleSendOTP} />
                        :
                        (
                            state.activeSection === 'password' && <ChangePassword
                                state={state}
                                dispatch={dispatch}
                                handleSendOTP={handleSendOTP} />
                        )
                )
            }
        </div>
    )
}

export default ForgotPasswordForm