import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import ThemeToggler from "@/components/ThemeToggler";
import { getServerSession } from "next-auth";

const url = process.env.WEB_URL

export default async function Page() {
    const session = await getServerSession();

    const result = await fetch(`${url}/api/get-auth?email=${session?.user?.email}`);
    const response = await result.json()

    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="absolute top-4 right-4">
                <ThemeToggler />
            </div>
            {
                response?.error ? <p>{response.error || "Something went wrong fetching data"}</p> : <UpdatePasswordForm havePassword={response?.password} email={session?.user?.email || ""} />
            }
        </div>
    );
}