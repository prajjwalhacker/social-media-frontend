import axios from "axios";

import { useEffect, useState } from "react";
import messageI from '../../../public/profile/message.svg';
import likeI from '../../../public/profile/like.svg';
import CommentModal from "./CommentModal";
import LikeModal from "./LikeModal";

const ShowPostModal = ({ postObj, setShowPost, onLikeClick, fetchPostList, userProfile, likesArr }) => {


    const [likes, setLikes] = useState([]);
    const [comments, setComents] = useState([]);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showLikeModal, setShowLikeModal] = useState(false);


    useEffect(() => {
         setLikes(postObj?.likes?.length);
         setComents(postObj?.comments?.length);
    }, [JSON.stringify(postObj)])

    return (
     <>
        <div className="comment-modal-wrapper"></div>
        <div className="comment-modal-container">  
           <div className="post-content-container">
           Post - 
           <div className="post-main-container">{postObj.message}</div>
           <div className="post-action-container">
           <div className="post-action-image">
             {comments}
             <img style={{ cursor: 'pointer' }} src={messageI.src} width={'20px'} height={'20px'} onClick={() => {
                setShowCommentModal(true);
             }}/>
           </div>
           <div className="post-action-image">
             {likes}
             <img style={{ cursor: 'pointer' }} src={likeI.src} width={'20px'} height={'20px'} onClick={() => { setLikes(likes + 1); onLikeClick(userProfile?.data?.profileData?._id,  postObj._id); }}/>
           </div>
           </div>
           <button className="model-btn" onClick={() => { setShowPost(false);  }}>Close it</button>
           <button onClick={() => { setShowLikeModal(true) }}>
              Show Who likes
           </button>
           </div>
       </div>
       {showCommentModal &&  <CommentModal comments={postObj.comments} postId={postObj._id} setShowModel={setShowCommentModal} fetchPostList={fetchPostList}/>}
       {showLikeModal &&  <LikeModal setShowModel={setShowLikeModal} likesArr={likesArr}/>}
      </>
    )
}

export default ShowPostModal;
