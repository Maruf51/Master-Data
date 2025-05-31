'use client'

import { NextPage } from 'next'
import SidebarItem from './item/SidebarItem';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import AddProjectModal from '../shared/modal/AddProjectModal';
import { ProjectTypes } from '@/types/types';

interface Props {
    page: string;
    projects: ProjectTypes[];
}

const Sidebar: NextPage<Props> = ({ page, projects }) => {
    const [sidebarActive, setSidebarActive] = useState<boolean>(false)

    const sidebarToggler = () => {
        setSidebarActive((prevState) => !prevState)
    }
    return (
        <>
            <div onClick={sidebarToggler} className='md:hidden w-9 h-9 primary-border border rounded-sm flex justify-center items-center fixed top-[14px] cursor-pointer mx-5'>
                <Menu />
            </div>
            <div className={twMerge("w-full h-[-webkit-fill-available] md:w-[250px] shrink-0 absolute md:relative left-0 pointer-events-none md:pointer-events-auto", sidebarActive && "pointer-events-auto")}>
                <div className={twMerge('w-full h-full md:w-[250px] bg-pbg1 dark:bg-pbg1-dark relative z-10 flex justify-between gap-1 flex-col -translate-x-full md:translate-x-0 px-5 md:px-0 duration-300 transition-transform pb-5 md:pb-0', sidebarActive && "translate-x-0")}>
                    <div className='flex flex-col gap-1 overflow-auto'>
                        <SidebarItem sidebarToggler={sidebarToggler} icon="dashboard" name={"dashboard"} route={page} />
                        {
                            projects.map((project: ProjectTypes, index: number) => <SidebarItem sidebarToggler={sidebarToggler} icon={project.icon} key={index} name={project.name} route={page} />)
                        }
                        <SidebarItem sidebarToggler={sidebarToggler} icon="user-pen" name={"profile"} route={page} />
                        <SidebarItem sidebarToggler={sidebarToggler} icon="logout" name={"Sign out"} route={page} />
                    </div>
                    <AddProjectModal />
                </div>
            </div>
        </>
    )
}

export default Sidebar

