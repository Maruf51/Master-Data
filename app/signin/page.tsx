import { redirect } from "next/navigation";
import SignInForm from "@/components/forms/SignInForm";
import { SearchParamsTypes } from "@/types/types";
import { getServerSession } from "next-auth";

export default async function SignInPage({
    searchParams,
}: SearchParamsTypes) {
    const session = await getServerSession();

    const params = await searchParams;

    if (session) {
        const callbackUrl = params?.callbackUrl || "/";
        redirect(callbackUrl);
    }

    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <SignInForm errorMessage={params?.error || ""} callbackUrl={params?.callbackUrl || "/"} />
        </div>
    );
}