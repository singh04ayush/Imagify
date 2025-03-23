import React from 'react'
import { assets } from '../assets/assets'

function Description() {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg'/>
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered text to Image Generator</h2>
                <p className='text-gray-600 mb-4'>Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
                <p className='text-gray-600'>Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Power by advanced AI technology, the creative possibilities are limitless!</p>
            </div>
        </div>

    </div>
  )
}

export default Description
