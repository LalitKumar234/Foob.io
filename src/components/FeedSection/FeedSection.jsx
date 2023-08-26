import React, { useEffect, useState } from 'react'
import './FeedSection.css'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import FeedLoader from './FeedLoader';
import Feed from './Feed/Feed';


const FeedSection = ({ update }) => {

  const [scenesList, setScenesList] = useState([])
  const [contentLoading, setContentLoading] = useState(true)


  const scenesCollectionRef = collection(db, "scenes")


  const getScenes = async () => {
    const data = await getDocs(query(scenesCollectionRef, orderBy('createdAt', 'desc')))
    setScenesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setContentLoading(false)
  }

  useEffect(() => {
    getScenes()



    console.log('UseEffect of feed')



  }, [update])

  return (
    <>{
      contentLoading ? <FeedLoader /> : (<div className="wrapper">
        <div className='feedContainer'>
          {
            scenesList.map((scene) => {
              return <Feed scene={scene} update={update}/>
            })
          }
        </div>
      </div>)
    }


    </>

  )
}

export default FeedSection