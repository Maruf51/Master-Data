import ForgotPasswordForm from "@/components/pages/forgot-password/ForgotPasswordForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const url = process.env.WEB_URL

export default async function Page() {
    const session = await getServerSession();

    if (session) {
        redirect("/");
    }
    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 overflow-hidden">
            <ForgotPasswordForm />
        </div>
    );
}