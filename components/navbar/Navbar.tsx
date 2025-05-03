import { NextPage } from 'next'
import ThemeToggler from '../ThemeToggler'

interface Props { }

const Navbar: NextPage<Props> = ({ }) => {
    return (
        <nav className="fixed top-0 left-0 w-full h-auto px-5 py-3 md:px-10 md:py-3">
            <div className='container mx-auto flex justify-between items-center'>
                <a href="/" className='cursor-pointer'><h1 className='font-semibold text-3xl'>Boiler Plate</h1></a>
                <div className='flex items-center gap-3'>
                    <ThemeToggler />
                </div>
            </div>
        </nav>
    )
}

export default Navbar