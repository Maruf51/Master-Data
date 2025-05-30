import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import Navbar from "@/components/navbar/Navbar";
import { SessionUserTypes } from "@/types/types";
import { getServerSession } from "next-auth";

const url = process.env.WEB_URL

export default async function Page() {
    const session = await getServerSession();

    const result = await fetch(`${url}/api/user/get-auth?email=${session?.user?.email}`);
    const response = await result.json()

    const dbUser = await fetch(`${url}/api/user/get?email=${session?.user?.email}`)
    const dbResponse = await dbUser.json()

    const user: SessionUserTypes = {
        name: dbResponse?.data?.name || "",
        email: session?.user?.email || "",
        image: dbResponse?.data?.image || ""
    }

    return (
        <>
            <Navbar user={user} position="absolute" />
            <div className="h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                {
                    response?.error ? <p>{response.error || "Something went wrong fetching data"}</p> : <UpdatePasswordForm havePassword={response?.password} email={session?.user?.email || ""} name={session?.user?.name || ""} />
                }
            </div>
        </>
    );
}