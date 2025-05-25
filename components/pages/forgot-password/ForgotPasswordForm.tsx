"use client"

import { NextPage } from 'next'
import EmailForm from './EmailFrom'
import { useReducer, useState } from 'react'
import OTPForm from './OTPForm'
import { ForgotPasswordAction, ForgotPasswordState } from '@/types/types'
import ChangePassword from './ChangePassword'
import Stepper, { Step } from '@/components/Stepper'

export const initialState: ForgotPasswordState = {
    email: "",
    error: "",
    loading: "",
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
        case "RESET":
            return initialState;
        default:
            return state;
    }
}


interface Props { }

const ForgotPasswordForm: NextPage<Props> = ({ }) => {
    const [state, dispatch] = useReducer(forgotPasswordReducer, initialState);
    const [activeNextStep, setActiveNextStep] = useState<number>(1)
    const [previousBtnName, setPreviousBtnName] = useState<string>("Change email")
    const [step, setStep] = useState<number>(1)

    const handleNextStep = () => {
        setActiveNextStep(Math.random() * 1000000000)
        setStep((prevState: number) => prevState + 1)
        if (step === 1) {
            setPreviousBtnName("Change email")
        } else if (step === 2) {
            setPreviousBtnName("Try again")
        }
    }

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

        if (step === 1) {
            handleNextStep()
        }
        dispatch({ type: "SET_LOADING", payload: "" });
    };

    return (
        <Stepper
            initialStep={0}
            handleNextStep={activeNextStep}
            onStepChange={(step) => {
                setStep(step)
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText={previousBtnName}
            nextButtonText="Next"
            disableStepIndicators
            disableNextButton
            disablePreviousButton={step === 4 || step === 3 && true}
        >
            <Step>
                <EmailForm state={state} dispatch={dispatch} handleSendOTP={handleSendOTP} />
            </Step>
            <Step>
                <OTPForm state={state} dispatch={dispatch} handleSendOTP={handleSendOTP} handleNextStep={handleNextStep} />
            </Step>
            <Step>
                <ChangePassword state={state} dispatch={dispatch} handleSendOTP={handleSendOTP} handleNextStep={handleNextStep} />
            </Step>
            <Step>
                <div className='flex flex-col justify-center items-center gap-2 mt-5'>
                    <h1 className='text-xl font-medium'>Your password has been changed</h1>
                    <a href="/signin" className='text-xl text-blue-500 hover:underline'>Login now!</a>
                </div>
            </Step>
        </Stepper>
    )
}

export default ForgotPasswordForm