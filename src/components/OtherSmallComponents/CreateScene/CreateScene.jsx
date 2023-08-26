import './CreateScene.css'
import React, { useState, useEffect } from 'react'
import { GrFormClose } from 'react-icons/gr';
import { BsEmojiLaughing } from 'react-icons/bs';
import { FaPhotoVideo } from 'react-icons/fa';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../../firebaseConfig';
import { RotatingLines } from 'react-loader-spinner'
import ImageUpload from '../ImageUpload/ImageUpload';

const CreateScene = ({ setCreateScene, setUpdate, update }) => {

    const [cta, setCta] = useState(false)
    const [userName, setUserName] = useState('@username')
    const [profilePic, setProfilePic] = useState('')
    const [caption, setCaption] = useState("")
    const [uploadPopup, setUploadPopup] = useState(false)
    const [sceneImage, setSceneImage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [category, setCategory] = useState('scene')

    const categories = ["politics", "news", "funny", "scene", "Tech"]

    const scenesCollectionRef = collection(db, "scenes")
    const notificationsRef = collection(db, "notifications")

    const getNotifications = async () =>{
        try{
            await addDoc(notificationsRef, {
                notifications: `${userName} Uploaded a new Scene ${caption}`,
                createdAt: serverTimestamp(),
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const createScene = async () => {
        setIsLoading(true)
        try {
            await addDoc(scenesCollectionRef, {
                caption,
                author: auth.currentUser.displayName,
                profilePic: auth.currentUser.photoURL,
                comments: [],
                image: sceneImage,
                category,
                createdAt: serverTimestamp(),
            });
            !update ? setUpdate(true) : setUpdate(false)
            getNotifications()
        }
        catch (error) {
            console.log(error)
        }
        
        setCreateScene(false)
        

    }
    
    console.log(category)

    const imageUploadPopup = () => {
        if (sceneImage === "") {
            !uploadPopup ? setUploadPopup(true) : setUploadPopup(false)
        }
        else {
            return
        }

    }

    const handleClose = () => {
        setCreateScene(false)
    }

    const textInput = (event) => {
        if (event.target.value === "") {
            setCta(false)
        }
        else {
            setCta(true)
            setCaption(event.target.value)
        }
    }

    useEffect(() => {
        const data = localStorage.getItem("userName")
        if (data) {
            setUserName(JSON.parse(data))
        }
        const profile = localStorage.getItem("photoURL")

        if (profile) {
            setProfilePic(JSON.parse(profile))
        }
    }, [])

    return (
        <div className='createSceneContainer'>
            <div className="createSceneCard">
                <div className="cardHeader">
                    <p>Create a Scene</p>
                    <GrFormClose size={30} className="closeIcon" onClick={handleClose} />
                </div>
                <div className="cardBody">
                    <div className="userDetails_tag">
                        <div className="userProfile">
                            <div className="userAvatar">
                                <img src={profilePic} alt={userName} />
                            </div>
                            <div className="UserName">{userName}</div>
                        </div>
                        <div className="tagSection">
                            <label htmlFor="category">Select Category</label>
                            <select className='dropdown' id="category" onChange={(event) => { setCategory(event.target.value) }}>
                                {
                                    categories.map((ele)=><option value={ele}>{ele}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="inputElement">
                        <input type="text" placeholder={`Hi ${userName}, what do you like to talk about?`} autoFocus onChange={event => textInput(event)} />
                    </div>
                    <div className="imageUploadingSection">
                        {
                            uploading ? <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="30"
                                visible={true}
                            /> : <div className="previewImage">
                                {
                                    sceneImage === "" ? null : <img src={sceneImage} alt="" className='uploadedImage' />
                                }

                            </div>
                        }

                        {/* <img src={sceneImage} alt="" className='uploadedImage'/> */}
                        {
                            uploadPopup ? <ImageUpload setSceneImage={setSceneImage} sceneImage={sceneImage} setUploadPopup={setUploadPopup} uploading={uploading} setUploading={setUploading} /> : null
                        }
                    </div>

                    {/* <img src={imageUpload} alt={imageUpload} /> */}
                    <div className="cardFooter">
                        <div className="createSceneIcons">

                            <BsEmojiLaughing size={28} className="icon" />


                            {/* <input type="file" style={{ display: 'none' }} id="selectFile" onChange={(event)=>{setImageUpload(event.target.files[0])}}/> */}
                            {/* <label htmlFor="selectFile"> */}

                            <FaPhotoVideo size={28} className="icon" onClick={imageUploadPopup} />


                            {/* </label> */}
                        </div>
                        <button onClick={cta ? createScene : null} className={cta ? "btn-primary" : "btn-disable"}>
                            {isLoading ? <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="20"
                                visible={true}
                            /> : 'Create'}

                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CreateScene