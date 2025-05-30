"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { getSession, signOut, useSession } from "next-auth/react"

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const session = useSession()
    const { status } = session;

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="cursor-pointer duration-[0]"
            >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
        </>
    )
}
