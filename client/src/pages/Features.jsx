import React from 'react';
import {motion} from 'framer-motion';


const Features = () => {
  return (
    <motion.div initial={{opacity:0.2, y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}} className='min-h-[80vh] text-center pt-14 mb-10'>

        <h1 className='text-center text-3xl font-medium mb-12 sm:mb-6'>Features are on the way..Stay Tuned</h1>
        <br />
        <h1 className='text-center text-3xl font-medium mb-12 sm:mb-6'>Coming Soon</h1>
      
    </motion.div>
  )
}

export default Features;
