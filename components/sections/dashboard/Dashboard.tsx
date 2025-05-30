import { NextPage } from 'next'

interface Props { }

const Dashboard: NextPage<Props> = ({ }) => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <h1 className='text-3xl font-medium'>This is Master Data</h1>
        </div>
    )
}

export default Dashboard