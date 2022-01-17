import React, { useState, useEffect } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '../redux/actions/AuthAction';
import { signupValidation } from '../utils/Validation'

const Signup = ({ userLogin, setUserLogin }) => {
    const [error, setError] = useState({})
    const [userValidated, setuserValidated] = useState(false)
    const [userData, setuserData] = useState({ email: "", username: "", password: "", confirmPassword: "", profilePicture: null })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLoginHandler = (e) => {
        e.preventDefault()
        setuserValidated(true)
        setError(signupValidation(userData))
    }
    const profileChangeHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setuserData({ ...userData, profilePicture: reader.result })

        }
    }


    useEffect(() => {
        if (Object.keys(error).length === 0 && userValidated) {
            dispatch(userSignup(userData,navigate))
        }
    }, [error])

    return (
        <div className="login" >
            <h1>Sign up</h1>
            <p>Get your Chat Application account now</p>
            <form autoComplete='off'  action="" className="form" onSubmit={userLoginHandler} >
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" style={{ border: error.email && "1px solid red" }} placeholder="Enter Email" autoFocus onKeyPress={() => setError({ ...error, email: null })} value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} />
                    {error.email && <small className="error">{error.email}</small>}

                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" style={{ border: error.username && "1px solid red" }} placeholder="Enter Username" onKeyPress={() => setError({ ...error, username: null })} value={userData.username} onChange={(e) => setuserData({ ...userData, username: e.target.value })} />
                    {error.username && <small className="error">{error.username}</small>}

                </div>
                <div>
                    <label className="password-label" htmlFor="password">Password  </label>
                    <input type="text" id="password" style={{ border: error.password && "1px solid red" }} placeholder="Enter Password" value={userData.password} onKeyPress={() => setError({ ...error, password: null })} onChange={(e) => setuserData({ ...userData, password: e.target.value })} />
                    {error.password && <small className="error">{error.password}</small>}
                    <PasswordStrengthBar password={userData.password} />
                </div>
                <div>
                    <label className="password-label" htmlFor="cpassword">Confirm Password  </label>
                    <input type="password" id="cpassword" style={{ border: error.confirmPassword && "1px solid red" }} placeholder="Enter Password" onKeyPress={() => setError({ ...error, confirmPassword: null })} value={userData.confirmPassword} onChange={(e) => setuserData({ ...userData, confirmPassword: e.target.value })} />
                    {error.confirmPassword && <small className="error">{error.confirmPassword}</small>}
                </div>
                <div>
                    <label className="password-label" htmlFor="image" style={{ cursor: "pointer" }} >Select Profile Image  </label>
                    <input type="file" id="image" onChange={profileChangeHandler} onKeyPress={() => setError({ ...error, profilePicture: null })} />
                    {error.profilePicture && <small className="error">{error.profilePicture}</small>}

                </div>
                {
                    userData.profilePicture && <img src={userData.profilePicture} className="signup-image-preview" alt="" />

                }
                <button>Sign up</button>
            </form>
            <p className="to-signup" onClick={() => setUserLogin(!userLogin)}>Already have an account ?  <span>Signin now</span> </p>
        </div>
    )
}

export default Signup
