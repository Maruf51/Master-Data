'use client'

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-red-500 dark:bg-green-500 duration-300">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
        className="border rounded-md bg-white text-black border-red-700 dark:border-green-700 duration-300 px-5 py-3 cursor-pointer"
      >
        {theme === "light" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
