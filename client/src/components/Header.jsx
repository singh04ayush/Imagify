import React from 'react';
import { assets } from '../assets/assets'

const Header = () =>{
    return (
        <div className='flex flex-col justify-center items-center text-center my-20'>
            <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
                <p>Best Text to image generator</p>
                <img src={assets.star_icon} alt="" />
            </div>
            <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'>image</span>, in seconds</h1>
            <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen</p>
            <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>
                Genertae Images
                    <img className='h-6' src={assets.star_group} alt="" />
            </button>
        </div>
    )
}

export default Header