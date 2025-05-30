import { NextPage } from 'next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Image from 'next/image'
import { SessionUserTypes } from '@/types/types'

interface Props {
    user: SessionUserTypes
}

const ProfileDropdown: NextPage<Props> = ({ user }) => {
    const { name, email, image } = user;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='w-10 h-10 rounded-full border primary-border flex justify-center items-center overflow-hidden cursor-pointer bg-white dark:bg-[#17191b] shadow-sm relative'>
                    {
                        image && <Image src={image} width={50} height={50} className='w-full h-full object-cover z-10 absolute top-0 left-0' alt="profile" />
                    }
                    <h1 className='text-black dark:text-white'>{name ? name.charAt(0).toUpperCase() : ''}</h1>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem route='profile'>Profile</DropdownMenuItem>
                <DropdownMenuItem route='update-password'>Update password</DropdownMenuItem>
                <DropdownMenuItem route='forgot-password'>Forgot password</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileDropdown