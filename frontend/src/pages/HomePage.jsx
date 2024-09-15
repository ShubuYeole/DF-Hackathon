import React from 'react';
import logo from '../assets/logo.png';

const HomePage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <img src={logo} alt="DigitalFlake Logo" className='w-40 h-35 mb-2' />
            <h1 className='text-3xl font-bold'>Welcome to Digitalflake Admin</h1>
        </div>
    );
}

export default HomePage;
