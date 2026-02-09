import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiHomeAlt } from 'react-icons/bi';
import { BsCalendar2Date } from 'react-icons/bs';
import { FaCarrot } from 'react-icons/fa';

import { routes } from '~constants/routes';
import SessionHandler from '~utils/sessionHandler';

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className='w-auto bg-neutral-50 h-20 flex  justify-around items-center fixed bottom-0 left-0 right-0 rounded-t-[1.25rem] md:w-24 md:flex-col md:right-auto md:top-0 md:h-auto md:justify-start  md:rounded-tl-none md:rounded-r-[1.25rem] 2xl:w-32'>
            <Link href='/home'>
                <div className='flex flex-col items-center justify-items-end md:mt-20 text-neutral-400 hover:text-[#21252A] cursor-pointer ease-in-out duration-300'>
                    <BiHomeAlt className='text-4xl justify-items-center mb-1 md:mb-2' />
                    <p>Home</p>
                </div>
            </Link>
            <Link href='/watering'>
                <div className='flex flex-col items-center justify-items-center md:mt-12 text-neutral-400 hover:text-[#21252A] cursor-pointer ease-in-out duration-300'>
                    <BsCalendar2Date className='text-4xl mb-1 md:mb-2' />
                    <p>Watering</p>
                </div>
            </Link>
            <Link href='/presets'>
                <div className='flex flex-col items-center justify-items-center md:mt-12 text-neutral-400 hover:text-[#21252A] cursor-pointer ease-in-out duration-300'>
                    <FaCarrot className='text-4xl mb-1 md:mb-2' />
                    <p>Presets</p>
                </div>
            </Link>
            <div
                onClick={() => {
                    SessionHandler.logout();
                    router.push(routes.login);
                }}
            >
                <div className='flex flex-col items-center justify-items-center md:mt-12 text-neutral-400 hover:text-[#21252A] cursor-pointer ease-in-out duration-300'>
                    <p>Log out</p>
                </div>
            </div>
        </nav>
    );
}
