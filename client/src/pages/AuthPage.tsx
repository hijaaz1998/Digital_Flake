import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from '../components/ForgotPassword';
import Login from '../components/Login';
import Signup from '../components/Signup';

const AuthPage = () => {

   const location = useLocation();
   const navigate = useNavigate();
   const user = localStorage.getItem('userId');

   useEffect(() => {
      if (user) navigate('/home');
   }, [user, navigate]);

   const renderForm = () => {
      switch (location.pathname) {
         case '/signup':
         return <Signup />;
         case '/forgot_password':
         return <ForgotPassword />;
         case '/login':
         default:
         return <Login />;
      }
   };
   
  return (
   <>
      <div className=' flex items-center justify-center w-full h-screen bg-purple-400 back' style={{backgroundImage: 'url(/bg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
         {renderForm()}
      </div>
   </>
   
  )
}

export default AuthPage