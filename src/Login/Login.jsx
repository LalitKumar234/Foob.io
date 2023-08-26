import React, { useContext } from 'react'
import './Login.css'
import { auth, provider } from "../firebaseConfig"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { SignIn } from '../Contexts/SignIn'

const Login = () => {
  const { setIsAuth } = useContext(SignIn)
  let navigate = useNavigate()

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      setIsAuth(true)
      localStorage.setItem("isAuth", true);
      navigate("/feed")
      console.log(result.user)
      localStorage.setItem("userName", JSON.stringify(result.user.displayName))
      localStorage.setItem("email", JSON.stringify(result.user.email))
      localStorage.setItem("photoURL", JSON.stringify(result.user.photoURL))
    })
  }

  return (
    <div className='loginContainer'>
      <div class="google-btn" onClick={signIn}>
        <div class="google-icon-wrapper">
          <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
        </div>
        <p class="btn-text"><b>Sign in with google</b></p>
      </div>
    </div>
  )
}

export default Login