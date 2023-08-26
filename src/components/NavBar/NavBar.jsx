import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import { BiHome, BiBell, BiSearch } from 'react-icons/bi';
import { SignIn } from '../../Contexts/SignIn';
import ProfileDropdown from '../OtherSmallComponents/ProfileDropdown/ProfileDropdown';
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import NotificationsDropDown from '../OtherSmallComponents/NotificationsDropDown/NotificationsDropDown';


const NavBar = ({ setCreateScene, createScene, update }) => {

    const { isAuth } = useContext(SignIn)

    const [userName, setUserName] = useState('@username')
    const [profilePic, setProfilePic] = useState('')
    const [notificationList, setNotificationList] = useState([])
    const [notificationPopup, setNotificationPopup] = useState(false)
    const [notifyNumber, setNotifyNumber] = useState(false)
    const [notifyCounter, setNotifyCounter] = useState(0)


    const notificationsRef = collection(db, "notifications")
    
    useEffect(() => {
        if(notifyCounter === 0){
            setNotifyNumber(false)
        }
        else{
            setNotifyNumber(true)
        }
        const data = localStorage.getItem("userName")
        if (data) {
            setUserName(JSON.parse(data))
        }
        const profile = localStorage.getItem("photoURL")

        if (profile) {
            setProfilePic(JSON.parse(profile))
        }
        //Notifications Logic

        // const getNotifications = async () => {
        //     const data = await getDocs(query(notificationsRef, orderBy('createdAt', 'desc')))
        //     setNotificationList(data.docs.map((doc) => ({ ...doc.data() })))
        //     console.log(data.docs.map((doc) => ({ ...doc.data() })))
        //     setNotifyNumber(true)
        //     setNotifyCounter(notificationList.length)
        //   }
        //   getNotifications()
          console.log(notificationList)
          
    }, [update])

    // console.log(notificationList, "notifications")
    
    let navigate = useNavigate()
    const handleCreateScene = () => {
        if(isAuth){
            handleScene()
        }
        else{
            alert('Please signin first to create scenes')
            navigate("/");
        }
    }
    const handleScene = () => {
        !createScene ? setCreateScene(true) : setCreateScene(false)
    }
    const handleNotification = () =>{
        setNotifyNumber(false)
        !notificationPopup ? setNotificationPopup(true) : setNotificationPopup(false)
    }
    return (
        <nav className='navBar-container'>
            <div className="navBar">
                <div className="rightNav">
                    <div className="logo">Foob.io</div>
                    <div className="home">
                        <BiHome size={25} />
                    </div>
                </div>
                <div className="middleNav">
                    <div className="searchBox">
                        <BiSearch size={25} />
                        <input type="text" placeholder='Search Scene...' />
                    </div>
                    <button className='btn-primary' onClick={handleCreateScene}>Create Scene</button>

                </div>
                <div className="leftNav">
                    <div className="bell">
                        <BiBell size={25} onClick={handleNotification}/>
                        {
                            !notifyNumber ? <div className="notify"><p></p></div>:null
                        }
                        
                    {/* {
                        notificationPopup ? <NotificationsDropDown notificationList={notificationList} /> : null
                    } */}
                    
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar