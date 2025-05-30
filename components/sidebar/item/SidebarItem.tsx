"use client"

import { LayoutDashboard, LogOut, LucideIcon, UserPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import nProgress from "nprogress";
import { twMerge } from "tailwind-merge";
import activeIcon from "@/images/icons/active.svg"

const icons: any = {
    dashboard: LayoutDashboard,
    signout: LogOut,
    profile: UserPen,
}

interface NavItemTypes {
    icon: string;
    name: string;
    route: string;
    sidebarToggler: () => void;
}
const SidebarItem = ({ icon, name, route, sidebarToggler }: NavItemTypes) => {
    const Icon = icons[icon] || icons.dashboard
    return (
        <div onClick={() => {
            if (icon === "signout") {
                nProgress.start();
                sidebarToggler()
                signOut();
            }
            else if (name !== route) {
                nProgress.start();
                sidebarToggler()
                redirect(`/${name}`);
            }
        }} className={twMerge("relative flex gap-3 items-center cursor-pointer active-nav px-5 py-3 rounded-sm overflow-hidden", route === name && "bg-shade dark:bg-shade-dark")}>
            {
                name === route && <img src={activeIcon.src} className="absolute top-0 left-0 h-full blur-[5px]" alt="active icon" />
            }
            <Icon className={twMerge("", route === name && "text-highlight")} />
            <span className=' capitalize'>{name}</span>
        </div>
    )
}

export default SidebarItem;