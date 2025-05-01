import SignInForm from "@/components/forms/SignInForm";
import ThemeToggler from "@/components/ThemeToggler";
import { SearchParamsTypes } from "@/types/types";

export default async function SignInPage({
    searchParams,
}: SearchParamsTypes) {
    const params = await searchParams;

    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="absolute top-4 right-4">
                <ThemeToggler />
            </div>
            <SignInForm errorMessage={params?.error || ""} />
        </div>
    );
}