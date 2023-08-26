import React, { useState } from 'react'
import './ImageUpload.css'
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"

import { storage } from '../../../firebaseConfig';

const ImageUpload = ({ setSceneImage, setUploadPopup, setUploading, uploading }) => {

    // const [progress, setProgress] = useState(0)
    const [imageUpload, setImageUpload] = useState('')
    // const [progress, setProgress] = useState(0)


    // const uploadFiles = (file) => {
    //     const storageRef = ref(storage, `/images/${file.name}`)
    //     const uploadTask = uploadBytesResumable(storageRef, file)

    //     uploadTask.on("state_changed", (snapshot) => {
    //         const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //         setProgress(prog);
    //     }, (err) => console.log(err),
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref)
    //                 .then(url => console.log(url))
    //         }
    //     );
    // }

    const handleUploadFiles = () => {
        if (imageUpload === "") {
            return
        }
        else {
            uploadFiles()
            setUploading(true)
        }
    }

    const uploadFiles = async () => {

        const imageRef = ref(storage, `images/${`scene` + (Math.floor(Math.random() * (10000000)))}`)
        const uploadTask = uploadBytesResumable(imageRef, imageUpload)
        try {
            await uploadBytes(imageRef, imageUpload)
            uploadTask.on("state_changed", (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // setProgress(prog);
            }, (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => {
                            setSceneImage(url)
                            console.log(url)
                        })
                }
            )
            setUploadPopup(false)
        }
        catch (error) {
            console.log(error)
        }

        setUploading(false)
    }
    return (
        <div className='imageUploadContainer'>
            {
                imageUpload === "" ? <label htmlFor="inputTag" className='upload-btn'>
                    <MdOutlineInsertPhoto size={25} />Select Image
                    <input id="inputTag" type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                </label> : <button className={imageUpload === "" ? `btn-disable` : `btn-primary`} onClick={handleUploadFiles}>
                    {
                        uploading ? 'Uploading...' : 'Upload'

                    }</button>
            }


        </div>
    )
}

export default ImageUpload