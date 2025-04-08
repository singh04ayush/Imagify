import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-8 sm:gap-y-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-2 mb-4 sm:mb-6">
                            <img src={assets.logo_icon} alt="" className="w-7 sm:w-8 h-7 sm:h-8" />
                            <span className="text-lg sm:text-xl font-medium">imagify</span>
                        </div>
                        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                            Turn your imagination into visual art in seconds with our AI-powered image generation platform.
                        </p>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <a href="https://github.com/singh04ayush/Imagify" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors">
                                <img src={assets.github_icon} alt="github" className="w-4 sm:w-5 h-4 sm:h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/ayush-singh-87b3682a5/" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors">
                                <img src={assets.linkedin_icon} alt="linkedin" className="w-4 sm:w-5 h-4 sm:h-5" />
                            </a>
                            <a href="https://www.instagram.com/singh04_ayush/" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors">
                                <img src={assets.instagram_icon} alt="Instagram" className="w-4 sm:w-5 h-4 sm:h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[13px] sm:text-sm font-semibold text-gray-900 mb-4 sm:mb-6">QUICK LINKS</h3>
                        <ul className="space-y-3 sm:space-y-4">
                            <li>
                                <Link to="/" className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/buy" className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[13px] sm:text-sm font-semibold text-gray-900 mb-4 sm:mb-6">SUPPORT</h3>
                        <ul className="space-y-3 sm:space-y-4">
                            <li>
                                <a href="#" className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-4">
                        <h3 className="text-[13px] sm:text-sm font-semibold text-gray-900 mb-4 sm:mb-6">STAY UPDATED</h3>
                        <p className="text-[14px] sm:text-[15px] text-gray-600 mb-4 sm:mb-6">
                            Subscribe to our newsletter for the latest updates and features.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] text-gray-600 bg-white border border-gray-200 rounded-l-lg focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-4 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 text-center border-t border-gray-100">
                    <p className="text-[14px] sm:text-[15px] text-gray-600">
                        © {currentYear} Imagify. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
