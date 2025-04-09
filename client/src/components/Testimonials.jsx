import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Testimonials = () => {
  return (
    <motion.div 
      initial={{opacity:0.2, y:100}} 
      transition={{duration:1}} 
      whileInView={{opacity:1, y:0}} 
      viewport={{once:true}} 
      className='relative py-20'
    >
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='text-center mb-12'>
          <motion.h2 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className='text-3xl sm:text-4xl font-semibold mb-4 text-gray-800'
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.1}}
            className='text-gray-600 text-lg'
          >
            Join thousands of satisfied creators using Imagify
          </motion.p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: index * 0.1}}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
              className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:bg-white/80 transition-all duration-300'
            >
              <div className='flex items-center gap-4 mb-4'>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className='w-12 h-12 rounded-full object-cover ring-2 ring-white/80'
                />
                <div>
                  <h3 className='font-semibold text-gray-800'>{testimonial.name}</h3>
                  <p className='text-sm text-gray-500'>{testimonial.role}</p>
                </div>
              </div>
              
              <div className='flex mb-4'>
                {Array(testimonial.stars).fill().map((_, i) => (
                  <motion.img
                    key={i}
                    initial={{opacity: 0, scale: 0}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 0.2, delay: 0.3 + (i * 0.1)}}
                    src={assets.rating_star}
                    alt="star"
                    className='w-5 h-5'
                  />
                ))}
              </div>

              <p className='text-gray-600 leading-relaxed'>"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Testimonials
