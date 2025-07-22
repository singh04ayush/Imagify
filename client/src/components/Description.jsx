import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

function Description() {
  return (
    <motion.div 
      initial= {{opacity:0.2, y:100}} 
      transition={{duration:1}} 
      whileInView={{opacity:1, y:0}} 
      viewport={{once:true}} 
      className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    >
      <motion.h1 
        className='text-4xl sm:text-5xl font-bold text-center mb-4 text-gray-900'
        whileHover={{ 
          color: '#4f46e5',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      >
        Create AI Images
      </motion.h1>

      <motion.p 
        className='text-xl text-gray-600 mb-16 text-center'
        whileHover={{ 
          color: '#9333ea',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      >
        Turn your imagination into visuals
      </motion.p>

      <div className='flex flex-col gap-8 md:gap-14 md:flex-row items-start max-w-6xl mx-auto'>
        <motion.div
          className='w-full md:w-[45%] relative group'
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src={assets.sample_img_1} 
            alt="AI Generated Image" 
            className='w-full h-auto rounded-lg shadow-lg relative z-10 max-w-md mx-auto'
          />
        </motion.div>

        <div className='w-full md:w-[55%] space-y-6 md:pl-8'>
          <motion.h2 
            className='text-2xl md:text-3xl font-bold leading-tight text-gray-900'
            whileHover={{ 
              color: '#4f46e5',
              scale: 1.01
            }}
            transition={{ duration: 0.2 }}
          >
            Introducing the AI-Powered text to Image Generator
          </motion.h2>

          <motion.p 
            className='text-base md:text-lg text-gray-600 leading-relaxed'
            whileHover={{ 
              color: '#6366f1',
              x: 10
            }}
            transition={{ duration: 0.2 }}
          >
            Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
          </motion.p>

          <motion.p 
            className='text-base md:text-lg text-gray-600 leading-relaxed'
            whileHover={{ 
              color: '#6366f1',
              x: 10
            }}
            transition={{ duration: 0.2 }}
          >
            Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Power by advanced AI technology, the creative possibilities are limitless!
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
