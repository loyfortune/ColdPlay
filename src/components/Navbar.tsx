import { Link, useLocation, useNavigate } from "react-router"
import { UserAuth } from '../context/AuthContext';
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
    const { user, logOut } = UserAuth();
    const [query, setQuery] = useState('');
    const location = useLocation();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate();
    //console.log(user?.email);
    
    const handleLogOut = async () => {
        try{
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    const displayForm = () => {
        const searchBtn = searchRef.current;
        const formElement = formRef.current;
         searchBtn?.classList.add('hidden');
        formElement?.classList.remove('hidden');
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (query.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(query)}`)
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

        const toggleSearch = () => {
        const searchBtn = searchRef.current;
        const formElement = formRef.current;
        if (formElement?.classList.contains('hidden')) {
        searchBtn?.classList.remove('hidden');
        }
        else {
        searchBtn?.classList.add('hidden');  
        }   
        }
        toggleSearch();
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
                <button onClick={displayForm} ref={searchRef} className="text-white text-xs sm:text-base mt-2 cursor-pointer"><FiSearch /></button>
                    <form onSubmit={handleSearch} className="hidden mr-1 w-28 sm:w-xs md:w-sm text-white" ref={formRef}>
                <input
                value={query}
                onChange={(e) => {setQuery(e.target.value)}}
                className="w-[90%] rounded py-1 px-2 text-sm sm:text-base outline outline-gray-300"
                    type="text"
                    id="search-box"
                    placeholder="Search movies..."
                />
                <button className="w-[10%] pl-1 cursor-pointer"><FiSearch/></button>
                </form>
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