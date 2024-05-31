import React, { useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Login from "../components/Login"
import { selectUser } from "../slices/userSlice"

const LoginPage: React.FC = () => {

  const navigate = useNavigate();
  const user = localStorage.getItem('userId');
  useEffect(() => {
    if(user) navigate('/home')
  },[])
  return (
    <div className=' flex items-center justify-center w-full h-screen bg-purple-400 back' style={{backgroundImage: 'url(/background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Login />
    </div>
  )
}

export default LoginPage