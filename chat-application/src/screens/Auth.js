import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
    const [userLogin, setUserLogin] = useState(false)
    const { user } = useSelector((state) => state.AuthReducer)
    const navigate = useNavigate()
  
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    },[user,navigate])
    return (
        <div >
            {userLogin ?

                <Signup setUserLogin={setUserLogin} userLogin={userLogin} />
                :
                <Login setUserLogin={setUserLogin} userLogin={userLogin} />

            }
            <ToastContainer />
        </div>
    )
}

export default Auth
