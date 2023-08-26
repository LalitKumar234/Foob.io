import React, { useContext } from 'react'
import './Profile.css'
import { auth } from "../../firebaseConfig"
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { SignIn } from '../../Contexts/SignIn';

const Profile = () => {
    const userProfile = JSON.parse(localStorage.getItem("photoURL"))
    const userName = JSON.parse(localStorage.getItem("userName"))
    const userEmail = JSON.parse(localStorage.getItem("email"))

    const { isAuth } = useContext(SignIn)

    let navigate = useNavigate()

    const handleLogout = () => {
        signOut(auth).then(() => {
            setTimeout(()=>{
                navigate("/");
                // window.location.reload(true)
            },1000)
            
        })
        localStorage.clear();
    }


  return (
    <div className='profile_section'>
        <div className="profile_Image">
            <img src={userProfile && userProfile} alt="" />
            <div className="online"></div>
        </div>
        <div className="username">{userName}</div>
        <div className="useremail">{userEmail}</div>
        <button className='upload-btn' onClick={handleLogout}>Sign out</button>
        <p>Designed and developed with ❤️ by <a href="https://www.instagram.com/frontend_edy/" target='_blank'>@frontend_edy</a></p>
    </div>
  )
}

export default Profile