import React from 'react'
import {assets} from '../assets/assets'

const Result = () => {
  return (
    <form className='flex flex-col min-h-[90vh] justify-center items-center'>

    <div>
      <div className='relative'>
        <img src={assets.sample_img_1} alt="" className='max-w-sm rounded' />
        <span className='absolute bottom-0 h-1 bg-blue-500 w-full transistion-all duration-[10]'></span>
      </div>
      <p>Loading...</p>
    </div>

    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'> 
      <input type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'/>
      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
    </div>

    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
      <p className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href="">Download</a>
    </div>

    </form>
  )
}

export default Result
