import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>

      <Link to='/'>
      <img src={assets.logo} alt='' className='w-28 sm:w-32 lg:w-40' />
      </Link>

        <div>
            <div></div>
            <div></div>
        </div>

    </div>
  )
}

export default Navbar
