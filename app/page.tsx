

import ThemeToggler from "@/components/ThemeToggler";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export default async function Home() {
  const session = await getServerSession()
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-red-500 dark:bg-green-500 flex-col gap-3">
      <ThemeToggler />
      <h1 className="text-white dark:text-white text-3xl font-medium">{session?.user?.name}</h1>
      <h1 className="text-white dark:text-white text-xl font-medium">{session?.user?.email}</h1>
    </div>
  );
}
