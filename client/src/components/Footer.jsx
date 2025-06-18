import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-6">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-4">
                        <div className="flex items-center gap-2 mb-3">
                            <img src={assets.logo_icon} alt="" className="w-6 h-6" />
                            <span className="text-lg font-medium">imagify</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Turn your imagination into visual art in seconds with our AI-powered platform.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="https://github.com/phoenixdev100/Imagify" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors">
                                <img src={assets.github_icon} alt="github" className="w-4 h-4" />
                            </a>
                            <a href="https://www.linkedin.com/in/phoenixdev100/" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors">
                                <img src={assets.linkedin_icon} alt="linkedin" className="w-4 h-4" />
                            </a>
{/*                             <a href="https://www.instagram.com/singh04_ayush/" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors">
                                <img src={assets.instagram_icon} alt="Instagram" className="w-4 h-4" />
                            </a> */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xs font-semibold text-gray-900 mb-3">QUICK LINKS</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="text-sm text-gray-600 hover:text-gray-900">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-sm text-gray-600 hover:text-gray-900">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/buy" className="text-sm text-gray-600 hover:text-gray-900">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xs font-semibold text-gray-900 mb-3">SUPPORT</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 md:col-span-4">
                        <h3 className="text-xs font-semibold text-gray-900 mb-3">STAY UPDATED</h3>
                        <p className="text-sm text-gray-600 mb-3">
                            Subscribe for the latest updates and features.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full flex-1 px-4 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg sm:rounded-r-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg sm:rounded-l-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-4 text-center border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        © {currentYear} Imagify. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
