import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { user, setShowLogin, logout } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/buy' },
    ];

    return (
        <div className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm' id='sticky'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Left side - Logo */}
                    <Link to='/' className="flex items-center">
                        <img 
                            src={assets.logo} 
                            alt="Imagify Logo" 
                            className="w-28 sm:w-32 lg:w-36 transition-transform hover:scale-105" 
                        />
                    </Link>

                    {/* Center - Navigation Items */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                                    location.pathname === item.path
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side - Auth & Actions */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={() => navigate('/create')}
                                    className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="text-sm font-medium">Create</span>
                                </button>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-50">
                                        <img 
                                            src={user.avatar || assets.profile_icon}
                                            alt="Profile" 
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 hidden group-hover:block border border-gray-100">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
                                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
                                        <button onClick={() => navigate('/buy')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Upgrade Plan
                                        </button>
                                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="hidden md:block bg-[#4B6BFB] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#3b54d9] transition-all duration-200 hover:shadow-md hover:scale-105"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                location.pathname === item.path
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {!user && (
                        <button
                            onClick={() => {
                                setShowLogin(true);
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-[#4B6BFB] text-white hover:bg-[#3b54d9] transition-colors"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
