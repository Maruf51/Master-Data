'use client'

import { useState } from 'react'
import { NextPage } from 'next'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/shared/modal/Modal'

interface Props { }

const ProjectAction: NextPage<Props> = ({ }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    return (
        <div className="absolute top-0 right-0">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-auto h-9 cursor-pointer">
                        Action
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500 hover:!text-red-500"
                        onSelect={() => {
                            setShowDeleteModal(true)
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Modal
                title="Delete this project?"
                description="Are you sure you want to delete this project? Be cautious, this process cannot be undone!"
                trigger={null} // No trigger needed because we're opening it manually
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
            >
                {showDeleteModal && (
                    <div className="flex flex-col gap-4">
                        <Button variant="destructive" className=' cursor-pointer'>Delete Project</Button>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default ProjectAction
