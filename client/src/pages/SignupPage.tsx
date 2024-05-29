import React,{useState} from 'react'
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineUser } from 'react-icons/hi';

const SignupPage: React.FC = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = () => {

  }
  return (
    <div className="relative w-full max-w-md mx-auto p-8 rounded-lg shadow-md bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="bg-white bg-opacity-50 rounded-lg p-8 backdrop-filter backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-amber-500 text-center mb-8">Create Account</h2>
        <form onSubmit={registerHandler}>
          <div className="mb-6 relative">
            <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              id="password"
              name="password"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-violet-900 hover:bg-white border-2 border-transparent hover:border-amber-500 rounded-3xl hover:text-amber-500 text-white font-bold py-2 px-20 focus:outline-none focus:shadow-outline transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage














