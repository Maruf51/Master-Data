'use client'

import { NextPage } from 'next'
import { Modal } from './Modal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { icons } from '@/data/data'
import { IconTypes } from '@/types/types'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Dialog } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

interface Props { }

const AddProjectModal: NextPage<Props> = ({ }) => {
    const { data: session } = useSession()
    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [selectedIcon, setSelectedIcon] = useState<IconTypes>(icons[5])
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const resetModal = () => {
        setName("")
        setDescription("")
        setSelectedIcon(icons[5])
        setError("")
        setLoading(false)
        router.refresh()
        setOpen(false) // close modal
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const body = { name, description, icon: selectedIcon.name, email: session?.user?.email }

        setLoading(true)
        setError("")
        try {
            const result = await fetch("/api/project/create", {
                method: "POST",
                body: JSON.stringify(body)
            })
            const response = await result.json()

            if (!response.success) {
                throw new Error(response.error || "Internal server error")
            }

            resetModal() // Reset and close
        } catch (error: any) {
            console.log(error)
            setError(error.message || "Internal server error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <Modal
                open={open}
                onOpenChange={setOpen}
                title="Add a new project"
                description="Project name must be unique as it will be override otherwise"
                trigger={
                    <Button variant="outline" className='!h-12 !text-base mt-2 cursor-pointer disabled:cursor-not-allowed'>
                        <Plus className='!w-5 !h-5' /> Add project
                    </Button>
                }
            >
                <form onSubmit={handleSubmit} className="grid gap-5">
                    <div className='h-12 md:h-10 relative'>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            name="name"
                            placeholder='Project name* (Unique)'
                            className='h-12 md:h-10 pl-12 md:pl-10'
                            required
                        />
                        <selectedIcon.icon className='absolute top-0 left-0 w-12 h-12 md:w-10 md:h-10 p-3' />
                    </div>
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        name="description"
                        placeholder='Description* (Optional)'
                        className='h-12 md:h-10'
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='!h-12 md:!h-10 !text-base cursor-pointer disabled:cursor-not-allowed'>
                                <Plus className='!w-5 !h-5' /> Select icon
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[300px] grid grid-cols-5 gap-4 p-2">
                            {icons.map((icon: IconTypes, index: number) => {
                                const Icon = icon.icon
                                return (
                                    <DropdownMenuItem onSelect={() => setSelectedIcon(icon)} key={index} className="justify-center">
                                        <Icon />
                                    </DropdownMenuItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {error && <p className='text-sm text-red-500 text-center'>{error}</p>}
                    <Button variant="outline" className='h-11 md:h-10' disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </form>
            </Modal>
        </Dialog>
    )
}

export default AddProjectModal
