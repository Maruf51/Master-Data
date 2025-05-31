
import Navbar from '@/components/navbar/Navbar'
import Dashboard from '@/components/sections/dashboard/Dashboard'
import Profile from '@/components/sections/profile/Profile'
import Project from '@/components/sections/project/Project'
import Sidebar from '@/components/sidebar/Sidebar'
import { ProjectTypes, UserTypes } from '@/types/types'
import { NextPage } from 'next'
import { getServerSession } from 'next-auth'

interface Props {
    params: Promise<{ page: string }>
}

const Page: NextPage<Props> = async ({ params }) => {
    const { page } = await params;
    const session = await getServerSession()

    const dbUser = await fetch(`http://localhost:3000/api/user/get?email=${session?.user?.email}`)
    const response = await dbUser.json()

    const user: UserTypes = {
        name: response?.data?.name || "",
        email: session?.user?.email || "",
        image: response?.data?.image || ""
    }

    const pageHandler = (page: string) => {
        if (page === 'dashboard') {
            return <Dashboard />
        }
        if (page === 'profile') {
            return <Profile user={user} />
        }
        return <Project data={response.projects.find((project: ProjectTypes) => project.name === page)} />
    }

    return (
        <div className="w-dvw h-dvh flex justify-center items-center dark:bg-pbg1-dark flex-col bg-pbg1 overflow-hidden">
            <Navbar user={user} position='absolute' />

            {
                !response.success ? <p className='text-base text-center text-red-500'>{response.error}</p> : <div className="flex gap-5 shrink w-full h-full md:container md:px-5 lg:px-10 xl:px-0 pt-20 pb-5">
                    <Sidebar projects={response.projects} page={page} />
                    <div className='w-full flex-1'>
                        {
                            pageHandler(page)
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default Page
