// Navbar.jsx
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";

    return (
        <header className='fixed top-0 w-full bg-purple-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-purple-800'>
            <div className='container mx-auto px-4 py-3'>
                <div className='flex justify-between items-center'>
                    {/* Left Side: DigitalFlake logo */}
                    <Link
                        to='/'
                        className='text-2xl font-bold text-white items-center space-x-2 flex'
                    >
                        DigitalFlake
                    </Link>

                    {/* Right Side: Navbar links */}
                    <nav className='flex items-center gap-4'>
                        {user ? (
                            <button
                                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
                                onClick={logout}
                            >
                                <LogOut size={18} />
                                <span className='hidden sm:inline ml-2'>Log Out</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to={"/signup"}
                                    className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
                                >
                                    <UserPlus className='mr-2' size={18} />
                                    Sign Up
                                </Link>
                                <Link
                                    to={"/login"}
                                    className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
                                >
                                    <LogIn className='mr-2' size={18} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
