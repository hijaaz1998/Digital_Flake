import React from "react"
import Login from "../components/Login"
import SignupPage from "./SignupPage"

const LoginPage: React.FC = () => {
  return (
    <div className=' flex items-center justify-center w-full h-screen bg-purple-400 back' style={{backgroundImage: 'url(/background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <SignupPage />
    </div>
  )
}

export default LoginPage