import React, { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { user, setShowLogin, logout, credit } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const profileRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/buy' },
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e, action) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            action();
        }
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md' role="navigation">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Left side - Logo */}
                    <Link to='/' className="flex items-center" aria-label="Imagify Home">
                        <img 
                            src={assets.logo} 
                            alt="Imagify Logo" 
                            className="w-28 sm:w-32 lg:w-36 transition-transform hover:scale-105" 
                        />
                    </Link>

                    {/* Center - Navigation Items */}
                    <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                                    location.pathname === item.path
                                    ? 'text-blue-600 bg-blue-50/50'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50/50'
                                }`}
                                aria-current={location.pathname === item.path ? 'page' : undefined}
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
                                    className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-50/50 text-blue-600 rounded-full hover:bg-blue-100/50 transition-colors duration-200"
                                    aria-label="Create new image"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="text-sm font-medium">Create</span>
                                </button>
                                
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-600">
                                        Credits: {credit}
                                    </span>
                                </div>

                                <div className="relative" ref={profileRef}>
                                    <button 
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        onKeyDown={(e) => handleKeyDown(e, () => setIsProfileOpen(!isProfileOpen))}
                                        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-50/50 transition-colors"
                                        aria-label="User menu"
                                        aria-expanded={isProfileOpen}
                                    >
                                        <img 
                                            src={user.avatar || assets.profile_icon}
                                            alt="Profile" 
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    <div 
                                        className={`absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-xl py-1 transition-all duration-200 ${
                                            isProfileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                                        }`}
                                        role="menu"
                                    >
                                        <div className="px-4 py-2">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        <Link 
                                            to="/dashboard" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                                            role="menuitem"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link 
                                            to="/settings" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                                            role="menuitem"
                                        >
                                            Settings
                                        </Link>
                                        <button 
                                            onClick={() => navigate('/buy')} 
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                                            role="menuitem"
                                        >
                                            Upgrade Plan
                                        </button>
                                        <button 
                                            onClick={logout} 
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 transition-colors"
                                            role="menuitem"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    onKeyDown={(e) => handleKeyDown(e, () => setShowLogin(true))}
                                    className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-md hover:scale-105"
                                    aria-label="Login"
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
                            onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50/50 transition-colors"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
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
            <div 
                ref={mobileMenuRef}
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden bg-white/90 backdrop-blur-md`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                location.pathname === item.path
                                ? 'text-blue-600 bg-blue-50/50'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50/50'
                            }`}
                            aria-current={location.pathname === item.path ? 'page' : undefined}
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
                            onKeyDown={(e) => handleKeyDown(e, () => {
                                setShowLogin(true);
                                setIsOpen(false);
                            })}
                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
