import { Link, useLocation } from "react-router"
import { UserAuth } from '../context/AuthContext';
import { useEffect, useRef } from "react";

const Navbar = () => {
    const { user, logOut } = UserAuth();
    const location = useLocation();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    //console.log(user?.email);

    const handleLogOut = async () => {
        try{
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (location.pathname.includes('/watch')) {
            const navbar = navbarRef.current;
            navbar?.classList.add('hidden');
        }
        if (location.pathname === '/account') {
            const logOutButton = buttonRef.current;
            logOutButton?.classList.remove('hidden');
        }
    }, [location.pathname]);

    return(
        <div ref={navbarRef} className='flex items-center justify-between z-100 px-2 my-2 mx-auto w-full absolute sm:px-4 sm:my-4 lg:px-6'>
         <Link onClick={() => buttonRef.current && (buttonRef.current.classList.add('hidden'))} to='/'>
            <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-blue-500'>ColdPlay</h1>
         </Link>
            {user?.email ? (
            <div className='flex items-center gap-2 sm:gap-4'>
                <Link onClick={() => buttonRef.current && (buttonRef.current.classList.remove('hidden'))} to='/account'>
            <button className='text-white text-base md:text-lg cursor-pointer'>Account</button>
            </Link>
            <button ref={buttonRef} onClick={handleLogOut} className='text-white text-sm sm:text-base py-1 px-3 lg:py-2 lg:px-5 bg-blue-500 rounded cursor-pointer hidden'>Log Out</button>          
            </div>
            ) : (
            <div className='flex items-center gap-2 sm:gap-4'>
                <Link to='/login'>
            <button className='text-white text-sm sm:text-base cursor-pointer'>Sign In</button>
            </Link>
            <Link to='/signup'>
            <button className='text-white text-sm sm:text-base py-1 px-3 lg:py-2 lg:px-5 bg-blue-500 rounded cursor-pointer'>Sign Up</button>
            </Link>
            </div>
            )}
        </div>
    )
}
export default Navbar