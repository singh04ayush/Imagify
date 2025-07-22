import React from 'react'
import {stepsData} from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {
  return (
    <motion.div
      initial= {{opacity:0.2, y:100}} 
      transition={{duration:1}} 
      whileInView={{opacity:1, y:0}} 
      viewport={{once:true}} 
      className='flex flex-col items-center justify-center my-32'
    >
      <motion.h1 
        className='text-3xl sm:text-4xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text'
        style={{
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 100%',
          animation: 'gradient 3s linear infinite'
        }}
      >
        How it Works
      </motion.h1>
      
      <motion.p 
        className='text-lg text-gray-600 mb-8 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text'
        style={{
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 100%',
          animation: 'gradient 3s linear infinite'
        }}
      >
        Transform words Into Stunning Images
      </motion.p>

      <div className='space-y-4 w-full max-w-3xl text-sm'>
        {stepsData.map((item, index)=>(
          <motion.div 
            key={index} 
            className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border rounded-lg overflow-hidden relative group'
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
            
            <div className='relative z-10 bg-white/80 p-2 rounded-full group-hover:bg-white transition-colors duration-300'>
              <img src={item.icon} alt="" className="w-6 h-6" />
            </div>
            
            <div className='relative z-10'>
              <motion.h2 
                className='text-xl font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500'
                style={{
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                {item.title}
              </motion.h2>
              <p className='text-gray-500 group-hover:text-gray-700 transition-colors duration-300'>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </motion.div>
  )
}

export default Steps
