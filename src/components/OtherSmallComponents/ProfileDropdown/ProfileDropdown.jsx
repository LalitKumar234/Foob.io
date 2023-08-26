import React, {useContext, useEffect, useState } from 'react'
import './ProfileDropdown.css'
import { CgProfile } from 'react-icons/cg';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import { auth } from "../../../firebaseConfig"
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { SignIn } from '../../../Contexts/SignIn';

const ProfileDropdown = () => {
    
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

    // useEffect(() => {
    //     const data = localStorage.getItem("isAuth")
    //     if (data) {
    //         //console.log(data)
    //         setIsAuthenticated(JSON.parse(data))
    //     }
    // }, [])

    return (
        <div className='ProfileDropDown'>
            <ul className='profileSettings'>
                <li>
                    <div className="profile">
                        <CgProfile size={22} />
                        <p>My Profile</p>
                    </div>
                </li>
                <li>
                    <div className="profile">
                        <FiEdit size={22} />
                        <p>Edit Profile</p>
                    </div>
                </li>
                <li>
                    <div className="profile">
                        <AiOutlineMessage size={22} />
                        <p>Inbox</p>
                    </div>
                </li>
                <li>
                    <div className="profile">
                        <FiLogOut size={22} />
                        <p onClick={handleLogout}>{isAuth ? `Logout` : `Login` }</p>
                    </div>
                </li>

            </ul>
        </div>
    )
}

export default ProfileDropdown