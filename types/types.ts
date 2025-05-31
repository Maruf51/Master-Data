import { LucideIcon } from "lucide-react";

export interface SearchParamsTypes {
    searchParams: Promise<{ [key: string]: string | undefined }>
}


// types for forgot password
export type Section = "email" | "otp" | "password";

export interface ForgotPasswordState {
    email: string;
    error: string;
    loading: string;
}

export type ForgotPasswordAction =
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_ERROR"; payload: string }
    | { type: "SET_LOADING"; payload: string }
    | { type: "RESET" };

export interface ImageTypes {
    thumbnailUrl: string,
    url: string,
}

export interface UserTypes {
    name: string,
    email: string,
    image: string,
}

export interface IconTypes {
    name: string;
    icon: LucideIcon;
};

export interface ProjectTypes {
    uid: string,
    name: string,
    description?: string,
    icon: string,
    email: string,
}