import React, { useState } from 'react';
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineUser } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';

const Signup: React.FC = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('All Fields Are Required');
      return;
    }
  
    if (!emailRegex.test(email)) {
      toast.error('Invalid Email');
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error('Passwords Do Not Match');
      return;
    }
    
    try {
      const response = await axiosInstance.post('/auth/signup', {
        name,
        email,
        password
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        console.log('success')
        navigate('/');
      } else {
        toast.error(response.data.message);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  

  return (
    <div className="relative w-full max-w-md mx-auto p-8 rounded-lg shadow-md bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="bg-white bg-opacity-50 rounded-lg p-8 backdrop-filter backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-violet-900 text-center mb-8">Create Account</h2>
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
          <div className="mb-6 relative">
            <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-violet-900 hover:bg-white border-2 border-transparent hover:border-violet-900 rounded-3xl hover:text-violet-900 text-white font-bold py-2 px-20 focus:outline-none focus:shadow-outline transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link to="/" className="text-violet-900 hover:text-amber-500">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
