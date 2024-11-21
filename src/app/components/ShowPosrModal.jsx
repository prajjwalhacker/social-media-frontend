import axios from "axios";

import { useState } from "react";
import messageI from '../../../public/profile/message.svg';
import likeI from '../../../public/profile/like.svg';


const ShowPostModal = ({ postObj, setShowPost }) => {



    console.log("postObj");
    console.log(postObj);



    return (
     <>
        <div className="comment-modal-wrapper"></div>
        <div className="comment-modal-container">  
           <div className="post-content-container">
           Post - 
           <div className="post-main-container">{postObj.message}</div>
           <div className="post-action-container">
           <div className="post-action-image">
             {postObj?.comments.length}
             <img style={{ cursor: 'pointer' }} src={messageI.src} width={'20px'} height={'20px'}/>
           </div>
           <div className="post-action-image">
             {postObj?.likes.length}
             <img style={{ cursor: 'pointer' }} src={likeI.src} width={'20px'} height={'20px'}/>
           </div>
           </div>
           <button className="model-btn" onClick={() => { setShowPost(false);  }}>Close it</button>
           </div>
       </div>
      </>
    )
}

export default ShowPostModal;
