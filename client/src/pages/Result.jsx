import React from 'react'
import {assets} from '../assets/assets'

const Result = () => {
  return (
    <div>
      <div className='relative'>
        <img src={assets.sample_img_1} alt="" className='max-w-sm rounded' />
        <span className='absolute bottom-0 h-1 bg-blue-500 w-full transistion-all duration-[10]'></span>
      </div>
      <p>Loading...</p>
    </div>
  )
}

export default Result
