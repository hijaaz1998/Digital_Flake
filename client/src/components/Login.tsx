import React, { useState } from 'react';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="relative w-full max-w-md mx-auto p-8 rounded-lg shadow-md bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className=" bg-opacity-50 rounded-lg p-8 backdrop-filter backdrop-blur-lg">
        <div className="items-center justify-center flex flex-col">
          <img src="/digitalFlake.png" alt="Digitalflake Logo" className="mb-4" />
          <h2 className="text-xl text-gray-400 text-center mb-8">Welcome to Digitalflake Admin</h2>
        </div>
        <form>
          <div className="mb-6 relative">
            <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 text-center">
            <a href="#" className="text-md text-black hover:underline">Forgot Password?</a>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-white border-2 border-transparent hover:border-amber-500 rounded-3xl hover:text-amber-500 text-white font-semibold py-2 px-20 focus:outline-none focus:shadow-outline transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
