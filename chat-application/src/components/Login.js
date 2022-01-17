import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { userSignin } from '../redux/actions/AuthAction'
import { loginValidation } from "../utils/Validation"
import "./styles/Login.css"
const Login = ({ userLogin, setUserLogin,history  }) => {
    const [error, setError] = useState({})
    const [userValidated, setuserValidated] = useState(false)
    const [userData, setuserData] = useState({ email: "", password: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(history)
    const userLoginHandler = (e) => {
        e.preventDefault()
        setuserValidated(true)
        setError(loginValidation(userData))
    }
    useEffect(() => {
        if (Object.keys(error).length === 0 && userValidated) {
            dispatch(userSignin(userData,navigate))
        }
    }, [error])
 

    return (
        <div className="login" style={{ height: "100vh" }}>
            <h1>Sign In</h1>
            <p>Sign in to continue for Chat Application,.</p>
            <form   autoComplete='off' action="" className="form" onSubmit={userLoginHandler}  >
                <div>
                    <label htmlFor="email">Email</label>
                    <input style={{ border: error.email && "1px solid red" }} type="text" id="email" onKeyPress={() => setError({ ...error, email: null })} placeholder="Enter Email" autoFocus value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} />
                    {error.email && <small className="error">{error.email}</small>}
                </div>
                <div>
                    <label className="password-label" htmlFor="password">Password  <span> Forget Password?</span></label>
                    <input type="password" style={{ border: error.password && "1px solid red" }} onKeyPress={() => setError({ ...error, password: null })} type="text" id="password" placeholder="Enter Password" value={userData.password} onChange={(e) => setuserData({ ...userData, password: e.target.value })} />
                    {error.password && <small className="error">{error.password}</small>}

                </div>
                <button>Sign In</button>
            </form>
            <p className="to-signup" onClick={() => setUserLogin(!userLogin)}>Don't have an account ? <span>Signup now</span> </p>
        </div>
    )
}

export default Login
