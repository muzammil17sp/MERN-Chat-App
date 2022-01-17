import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../components/styles/Login.css"
import { passwordForgetValidation } from '../utils/Validation'
const PasswordForget = () => {

    const [error, setError] = useState({})
    const [userValidated, setuserValidated] = useState(false)
    const [userData, setuserData] = useState({ email: ""  })
    const userPasswordForget = (e) => {
        e.preventDefault()
        setuserValidated(true)
        setError(passwordForgetValidation(userData))
    }
    useEffect(() => {
        if (Object.keys(error).length === 0 && userValidated) {
        }
    }, [error])

    return (
        <div className="login" style={{ height: "100vh" }}>
            <h1>Reset Password</h1>
            <p>Reset Password for chat Appplication</p>
            <form action="" className="form" onSubmit={userPasswordForget} >
                <div>
                    <label htmlFor="email">Email</label>
                    <input style={{ border: error.email && "1px solid red" }}  onKeyPress={() => setError({...error, email: null })} type="text" id="email" placeholder="Enter Email" autoFocus value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} />
                    {error.email && <small className="error">{error.email}</small>}

                </div>

                <button>Reset</button>
            </form>
            <p className="to-signup" >Remember It ? <span><Link style={{textDecoration:"none"}} to="/auth"> Signin </Link></span> </p>

        </div>
    )
}

export default PasswordForget
