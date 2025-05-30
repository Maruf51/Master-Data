'use client'

import { Menu } from 'lucide-react'
import { NextPage } from 'next'

interface Props { }

const SidebarMenu: NextPage<Props> = ({ }) => {
    return (
        <div className='w-9 h-9 primary-border border rounded-sm flex justify-center items-center absolute top-[14px] cursor-pointer'>
            <Menu />
        </div>
    )
}

export default SidebarMenu