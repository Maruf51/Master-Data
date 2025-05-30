
import { NextPage } from 'next'
import ThemeToggler from '../ThemeToggler'
import ProfileDropdown from './ProfileDropdown'
import { getServerSession } from 'next-auth'
import { SessionUserTypes } from '@/types/types'
import { twMerge } from 'tailwind-merge'

interface Props {
    user: SessionUserTypes;
    position?: "absolute" | "relative";
}

const Navbar: NextPage<Props> = async ({ user, position = 'relative' }) => {
    return (
        <nav className={twMerge("w-full h-16 px-5 py-3 md:px-10 md:py-3 shrink-0 border-b primary-border", position)}>
            <div className='md:container mx-auto flex justify-between items-center'>
                <div className='md:hidden w-9 h-9'>

                </div>
                <a href="/" className='cursor-pointer'><h1 className='font-semibold text-2xl md:text-3xl'>Master Data</h1></a>
                <div className='flex items-center gap-3'>
                    <ThemeToggler />
                    <ProfileDropdown user={user} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar