import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setShowLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      // Prefer server-provided error message when available (e.g., 409 response)
      const serverData = error?.response?.data;
      const serverMessage = serverData?.message;

      if (serverData?.type === 'info') {
        // Show info/warning style toast instead of error
        toast.info(serverMessage || 'Info');
      } else {
        toast.error(serverMessage || error.message || 'An error occurred');
      }
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const navbar = document.getElementById('nav-bar')
    navbar.style.opacity = 0.05
    return () => {
      document.body.style.overflow = 'unset';
      navbar.style.opacity = 1
    }
  }, [])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-[9999] backdrop-blur-sm bg-black/30 flex justify-center items-center'>

      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500 shadow-xl'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {state !== 'Login' &&
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.user_icon} alt="" />
            <input onChange={e => setName(e.target.value)} value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required />
          </div>}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="" />
          <input onChange={e => setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm' placeholder='Email id' required />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="" />
          <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm' placeholder='Password' required />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : 'Create Account'}</button>

        {state === 'Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
          :
          <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>}

        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />

  </form>

    </div>
  )
}

export default Login
