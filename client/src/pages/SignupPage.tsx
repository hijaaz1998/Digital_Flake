import React from 'react'
import Signup from '../components/Signup'

const SignupPage = () => {
  return (
    <div className=' flex items-center justify-center w-full h-screen bg-purple-400 back' style={{backgroundImage: 'url(/background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Signup />
    </div>
  )
}

export default SignupPage