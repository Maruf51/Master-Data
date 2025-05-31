import { ProjectTypes } from '@/types/types'
import { NextPage } from 'next'
import ProjectAction from './ProjectAction';

interface Props {
    data: ProjectTypes;
}

const Project: NextPage<Props> = ({ data }) => {
    const { name, email, uid, icon, description } = data
    return (
        <div className="p-5">
            <div className="relative w-full flex justify-between">
                <ProjectAction />
                <div className="flex flex-col gap-3 md:max-w-[600px]">
                    <h1 className="text-4xl font-semibold capitalize pr-20">{name}</h1>
                    {description && <p className="text-gray-500 dark:text-gray-400">{description}</p>}
                </div>
            </div>
        </div>

    )
}

export default Project