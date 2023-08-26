import React, { useState } from 'react'
import { useEffect } from 'react'
import FeedSection from './components/FeedSection/FeedSection'
import NavBar from './components/NavBar/NavBar'
import CreateScene from './components/OtherSmallComponents/CreateScene/CreateScene'
import SideNav from './components/SideNav/SideNav'
import Profile from './components/Profile/Profile'


const Home = () => {
  const [createScene, setCreateScene] = useState(false)
  const [update, setUpdate] = useState(false)

  return (
    <div>
      {
        createScene ? <CreateScene setCreateScene={setCreateScene} setUpdate={setUpdate} update={update}/> : null
      }
      <FeedSection update={update}/>
      <NavBar setCreateScene={setCreateScene} createScene={createScene} update={update}/>
      <SideNav />
      <Profile/>
    </div>
  )
}

export default Home