"use client"

import { LayoutDashboard, LogOut, LucideIcon, UserPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import nProgress from "nprogress";
import { twMerge } from "tailwind-merge";
import activeIcon from "@/images/icons/active.svg"
import { icons } from "@/data/data";
import { IconTypes } from "@/types/types";



interface NavItemTypes {
    icon: string;
    name: string;
    route: string;
    sidebarToggler: () => void;
}
const SidebarItem = ({ icon, name, route, sidebarToggler }: NavItemTypes) => {
    const Icon = icons.find((ic: IconTypes) => ic.name === icon)?.icon || icons[5].icon
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
        }} className={twMerge("relative flex gap-3 items-center cursor-pointer active-nav px-5 py-3 rounded-sm overflow-hidden shrink-0", route === name && "bg-shade dark:bg-shade-dark")}>
            {
                name === route && <img src={activeIcon.src} className="absolute top-0 left-0 h-full blur-[5px]" alt="active icon" />
            }
            <Icon className={twMerge("", route === name && "text-highlight")} />
            <span className=' capitalize'>{name}</span>
        </div>
    )
}

export default SidebarItem;