
import RegisterForm from "@/components/forms/RegisterForm";
import ThemeToggler from "@/components/ThemeToggler";
import { SearchParamsTypes } from "@/types/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage({ searchParams }: SearchParamsTypes) {
    const session = await getServerSession();

    const params = await searchParams;

    if (session) {
        const callbackUrl = params?.callbackUrl || "/";
        redirect(callbackUrl);
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="absolute top-4 right-4">
                <ThemeToggler />
            </div>
            <RegisterForm errorMessage={params?.error || ""} callbackUrl={params?.callbackUrl || "/"}  />
        </div>
    );
}