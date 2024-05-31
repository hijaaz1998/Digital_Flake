import React, { useState } from 'react';
import { FormEvent } from 'react';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineShieldCheck } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [validOtp, setValidOtp] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.trim()) {
      toast.error('Email field is required');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid Email');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/send_otp', { email });

      if (response.data.success) {
        setValidOtp(response.data.otp);
        setShowOtpFields(true);
        toast.success(response.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(validOtp)
    console.log(typeof validOtp)
    console.log(otp)
    console.log(typeof otp)

    if (!otp.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      toast.error('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (otp != validOtp) {
      toast.error('Invalid OTP');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/reset_password', {
        email,
        newPassword
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-8 rounded-lg shadow-md bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="bg-opacity-50 rounded-lg p-8 backdrop-filter backdrop-blur-lg">
        <div className="items-center justify-center flex flex-col">
          <h2 className="text-xl text-violet-900 font-semibold text-center mb-8">Forgot Password?</h2>
        </div>
        {!showOtpFields ? (
          <form onSubmit={handleSendOtp}>
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
            <div className="text-center">
              <button
                type="submit"
                className="bg-violet-900 border-2 border-transparent hover:bg-white hover:border-violet-900 rounded-3xl hover:text-violet-900 text-white font-semibold py-2 px-20 focus:outline-none focus:shadow-outline transition duration-300"
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-6 relative">
              <HiOutlineShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="otp"
                name="otp"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
              />
            </div>
            {validOtp && (
              <>
                <div className="mb-6 relative">
                  <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="bg-violet-900 border-2 border-transparent hover:bg-white hover:border-violet-900 rounded-3xl hover:text-violet-900 text-white font-semibold py-2 px-20 focus:outline-none focus:shadow-outline transition duration-300"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
        <div className="text-center mt-4">
          <Link to="/" className="text-violet-900 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
