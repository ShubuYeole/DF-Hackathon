import { Book, Home, KeyRound, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";


const Sidebar = () => {


    return (
        <aside className='fixed left-0 top-16 bg-purple-900 w-64 p-6 space-y-4 h-full'>
            <ul>
                <li>
                    <Link
                        to='/'
                        className='text-white flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md'
                    >
                        <Home size={18} /> Home
                    </Link>
                </li>
                <li>
                    <Link
                        to='/category'
                        className='text-white flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md'
                    >
                        <Book size={18} /> Category
                    </Link>
                </li>
                <li>
                    <Link
                        to='/products'
                        className='text-white flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md'
                    >
                        <ShoppingCart size={18} /> Products
                    </Link>
                </li>
                <li>
                    <Link
                        to='/reset-password'
                        className='text-white flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md'
                    >
                        <KeyRound size={18} /> Reset Password
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
