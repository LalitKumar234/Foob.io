import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { FcLike, FcComments } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';
import { auth, db } from '../../../firebaseConfig';
import './Feed.css';

const Feed = ({ scene, update }) => {
    const [comment, showComment] = useState(false)
    const [likeAmount, setLikeAmount] = useState([] | null)
    const [liked, setLiked] = useState(false)
    const [commentRender, setCommentRender] = useState(false)
    const [addComment, setAddComment] = useState('')
    const [commentList, setCommentList] = useState([])

    const handleCommentSection = (id) => {
        if (id) {
            !comment ? showComment(true) : showComment(false)
        }

    }



    const commentCollectRef = collection(db, "comments")

    const handleAddComment = async () => {
        setCommentRender(true)
        try {
            await addDoc(commentCollectRef, {
                userID: auth.currentUser.uid,
                userName: auth.currentUser.displayName,
                userProfile: auth.currentUser.photoURL,
                postId: scene.id,
                comment: addComment,
                createdAt: serverTimestamp(),
            });
        }
        catch (err) {
            console.log(err)
        }

    }

    const commentDoc = query(commentCollectRef, where("postId", "==", scene.id));

    const getComments = async () => {

        const data = await getDocs(commentDoc)
        setCommentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const likesCollectionRef = collection(db, "likes")

    const addLike = async () => {
        setLiked(true)
        try {
            await addDoc(likesCollectionRef, {
                userID: auth.currentUser.uid,
                postId: scene.id
            });
        }
        catch (err) {
            console.log('remove like err', err)
        }
    }

    const removeLike = async () => {
        setLiked(false)
        try {
            const likeToDeleteQuery = query(likesCollectionRef, where("postId", "==", scene.id), where("userID", "==", auth.currentUser.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
            await deleteDoc(likeToDelete)
        }
        catch (err) {
            console.log(err)
        }

    }


    const likeDoc = query(likesCollectionRef, where("postId", "==", scene.id));

    const getLikes = async () => {
        const data = await getDocs(likeDoc)
        setLikeAmount(data.docs.map((doc) => ({ userID: doc.data().userID })))

    }

    //Checking if user already Liked this function will return true or false based on the conditions.
    const hasUserLiked = () => {
        if (likeAmount && likeAmount.find((like) => like.userID === auth.currentUser.uid)) {
            return true
        }
        else {
            return false
        }
    }

    useEffect(() => {
        console.log('useEffect of Like')

        getLikes()
        getComments()
    }, [liked, update, commentRender])

    return (
        <div className="feed">

            <div className="feedHeader">
                <div className="userDetails">
                    <div className="userAvatar">
                        {
                            scene.profilePic === '' ? null : <img src={scene.profilePic} alt="" />
                        }
                    </div>
                    <div className="userStatus">
                        <h2 className="userName">{scene.author}</h2>
                        <p className='caption'>{scene.caption}</p>
                        <p className='date'>{scene.createdAt.toDate().toDateString()}</p>
                        <div className="tags">
                            <h3 className="tag" id="politics">{scene.category}</h3>
                        </div>
                    </div>
                </div>
                {
                    scene.image === "" ? null : <div className="feedImage"> <img src={scene.image} alt="" /> </div>
                }
                <div className="feedFooter">
                    <div className="like_comment">
                        <div className="like" onClick={hasUserLiked() ? removeLike : addLike}>
                            {
                                hasUserLiked() ? <FcLike size={25} /> : <AiOutlineHeart size={25} />
                            }
                        </div>
                        <p>{likeAmount.length} {likeAmount.length === 1 ? 'like' : 'likes'}</p>
                    </div>
                    <div className="like_comment">
                        <FcComments size={25} onClick={() => { handleCommentSection(scene.id) }} />
                        <p>{commentList.length} {commentList.length === 1 ? 'comment' : 'comments'}</p>
                    </div>
                </div>
            </div>
            <div className="commentSection" id={scene.id} style={!comment ? { display: "none" } : { display: "flex", transition: "0.3s ease-in-out" }}>
                <div className="commentInput">
                    <input type="text" className='comment-input' autoFocus onChange={(e) => setAddComment(e.target.value)} />
                    <button className='btn-primary' onClick={handleAddComment}>Write Comment</button>
                </div>
                <ul className="commentList">

                    {commentList.map((comment) => {
                        // console.log(comment)
                        return <>
                            <li className='comment'>
                                <img src={comment.userProfile} alt="" className='commentUserPic' />
                                <div className="commentedUserDetails">
                                    <h5>{comment.userName}</h5>
                                    <p>{comment.comment}</p>
                                    {/* <p className='date'>{comment.createdAt.toDate().toDateString()}</p> */}
                                </div>
                            </li>
                        </>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Feed