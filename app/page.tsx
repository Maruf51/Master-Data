import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession()
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900 flex-col gap-3">
      {
        session?.user?.image && <Image src={session?.user?.image} width={75} height={75} alt="profile image" className="rounded-lg" />
      }
      <h1 className="text-black dark:text-white text-3xl font-medium">{session?.user?.name}</h1>
      <h1 className="text-black dark:text-white text-xl font-medium">{session?.user?.email}</h1>
    </div>
  );
}
