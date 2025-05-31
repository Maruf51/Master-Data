'use client'

import { NextPage } from 'next'
import avatar from "@/images/user.png"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Camera } from 'lucide-react'
import ImageUpload from '@/components/shared/image/ImageUpload'
import { UserTypes } from '@/types/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'



interface Props {
  user: UserTypes;
}

const Profile: NextPage<Props> = ({ user }) => {
  const { update } = useSession()
  const router = useRouter()

  const [nameValue, setNameValue] = useState<string>(user?.name || "")



  const [updating, setUpdating] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }, [message])

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault()

    setUpdating(true)
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, name: nameValue }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      const data = await response.json();
      await update({ email: user.email })
      router.refresh()
      setMessage(data.message)
      setError("");
    } catch (err: any) {
      console.error('Update error:', err);
      setError(err.message || 'Something went wrong while updating user.');
      setUpdating(false)
    }
    setUpdating(false)
  };

  return (
    <div className='w-full h-full flex justify-center items-center mx-auto'>
      <div className=' px-5 gap-10 flex flex-col lg:flex-row w-full justify-center items-center lg:items-start'>
        <ImageUpload user={user} >
          <div className='group w-44 md:w-48 lg:w-52 xl:w-56 shrink-0'>
            <div className='relative w-full h-44 md:h-48 lg:h-52 xl:h-56 overflow-hidden rounded-t-2xl shrink-0'>
              <Image src={user?.image || avatar} alt='profile image' width={300} height={300} className='w-full h-full object-cover' />
              <div className='w-full h-full flex justify-center items-center text-white dark:text-white bg-[#0000004b] dark:bg-[#0000004b] absolute z-10 top-0 left-0 opacity-0 group-hover:opacity-100 duration-200 cursor-pointer'>
                <Camera />
              </div>
            </div>
            <div className='w-full h-10 text-center flex justify-center items-center bg-[#539ed1] rounded-b-2xl cursor-pointer'>
              <h2 className='font-medium text-white dark:text-white'>Change Profile</h2>
            </div>
          </div>
        </ImageUpload>
        <form onSubmit={handleUpdateImage} className='flex justify-center items-center flex-col gap-5 w-full lg:max-w-[400px] lg:pt-3 xl:pt-5'>
          <InputProfile
            name='name'
            placeholder='Fullname'
            value={nameValue}
            getValue={(e) => setNameValue(e)}
          />
          <InputProfile
            name='email'
            placeholder='Email'
            value={user?.email || ""}
            getValue={(e) => console.log(e)}
            disabled={true}
          />
          {
            error && <p className='text-base text-center text-red-500'>{error}</p>
          }
          {
            message && <p className='text-base text-center text-green-500'>{message}</p>
          }
          <Button type='submit' className='w-full h-12 text-lg cursor-pointer disabled:cursor-not-allowed disabled:brightness-70' variant="outline" disabled={nameValue === user.name || updating}>
            {
              updating ? "Updating..." : "Update"
            }
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Profile

interface InputTypes {
  name: keyof UserTypes
  placeholder: string
  type?: string
  disabled?: boolean
  value: string
  getValue: (e: string) => void
}

const InputProfile = ({
  name,
  placeholder,
  type = "text",
  disabled = false,
  value,
  getValue,
}: InputTypes) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className='border primary-border px-5 h-12 rounded-lg w-full outline-none disabled:opacity-70 shadow-xs'
      disabled={disabled}
      value={value}
      onChange={(e) => getValue(e.target.value)}
      required
    />
  )
}
