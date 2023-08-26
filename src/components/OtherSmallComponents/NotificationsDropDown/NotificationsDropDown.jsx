import React from 'react'
import './NotificationsDropDown.css'

const NotificationsDropDown = ({notificationList}) => {
  return (
    <div className='notificationsDeopdown'>
      <ul className="notifications">
        {
          notificationList.map((notification)=>{
            return <li>{notification.notifications}</li>
          })
        }
      </ul>
    </div>
  )
}

export default NotificationsDropDown