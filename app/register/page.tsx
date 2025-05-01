
import RegisterForm from "@/components/forms/RegisterForm";
import ThemeToggler from "@/components/ThemeToggler";
import { SearchParamsTypes } from "@/types/types";

export default async function RegisterPage({ searchParams }: SearchParamsTypes) {
    const params = await searchParams;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="absolute top-4 right-4">
                <ThemeToggler />
            </div>
            <RegisterForm />
        </div>
    );
}